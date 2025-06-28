require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// ========== Middleware ==========
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// ========== MongoDB Setup ==========
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const phCallectionUser = client
      .db("PHCallections")
      .collection("users");

    // Custom Register Route: checks for duplicate email, then registers and returns JWT token
    app.post("/register", async (req, res) => {
      const { name, email, password } = req.body;
      if (!email || !name || !password) {
        return res.status(400).json({ success: false, message: "All fields required" });
      }

      // Check duplicate email
      const existing = await phCallectionUser.findOne({ email });
      if (existing) {
        return res.status(409).json({ success: false, message: "Email already registered" });
      }

      // Insert user (you can hash password here if you want)
      const newUser = { name, email, password };
      const result = await phCallectionUser.insertOne(newUser);

      // JWT token with name & email
      const token = jwt.sign(
        { email, name },
        process.env.JWT_SEC,
        { expiresIn: "1h" }
      );

      // Set token in cookie and also send in response
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      }).json({
        success: true,
        message: "Registration successful",
        token,
        user: { name, email, _id: result.insertedId }
      });
    });

    // Login route (for completeness)
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields required" });
      }
      const user = await phCallectionUser.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: "Wrong password" });
      }
      // JWT token with name & email
      const token = jwt.sign(
        { email: user.email, name: user.name },
        process.env.JWT_SEC,
        { expiresIn: "7d" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      }).json({
        success: true,
        message: "Login successful",
        token,
        user: { name: user.name, email: user.email, _id: user._id }
      });
    });

    // Optional: Protect route example
    app.get("/profile", verifyToken, async (req, res) => {
      res.json({ user: req.decoded });
    });

    function verifyToken(req, res, next) {
      const token = req?.cookies?.token;
      if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "Invalid token" });
        }
        req.decoded = decoded;
        next();
      });
    }

  } finally {
    // You can close the client if you want (not closing for dev server)
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Programming Hero server is running");
});

app.listen(port, () => {
  console.log(`Programming Hero is running on port ${port}`);
});