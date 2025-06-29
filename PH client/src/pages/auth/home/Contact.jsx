import React from "react";

export default function Contact() {
  return (
    <>
      <section className="max-w-xl mx-auto mt-24 px-4 mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-[#7F0B0B] animate-fadeInDown tracking-tight">
          Contact Us
        </h2>
        <form className="bg-gradient-to-br from-white via-[#FFF3E3] to-[#FFF9F5] rounded-3xl shadow-2xl p-10 flex flex-col gap-5 border border-[#7F0B0B]/15 animate-fadeIn">
          <div>
            <label
              className="block mb-2 font-semibold text-[#7F0B0B]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium"
              id="name"
              type="text"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 font-semibold text-[#7F0B0B]"
              htmlFor="mail"
            >
              Email
            </label>
            <input
              className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium"
              id="mail"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 font-semibold text-[#7F0B0B]"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium"
              id="phone"
              type="text"
              placeholder="Your Phone"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 font-semibold text-[#7F0B0B]"
              htmlFor="msg"
            >
              Message
            </label>
            <textarea
              className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium"
              id="msg"
              placeholder="Your message..."
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#7F0B0B] text-white font-bold px-8 py-2 rounded-xl shadow hover:bg-[#590000] hover:scale-105 transition-all duration-200"
          >
            Send
          </button>
        </form>
      </section>
    </>
  );
}
