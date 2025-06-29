import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff] to-[#FFF5F5] px-4">
      <div className="flex flex-col items-center">
        {/* 404 Illustration */}
        <div className="relative mb-8 animate-fadeInDown">
          <div className="text-[7rem] md:text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7F0B0B] to-[#590000] drop-shadow-lg select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              width="120"
              height="120"
              fill="none"
              viewBox="0 0 120 120"
              className="opacity-20 md:opacity-30 -mt-8"
            >
              <circle cx="60" cy="60" r="56" stroke="#7F0B0B" strokeWidth="6" />
              <ellipse cx="45" cy="55" rx="6" ry="9" fill="#7F0B0B" />
              <ellipse cx="75" cy="55" rx="6" ry="9" fill="#7F0B0B" />
              <path
                d="M45 85 Q60 100 75 85"
                stroke="#590000"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
        {/* Message */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#7F0B0B] mb-4 animate-fadeIn">
          Page Not Found
        </h1>
        <p className="text-lg md:text-2xl text-[#590000]/90 mb-8 text-center max-w-[420px] animate-fadeIn">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-[#7F0B0B] to-[#590000] text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg hover:scale-105 transition-all duration-200 animate-fadeIn"
        >
          Go Home
        </Link>
      </div>
      
    </div>
  );
}