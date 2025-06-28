import { useState } from "react";
import logo from "/signin.svg";
import { PiEyeClosedBold, PiEyeClosedDuotone } from "react-icons/pi";
import axios from "axios";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { Link, useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_ADMIN_URL;

export default function SignIn() {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const data = {
    greetings: "Welcome back!",
    message: "Please enter your email and password to continue.",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      if (response.status !== 200 || !response?.data?.token) {
        setError("Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      // Ensure token is present
      const token = response.data.token;
      if (token) {
        // Save token to localStorage
        localStorage.setItem("accessToken", token);
        // Optionally, you can set refreshToken as well if available
        // localStorage.setItem("refreshToken", response?.data?.refreshToken);

        // Optionally redirect after successful login
        navigate("/");
      } else {
        setError("No token received from server.");
      }

      // Debug print
      console.log("Token from response:", token);
      // Debug print: Check if token is in localStorage
      console.log("Token in localStorage:", localStorage.getItem("accessToken"));

    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left Side: Image */}
      <section className="w-full md:w-[40%] flex flex-col justify-center items-center bg-white px-6 py-10 md:py-0">
        <img src={logo} alt="main logo" className="w-52 lg:w-[70%] max-w-full" />
      </section>
      
      {/* Divider for md+ */}
      <div className="hidden md:flex flex-col justify-center items-center">
        <div className="w-[2px] h-[320px] md:h-[80vh] bg-[#7D0000]"></div>
      </div>

      {/* Right Side: Form */}
      <section className="w-full md:w-1/2 flex justify-center items-center bg-white px-4 py-10 md:py-0">
        <div className="w-full max-w-[430px]">
          <div className="mb-8">
            <h3 className="text-[#7D0000] text-3xl md:text-4xl font-semibold leading-tight text-center">
              {data.greetings}
            </h3>
            <p className="text-[#646464] text-lg md:text-2xl font-medium leading-tight text-center mt-2">
              {data.message}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg md:text-xl text-[#262626] font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="on"
                placeholder="Please enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                onFocus={() => setError(null)}
                className="border border-[#ddd] rounded-md outline-none px-4 w-full h-12 md:h-16 text-[#646464] text-base md:text-lg font-medium py-2 md:py-3 focus:border-[#7D0000] transition-colors duration-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-lg md:text-xl text-[#262626] font-medium mb-1"
              >
                Password
              </label>
              <div className="w-full relative">
                <input
                  type={isEyeOpen ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onFocus={() => setError(null)}
                  className="border border-[#ddd] text-[#646464] text-base md:text-lg font-medium rounded-md outline-none px-4 w-full h-12 md:h-16 py-2 md:py-3 mt-0 focus:border-[#7D0000] transition-colors duration-300"
                />
                {isEyeOpen ? (
                  <PiEyeClosedBold
                    className="absolute top-3 md:top-5 right-3 text-xl md:text-2xl text-[#777777] cursor-pointer"
                    onClick={() => setIsEyeOpen(false)}
                  />
                ) : (
                  <PiEyeClosedDuotone
                    className="absolute top-3 md:top-5 right-3 text-xl md:text-2xl text-[#777777] cursor-pointer"
                    onClick={() => setIsEyeOpen(true)}
                  />
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-600 font-semibold mt-2 text-left">{error}</p>
            )}

            {/* remember & forgot password */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-2">
              <div className="flex items-center">
                {isChecked ? (
                  <IoMdCheckboxOutline
                    className="text-[#7D0000] text-xl md:text-2xl cursor-pointer"
                    onClick={() => setIsChecked(false)}
                  />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    className="text-[#7D0000] text-xl md:text-2xl cursor-pointer"
                    onClick={() => setIsChecked(true)}
                  />
                )}
                <label
                  htmlFor="remember"
                  className="ml-2 text-[#7D0000] text-base md:text-lg font-medium"
                >
                  Remember me
                </label>
              </div>
              <Link
                to={"/auth/admin/recover-password"}
                className="text-[#7D0000] underline text-base md:text-lg font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 border border-[#ddd] text-white text-lg md:text-xl font-semibold rounded-[40px] outline-none px-4 w-full h-12 md:h-16 py-2 md:py-3 focus:border-[#7D0000] transition-colors duration-300 bg-gradient-to-r from-[#D80000] to-[#720000] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex justify-center items-center mt-6">
              <span className="text-base md:text-lg font-medium">
                Already have an account?{" "}
                <Link to="/auth/admin/login" className="text-[#7D0000] underline">
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}