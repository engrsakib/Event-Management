/* eslint-disable no-unused-vars */
import { use, useState } from "react";
import logo from "/logo.svg";
import { PiEyeClosedBold, PiEyeClosedDuotone } from "react-icons/pi";
import axios from "axios";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { QueryClient } from "@tanstack/react-query";

const BASE_URL = import.meta.env.VITE_ADMIN_URL;

export default function LogIn() {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();

  // console.log(location?.state?.from?.pathname);

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
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
      );

      if (response.status !== 200 || !response?.data?.token) {
        setError("Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        // QueryClient.invalidateQueries({ queryKey: ['profile'] });
        window.location = location?.state?.from?.pathname ||   "/"; // Redirect to home page
        // navigate("/"); // Alternatively, you can use navigate if you want to use react-router
      } else {
        setError("No token received from server.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Fill credentials handler
  const handleFillCredentials = () => {
    setEmail("hunter@test.com");
    setPassword("HunterMan1@");
    setError(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-tr from-[#fff] to-[#FFF5F5]">
      {/* Left Side: Image */}
      <section className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white/70 px-6 py-10 md:py-0">
        <img
          src={logo}
          alt="main logo"
          className="w-52 lg:w-[70%] max-w-full drop-shadow-xl"
        />
      </section>

      {/* Divider for md+ */}
      <div className="hidden md:flex flex-col justify-center items-center">
        <div className="w-[2px] h-[320px] md:h-[80vh] bg-gradient-to-b from-[#7F0B0B] to-[#590000]" />
      </div>

      {/* Right Side: Form */}
      <section className="w-full md:w-[40%] flex justify-center items-center bg-white/80 px-4 py-10 md:py-0">
        <div className="w-full max-w-[430px]">
          <div className="mb-8">
            <h3 className="text-[#7F0B0B] text-3xl md:text-4xl font-extrabold leading-tight text-center drop-shadow">
              {data.greetings}
            </h3>
            <p className="text-[#590000] text-lg md:text-2xl font-medium leading-tight text-center mt-2">
              {data.message}
            </p>
          </div>

          {/* Hit Credentials Button */}
          <div className="flex justify-end mb-2">
            <button
              type="button"
              onClick={handleFillCredentials}
              className="bg-gradient-to-r from-[#7F0B0B] to-[#590000] text-white px-4 py-2 rounded-full shadow hover:scale-105 transition font-semibold text-sm"
              title="Fill demo credentials"
            >
              Hit Credentials
            </button>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4 mt-5">
              <label
                htmlFor="email"
                className="block text-lg md:text-xl text-[#7F0B0B] font-semibold mb-1"
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
                className="border border-[#7F0B0B]/20 rounded-xl outline-none px-4 w-full h-12 md:h-14 text-[#590000] text-base md:text-lg font-medium py-2 md:py-3 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/30 bg-white transition-all duration-300 shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-lg md:text-xl text-[#7F0B0B] font-semibold mb-1"
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
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setError(null)}
                  className="border border-[#7F0B0B]/20 text-[#590000] text-base md:text-lg font-medium rounded-xl outline-none px-4 w-full h-12 md:h-14 py-2 md:py-3 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/30 bg-white transition-all duration-300 shadow-sm"
                />
                {isEyeOpen ? (
                  <PiEyeClosedBold
                    className="absolute top-3 md:top-4 right-3 text-xl md:text-2xl text-[#7F0B0B] cursor-pointer"
                    onClick={() => setIsEyeOpen(false)}
                  />
                ) : (
                  <PiEyeClosedDuotone
                    className="absolute top-3 md:top-4 right-3 text-xl md:text-2xl text-[#7F0B0B] cursor-pointer"
                    onClick={() => setIsEyeOpen(true)}
                  />
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-600 font-semibold mt-2 text-left">
                {error}
              </p>
            )}

            {/* remember & forgot password */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-2">
              <div className="flex items-center">
                {isChecked ? (
                  <IoMdCheckboxOutline
                    className="text-[#7F0B0B] text-xl md:text-2xl cursor-pointer"
                    onClick={() => setIsChecked(false)}
                  />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    className="text-[#7F0B0B] text-xl md:text-2xl cursor-pointer"
                    onClick={() => setIsChecked(true)}
                  />
                )}
                <label
                  htmlFor="remember"
                  className="ml-2 text-[#590000] text-base md:text-lg font-medium"
                >
                  Remember me
                </label>
              </div>
              <Link
                to={"#"}
                className="text-[#7F0B0B] underline text-base md:text-lg font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            {/* submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 border-0 text-white text-lg md:text-xl font-bold rounded-full outline-none px-4 w-full h-12 md:h-14 py-2 md:py-3 focus:ring-2 focus:ring-[#7F0B0B]/30 bg-gradient-to-r from-[#7F0B0B] to-[#590000] shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="flex justify-center items-center mt-6">
              <span className="text-base md:text-lg font-medium text-[#590000]">
                Don't have an account?{" "}
                <Link
                  to="/auth/user/registration"
                  className="text-[#7F0B0B] underline font-bold"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
