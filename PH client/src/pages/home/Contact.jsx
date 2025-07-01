export default function Contact() {
  return (
    <>
      <section className="w-11/12 lg:w-[80%] mx-auto mt-24 px-4 mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-[#7F0B0B] animate-fadeInDown tracking-tight">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Form */}
          <div className="order-2 lg:order-1">
            <form className="bg-gradient-to-br from-white via-[#FFF3E3] to-[#FFF9F5] rounded-3xl shadow-2xl p-8 flex flex-col gap-5 border border-[#7F0B0B]/15 animate-fadeIn">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-[#7F0B0B] mb-2">Get In Touch</h3>
                <p className="text-gray-600">Contact us and ask your questions.</p>
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#7F0B0B]" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium transition-all duration-200"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#7F0B0B]" htmlFor="mail">
                  Email
                </label>
                <input
                  className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium transition-all duration-200"
                  id="mail"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#7F0B0B]" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium transition-all duration-200"
                  id="phone"
                  type="text"
                  placeholder="Your Phone"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-[#7F0B0B]" htmlFor="msg">
                  Message
                </label>
                <textarea
                  className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium transition-all duration-200 resize-none"
                  id="msg"
                  placeholder="Your message..."
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-[#7F0B0B] text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-[#590000] hover:scale-105 transition-all duration-200 mt-4"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side - Map and Contact Info */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-[#7F0B0B] to-[#590000] rounded-3xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p className="text-white/90">Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-white/90">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-white/90">support@eventify.io</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">Working Hours</h4>
                    <p className="text-white/90">Sun- Thus: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#7F0B0B]/15">
              <div className="h-80 bg-gray-200 relative">
                {/* Embedded Map */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.25487308203125!3d23.780753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1642678901234!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl"
                ></iframe>

                {/* Map Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  <p className="text-[#7F0B0B] font-semibold text-sm">📍 Event Location</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            {/* <div className="bg-gradient-to-r from-white via-[#FFF3E3] to-[#FFF9F5] rounded-3xl shadow-xl p-6 border border-[#7F0B0B]/15">
              <h4 className="text-[#7F0B0B] font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-[#7F0B0B] text-white rounded-full flex items-center justify-center hover:bg-[#590000] transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#7F0B0B] text-white rounded-full flex items-center justify-center hover:bg-[#590000] transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#7F0B0B] text-white rounded-full flex items-center justify-center hover:bg-[#590000] transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-[#7F0B0B] text-white rounded-full flex items-center justify-center hover:bg-[#590000] transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  )
}
