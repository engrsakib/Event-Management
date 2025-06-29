import React, { useState, useEffect } from "react";
import Carasol from "./Carasol";

// 1. Carousel Section Data


// 2. Who We Are section
const whoWeAre = [
  {
    title: "Our Mission",
    icon: (
      <svg className="w-12 h-12 text-[#7F0B0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M12 8c-1.845 0-3.5 1.02-3.5 2.5S10.155 13 12 13s3.5-1.02 3.5-2.5S13.845 8 12 8z"/><path strokeWidth="2" d="M12 22s8-4.5 8-10V5.75C20 4.784 19.216 4 18.25 4h-12.5C4.784 4 4 4.784 4 5.75V12c0 5.5 8 10 8 10z"/></svg>
    ),
    desc: "We are dedicated to social change — running impactful events, guiding volunteers, and building a better tomorrow.",
  },
  {
    title: "Our Vision",
    icon: (
      <svg className="w-12 h-12 text-[#7F0B0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth="2"/><path strokeWidth="2" d="M2 12C3.5 7 7.5 4 12 4s8.5 3 10 8c-1.5 5-5.5 8-10 8s-8.5-3-10-8z"/></svg>
    ),
    desc: "To be the top event platform in Bangladesh — connecting hearts, hands, and hope.",
  },
  {
    title: "Our Values",
    icon: (
      <svg className="w-12 h-12 text-[#7F0B0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M12 20l-7-7 7-7 7 7-7 7z"/></svg>
    ),
    desc: "Empathy. Integrity. Transparency. Action. This is our DNA for every event, every smile.",
  },
];

// 3. Priority Events
const priorityEvents = [
  {
    icon: "🌊",
    name: "Flood Relief",
    desc: "Emergency support and rehabilitation during floods.",
    color: "from-[#7F0B0B]/80 to-[#FFDF8B]/90",
    shadow: "shadow-[0_10px_40px_0_rgba(127,11,11,0.20)]",
  },
  {
    icon: "🩸",
    name: "Blood Donation",
    desc: "Organizing blood donation camps to save lives.",
    color: "from-[#E52A2A]/80 to-[#FFBABA]/90",
    shadow: "shadow-[0_10px_40px_0_rgba(229,42,42,0.20)]",
  },
  {
    icon: "🧣",
    name: "Winter Help",
    desc: "Distributing warm clothes to the underprivileged.",
    color: "from-[#FFB300]/80 to-[#FFF6D6]/90",
    shadow: "shadow-[0_10px_40px_0_rgba(255,179,0,0.18)]",
  },
  {
    icon: "🌳",
    name: "Tree Plantation",
    desc: "Planting trees for a greener tomorrow.",
    color: "from-[#2BC48A]/80 to-[#CFFFE6]/90",
    shadow: "shadow-[0_10px_40px_0_rgba(43,196,138,0.18)]",
  },
];

// 4. Testimonials
const testimonials = [
  {
    name: "Nahid Hasan",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    title: "Volunteer",
    text: "Joining Eventify changed my life. Helping flood victims made me realize the power of community.",
  },
  {
    name: "Rima Akter",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    title: "Donor",
    text: "Blood donation camps are so well organized. Proud to be a regular donor!",
  },
  {
    name: "Shuvo Islam",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Beneficiary",
    text: "Last winter, the warm clothes from Eventify helped my family survive the cold.",
  },
];

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
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Gallery Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  return (
    <main className="bg-gradient-to-br from-white to-[#FFF9F5] min-h-screen text-[#232323]">

        <Carasol/>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto mt-16 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-9 text-center text-[#7F0B0B] animate-fadeInDown tracking-tight">Who We Are</h2>
        <div className="grid md:grid-cols-3 gap-9">
          {whoWeAre.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-white to-[#FFF4E3]/80 shadow-lg rounded-3xl p-10 flex flex-col items-center text-center border border-[#7F0B0B]/15 hover:-translate-y-3 hover:scale-[1.045] hover:shadow-2xl transition-all duration-350 group animate-fadeIn"
            >
              <span className="mb-3 drop-shadow-xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
              <h3 className="mt-3 mb-3 font-extrabold text-2xl text-[#7F0B0B] group-hover:text-yellow-500 transition">{item.title}</h3>
              <p className="text-gray-600 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Priority Events */}
      <section className="max-w-7xl mx-auto mt-20 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-[#7F0B0B] animate-fadeInDown tracking-tight">Our Priority Events</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {priorityEvents.map((e, i) => (
            <div
              key={i}
              className={`rounded-3xl p-10 flex flex-col items-center border-2 border-white/80 bg-gradient-to-br ${e.color} hover:scale-105 hover:shadow-2xl ${e.shadow} transition-all duration-300 animate-fadeIn`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className={`text-5xl mb-3 animate-bounce-slow`}>{e.icon}</span>
              <h4 className={`font-bold text-xl mb-2 text-[#7F0B0B]`}>{e.name}</h4>
              <p className="text-gray-700 text-center text-base font-medium">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-3xl mx-auto mt-24 px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-[#7F0B0B] animate-fadeInDown tracking-tight">Testimonials</h2>
        <div className="relative min-h-[240px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-1000 ${i === testimonialIdx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-24 h-24 rounded-full border-[4px] border-[#7F0B0B] shadow-xl mb-5 animate-scaleIn"
              />
              <p className="text-xl text-gray-700 font-semibold max-w-xl mb-3 font-serif italic">"{t.text}"</p>
              <div className="font-extrabold text-[#7F0B0B] text-lg">{t.name}</div>
              <div className="text-sm text-gray-500">{t.title}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-5">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-3.5 w-3.5 rounded-full cursor-pointer border-2 transition-all duration-150 ${testimonialIdx === i ? "bg-[#7F0B0B] border-yellow-400" : "bg-gray-300 border-gray-300/60"}`}
              onClick={() => setTestimonialIdx(i)}
            />
          ))}
        </div>
      </section>

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