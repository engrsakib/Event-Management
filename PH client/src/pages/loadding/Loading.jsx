import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-[9999]">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <span className="relative flex h-20 w-20">
          <span className="animate-[spin_1.1s_linear_infinite] absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-[#7F0B0B] via-[#FFDF8B] to-[#590000] opacity-25"></span>
          <span className="relative inline-flex rounded-full h-20 w-20 border-8 border-[#7F0B0B] border-t-[#FFDF8B] border-b-[#590000] border-r-transparent animate-spin" />
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#7F0B0B] animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeWidth="2" strokeLinecap="round" d="M8 12h8" />
            </svg>
          </span>
        </span>
        {/* Text */}
        <div className="mt-6 text-lg font-bold text-[#7F0B0B] animate-fadeInUp tracking-wider select-none">
          Loading...
        </div>
      </div>
      <style>
        {`
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px);}
          to { opacity: 1; transform: none;}
        }
        `}
      </style>
    </div>
  );
}