import React from "react";
import logo from '/logo.png';

// Dummy payment method images (replace with real URLs)
const paymentLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
  // ...add more as needed
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#7F0B0B] to-[#590000] shadow-lg text-white pt-14 pb-7 border-t border-[#222132] select-none">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 justify-between border-b border-dashed border-[#fff]/40 pb-8">
          {/* Left: Logo & Contact */}
          <div className="flex-1 mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={logo}
                alt="Logo"
                className="h-12"
              />
              <span className="font-bold text-xl text-white">Eventify</span>
            </div>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-start gap-2">
                <span className="mt-1">📍</span>
                Notun Bazar, Dhaka, Bangladesh
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">📧</span>
                Official: <a href="mailto:support@eventify.io" className="underline">support@eventify.io</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1">📞</span>
                Helpline: +880 1234567890, 01234567891, 01345-810871 <br />
              </li>
            </ul>
            <div className="mt-7">
              <span className="text-lg font-semibold">Pay With</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {paymentLogos.map((logo, i) => (
                  <img
                    key={i}
                    src={logo}
                    alt="paymethod"
                    className="h-7 w-auto bg-white rounded-md p-1 shadow"
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Middle: Useful Links */}
          <div className="flex-1 mb-6 lg:mb-0">
            <h4 className="font-bold mb-3 text-lg">Useful Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-yellow-300">Refund policy</a></li>
              <li><a href="#" className="hover:text-yellow-300">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-yellow-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-300">App Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-300">About us</a></li>
              <li><a href="#" className="hover:text-yellow-300">Success Story</a></li>
            </ul>
          </div>
          {/* Right: Social & App */}
          <div className="flex-1">
            <h4 className="font-bold mb-3 text-lg">Social Media Link</h4>
            <div className="flex gap-5 mb-4 text-2xl">
              {/* Facebook */}
              <a href="#" className="hover:text-yellow-300" aria-label="Facebook">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.89 3.66 8.94 8.44 9.82v-6.94H7.9v-2.88h2.54v-2.21c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.76-1.61 1.54v1.91h2.74l-.44 2.88h-2.3v6.94C18.34 21 22 16.96 22 12.07z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-yellow-300" aria-label="Instagram">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2A5.76 5.76 0 0 0 2 7.75v8.5A5.76 5.76 0 0 0 7.75 22h8.5A5.76 5.76 0 0 0 22 16.25v-8.5A5.76 5.76 0 0 0 16.25 2h-8.5Zm0 1.5h8.5A4.24 4.24 0 0 1 20.5 7.75v8.5A4.24 4.24 0 0 1 16.25 20.5h-8.5A4.24 4.24 0 0 1 3.5 16.25v-8.5A4.24 4.24 0 0 1 7.75 3.5ZM12 7.25A4.75 4.75 0 1 0 16.75 12 4.76 4.76 0 0 0 12 7.25Zm0 1.5A3.25 3.25 0 1 1 8.75 12 3.25 3.25 0 0 1 12 8.75Zm5.13-.88a1.13 1.13 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="hover:text-yellow-300" aria-label="LinkedIn">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 10.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.533 0-1.767 1.198-1.767 2.435v4.682h-3v-9h2.881v1.233h.041c.401-.759 1.379-1.561 2.84-1.561 3.037 0 3.6 2.001 3.6 4.6v4.728z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="hover:text-yellow-300" aria-label="YouTube">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a2.958 2.958 0 0 0-2.083-2.085c-1.844-.498-9.415-.498-9.415-.498s-7.572 0-9.415.498a2.958 2.958 0 0 0-2.084 2.085c-.498 1.845-.498 5.698-.498 5.698s0 3.853.498 5.698a2.958 2.958 0 0 0 2.084 2.084c1.843.498 9.415.498 9.415.498s7.571 0 9.415-.498a2.958 2.958 0 0 0 2.083-2.084c.498-1.845.498-5.698.498-5.698s0-3.853-.498-5.698zm-13.997 9.776v-7.728l6.5 3.864-6.5 3.864z"/>
                </svg>
              </a>
            </div>
            <div>
              <span className="font-semibold">Download App</span>
              <div className="mt-2">
                <a href="#" className="inline-block">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-12 rounded shadow"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom: License, Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm mt-5 pt-5 border-t border-[#222132] gap-2">
          <div>Trade License: 177159</div>
          <div className="text-center">
            Copyright © {new Date().getFullYear()} Md. Nazmus Sakib
          </div>
          <div>v 2.1.5</div>
        </div>
      </div>
    </footer>
  );
}