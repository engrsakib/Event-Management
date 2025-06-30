require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

// ============== date fans ========
const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  subWeeks,
  startOfMonth,
  endOfMonth,
  subMonths,
} = require("date-fns");

// ========== Middleware ==========
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ph-event-management-client.vercel.app",
    ],
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
  },
});

async function run() {
  try {
    const phCallectionUser = client.db("PHCallections").collection("users");
    const phCollectionEvent = client.db("PHCallections").collection("events");
    // Custom Register Route: checks for duplicate email, then registers and returns JWT token
    app.post("/register", async (req, res) => {
      const { name, email, password, photo } = req.body;

      if (!email || !name || !password || !photo) {
        return res
          .status(400)
          .json({ success: false, message: "All fields required" });
      }

      // Check duplicate email
      const existing = await phCallectionUser.findOne({ email });
      if (existing) {
        return res
          .status(409)
          .json({ success: false, message: "Email already registered" });
      }

      // Insert user (you can hash password here if you want)
      const newUser = { name, email, password, photo };
      const result = await phCallectionUser.insertOne(newUser);

      // JWT token with name & email
      const token = jwt.sign({ email, name, photo }, process.env.JWT_SEC, {
        expiresIn: "7d",
      });

      // Set token in cookie and also send in response
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          domain: ".vercel.app",
        })
        .json({
          success: true,
          message: "Registration successful",
          token,
          user: { name, photo, email, _id: result.insertedId },
        });
    });

    // Login route (for completeness)
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "All fields required" });
      }
      const user = await phCallectionUser.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Authenciation Error" });
      }
      if (user.password !== password) {
        return res
          .status(401)
          .json({ success: false, message: "Authenciation Error" });
      }
      // JWT token with name & email
      const token = jwt.sign(
        { email: user.email, name: user.name, photo: user.photo },
        process.env.JWT_SEC,
        { expiresIn: "7d" }
      );
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .json({
          success: true,
          message: "Login successful",
          token,
          user: {
            name: user.name,
            email: user.email,
            _id: user._id,
            photo: user.photo,
          },
        });
    });

    // logOut
    app.post("/logout", (req, res) => {
      try {
        res
          .clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            path: "/",
          })
          .status(200)
          .json({ success: true, message: "Logged out successfully" });
      } catch (error) {
        res.status(500).json({ success: false, message: "Logout failed" });
      }
    });

    // Optional: Protect route example
    app.get("/profile", verifyToken, async (req, res) => {
      res.json({ user: req.decoded });
    });

    // event management routes
    app.post("/add-events", verifyToken, async (req, res) => {
      const event = req.body;
      const userId = req.decoded._id;

      // Create a new event
      const result = await phCollectionEvent.insertOne({ ...event, userId });

      res.status(201).json({
        success: true,
        message: "Event created successfully",
        event: { ...event, _id: result.insertedId, userId },
      });
    });

    // get all events by descending order using eventDateTime
    // app.get("/events", verifyToken, async (req, res) => {
    //   const events = await phCollectionEvent.find().sort({ eventDateTime: -1 }).toArray();
    //   res.json({ success: true, events });
    // });

    app.get("/events", verifyToken, async (req, res) => {
      try {
       
        const { filter } = req.query;
        const today = new Date();

        
        
        let query = {};

        
        if (filter) {
          let startDate, endDate;

         
          switch (filter) {
            case "today":
              startDate = startOfDay(today);
              endDate = endOfDay(today);
              break;
            case "current_week":
              startDate = startOfWeek(today);
              endDate = endOfWeek(today);
              break;
            case "last_week":
              const dateInLastWeek = subWeeks(today, 1);
              startDate = startOfWeek(dateInLastWeek);
              endDate = endOfWeek(dateInLastWeek);
              break;
            case "current_month":
              startDate = startOfMonth(today);
              endDate = endOfMonth(today);
              break;
            case "last_month":
              const dateInLastMonth = subMonths(today, 1);
              startDate = startOfMonth(dateInLastMonth);
              endDate = endOfMonth(dateInLastMonth);
              break;
            default:
             
              break;
          }

          
          if (startDate && endDate) {
            query = {
              eventDateTime: {
                // আপনার ডাটাবেজের তারিখ ফিল্ডের নাম
                $gte: startDate.toISOString(), // এই তারিখ থেকে শুরু
                $lte: endDate.toISOString(), // এই তারিখের মধ্যে শেষ
              },
            };
          }
        }

        // ডাটাবেজ থেকে ইভেন্ট খুঁজুন (প্রয়োজনে ফিল্টারসহ) এবং তারিখ অনুযায়ী সাজান
        const events = await phCollectionEvent
          .find(query)
          .sort({ eventDateTime: -1 })
          .toArray();

        // ক্লায়েন্টকে ফলাফল পাঠিয়ে দিন
        res.json({ success: true, events });
      } catch (error) {
        console.error("Failed to fetch events:", error);
        res
          .status(500)
          .json({
            success: false,
            message: "Server error while fetching events",
          });
      }
    });

    // verifyToken
    function verifyToken(req, res, next) {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1]; // "Bearer TOKEN" থেকে টোকেনটি আলাদা করা

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
