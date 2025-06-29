/* eslint-disable no-unused-vars */
import { useState } from "react";
import logo from "/logo.svg";
import { PiEyeClosedBold, PiEyeClosedDuotone } from "react-icons/pi";
import axios from "axios";
import { Link, useNavigate } from "react-router";

const BASE_URL = import.meta.env.VITE_ADMIN_URL;

const passwordRules = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "1 uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "1 lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "1 number", test: (v) => /[0-9]/.test(v) },
  { label: "1 special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

// Calculate strength in %
function passwordStrength(password) {
  let strength = passwordRules.filter((rule) => rule.test(password)).length;
  return Math.round((strength / passwordRules.length) * 100);
}

export default function SignUp() {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [error, setError] = useState(null);
  const [passTouched, setPassTouched] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  // validation
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.password.trim()) return "Password is required";
    if (!form.photo.trim()) return "Photo URL is required";
    for (let rule of passwordRules) {
      if (!rule.test(form.password)) return "Password does not meet all criteria";
    }
    return null;
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const invalid = validate();
    if (invalid) {
      setError(invalid);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        photo: form.photo,
      });
      if (res.status === 200 || res.status === 201) {
        navigate("/auth/user/login");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const passStrength = passwordStrength(form.password);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-tr from-[#fff] to-[#FFF5F5]">
      {/* Left Side: Image */}
      <section className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white/70 px-6 py-10 md:py-0">
        <img src={logo} alt="main logo" className="w-52 lg:w-[70%] max-w-full drop-shadow-xl" />
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
              Create Your Account
            </h3>
            <p className="text-[#590000] text-lg md:text-2xl font-medium leading-tight text-center mt-2">
              Please fill all fields to sign up.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg md:text-xl text-[#7F0B0B] font-semibold mb-1">
                Name
              </label>
              <input
                name="name"
                id="name"
                required
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="border border-[#7F0B0B]/20 rounded-xl outline-none px-4 w-full h-12 md:h-14 text-[#590000] text-base md:text-lg font-medium py-2 md:py-3 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/30 bg-white transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg md:text-xl text-[#7F0B0B] font-semibold mb-1">
                Email
              </label>
              <input
                name="email"
                id="email"
                required
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="border border-[#7F0B0B]/20 rounded-xl outline-none px-4 w-full h-12 md:h-14 text-[#590000] text-base md:text-lg font-medium py-2 md:py-3 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/30 bg-white transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Photo URL */}
            <div className="mb-4">
              <label htmlFor="photo" className="block text-lg md:text-xl text-[#7F0B0B] font-semibold mb-1">
                Photo URL
              </label>
              <input
                name="photo"
                id="photo"
                required
                type="url"
                placeholder="Photo URL"
                value={form.photo}
                onChange={handleChange}
                className="border border-[#7F0B0B]/20 rounded-xl outline-none px-4 w-full h-12 md:h-14 text-[#590000] text-base md:text-lg font-medium py-2 md:py-3 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/30 bg-white transition-all duration-300 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label htmlFor="password" className="block text-lg md:text-xl text-[#7F0B0B] font-semibold mb-1">
                Password
              </label>
              <div className="w-full relative">
                <input
                  name="password"
                  id="password"
                  required
                  type={isEyeOpen ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => {
                    handleChange(e);
                    setPassTouched(true);
                  }}
                  onFocus={() => {
                    setError(null);
                    setPassTouched(true);
                  }}
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

            {/* Password Bullet Rules */}
            {passTouched && (
              <div className="mb-2 mt-2">
                <ul className="space-y-1">
                  {passwordRules.map((rule, idx) => (
                    <li key={rule.label} className="flex items-center text-sm md:text-base">
                      <span
                        className={`inline-block w-4 h-4 rounded-full mr-2 border ${
                          rule.test(form.password)
                            ? "bg-green-400 border-green-400"
                            : "bg-gray-200 border-gray-300"
                        } transition-all duration-300`}
                      />
                      <span
                        className={
                          rule.test(form.password)
                            ? "text-green-700 font-semibold"
                            : "text-gray-500"
                        }
                      >
                        {rule.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Password Strength Bar */}
            {passTouched && (
              <div className="mb-4 mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span
                    className={`font-bold ${
                      passStrength < 50
                        ? "text-red-600"
                        : passStrength < 80
                        ? "text-yellow-700"
                        : "text-green-700"
                    }`}
                  >
                    {passStrength < 50
                      ? "Weak"
                      : passStrength < 80
                      ? "Moderate"
                      : "Strong"}
                  </span>
                  <span className="text-gray-500 font-semibold">{passStrength}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passStrength < 50
                        ? "bg-red-500"
                        : passStrength < 80
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${passStrength}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-600 font-semibold mt-2 text-left">{error}</p>
            )}

            {/* submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 border-0 text-white text-lg md:text-xl font-bold rounded-full outline-none px-4 w-full h-12 md:h-14 py-2 md:py-3 focus:ring-2 focus:ring-[#7F0B0B]/30 bg-gradient-to-r from-[#7F0B0B] to-[#590000] shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="flex justify-center items-center mt-6">
              <span className="text-base md:text-lg font-medium text-[#590000]">
                Already have an account?{" "}
                <Link to="/auth/user/login" className="text-[#7F0B0B] underline font-bold">
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