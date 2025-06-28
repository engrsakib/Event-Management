import { useState } from "react";
import recovaryImage from "/otp.svg";
import { PiEyeClosedBold, PiEyeClosedDuotone } from "react-icons/pi";
import axios from "axios";

import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { IoArrowBackSharp } from "react-icons/io5";
import OtpInput from "./OtpInput";

const BASE_URL = import.meta.env.VITE_ADMIN_URL;

export default function VerifyOTP() {
  const [otp, setOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const location = useLocation();
  const email = location.state?.email || "";

  const data = {
    greetings: "Verify OTP",
    message: `Please check your email. We have sent a code to contact: ${email}.`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (otp.length < 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/otp`, {
        otp,
      });
      console.log("Login success:", response.data);
      // এখানে সফল লগইনের পর কাজ করবেন
    } catch (err) {
      console.error("Login error:", err);
      setError("Please check your email.");
    } finally {
      setLoading(false);
      navigate("/auth/admin/recover-password/set-password");
    }
  };

  return (
    <div className="grid grid-cols-4 w-full h-screen ">
      {/* img */}

      <section className="flex flex-col justify-center items-center bg-[#ffffff] col-span-2">
        <img src={recovaryImage} alt="recovaryImage" />
      </section>

      {/* row */}

      {/* form */}
      <section className="flex justify-center items-center bg-[#ffffff] col-span-2 gap-x-7">
        <div className="w-[2px] flex flex-col justify-center items-center bg-[#ffffff] ">
          <div className="w-[2px] h-[800px] bg-[#7D0000]"></div>
        </div>
        <div>
          <div>
            <div className="flex items-center gap-x-2">
              <Link
                className="text-white rounded-full p-1 flex justify-center items-center text-3xl bg-black w-[40px] h-[40px]"
                to={"/auth/admin/recover-password"}
              >
                <IoArrowBackSharp />
              </Link>
              <h3 className="text-[#0e0303] text-4xl font-[600] leading-[1.2] tracking-normal text-left">
                {data.greetings}
              </h3>
            </div>
            <p className="text-[#646464] text-base text-[28px] font-[500] leading-[1.2] tracking-normal text-left mt-2">
              {data.message}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-full px-4">
            <div className="mb-4 mt-5">
              <OtpInput setOtp={setOtp} />
            </div>

            {error && (
              <p className="text-red-600 font-semibold mt-2 text-left">
                {error}
              </p>
            )}
            <div className="flex items-center justify-between mx-auto gap-x-2 mt-4 w-11/12">
              <span className="text-[#646464] text-base font-[500] leading-[1.2] tracking-normal text-left">
                Didn’t receive the code?
              </span>
              <Link
                to={"/auth/admin/recover-password"}
                className="text-[#D80000] text-base font-[500] leading-[1.2] tracking-normal text-left"
              >
                Resend
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading || otp?.length < 6 || !otp}
              className="border-border border text-[#F3F3F3] text-[24px] font-[600] rounded-[40px] outline-none px-4 w-full h-[72px] mt-6 py-3 focus:border-primary transition-colors duration-300 [background-image:linear-gradient(to_right,#D80000,#720000)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
