import React, { useState } from "react";
import Carasol from "./Carasol";
import WhoWeAre from "./WhoWeAre";
import PriorityEvents from "./PriorityEvents";

// 1. Carousel Section Data


// 2. Who We Are section


// 3. Priority Events

// 4. Testimonials


// 5. Gallery
const galleryImages = [
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b8a?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b8a?auto=format&fit=crop&w=500&q=80",
];

// Utility: Modal for Gallery Zoom
function GalleryModal({ open, img, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 animate-fadeIn"
      onClick={onClose}
    >
      <img
        src={img}
        alt="zoomed"
        className="max-h-[80vh] max-w-[92vw] rounded-2xl shadow-2xl border-4 border-white animate-zoomIn"
      />
    </div>
  );
}

export default function Home() {
  // Carousel state
  

  

  // Testimonial state
 

  // Gallery Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  return (
    <main className="bg-gradient-to-br from-white to-[#FFF9F5] min-h-screen text-[#232323]">
        {/* carsol */}
        <Carasol/>
        {/* who we are */}
        <WhoWeAre/>
        {/* priority events */}
        <PriorityEvents/>

     

      {/* Testimonials */}
      

      {/* Gallery */}
      <section className="max-w-6xl mx-auto mt-24 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-[#7F0B0B] animate-fadeInDown tracking-tight">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative group rounded-3xl overflow-hidden shadow-lg cursor-pointer animate-fadeIn hover:ring-4 ring-[#7F0B0B]/30"
              onClick={() => openModal(img)}
            >
              <img
                src={img}
                alt={`gallery-${i}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7F0B0B]/80 via-transparent to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                <span className="text-6xl text-white drop-shadow-lg font-bold animate-bounce">+</span>
              </div>
            </div>
          ))}
        </div>
        <GalleryModal open={modalOpen} img={modalImg} onClose={() => setModalOpen(false)} />
      </section>

      {/* Contact Form */}
      <section className="max-w-xl mx-auto mt-24 px-4 mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-[#7F0B0B] animate-fadeInDown tracking-tight">Contact Us</h2>
        <form className="bg-gradient-to-br from-white via-[#FFF3E3] to-[#FFF9F5] rounded-3xl shadow-2xl p-10 flex flex-col gap-5 border border-[#7F0B0B]/15 animate-fadeIn">
          <div>
            <label className="block mb-2 font-semibold text-[#7F0B0B]" htmlFor="name">Name</label>
            <input className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium" id="name" type="text" placeholder="Your Name" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#7F0B0B]" htmlFor="mail">Email</label>
            <input className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium" id="mail" type="email" placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#7F0B0B]" htmlFor="phone">Phone</label>
            <input className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium" id="phone" type="text" placeholder="Your Phone" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#7F0B0B]" htmlFor="msg">Message</label>
            <textarea className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7F0B0B]/30 font-medium" id="msg" placeholder="Your message..." rows={4} required />
          </div>
          <button type="submit" className="bg-[#7F0B0B] text-white font-bold px-8 py-2 rounded-xl shadow hover:bg-[#590000] hover:scale-105 transition-all duration-200">Send</button>
        </form>
      </section>

      
    </main>
  );
}