import React, { useState, useEffect } from "react";

// 1. Carousel Section
const carouselData = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    text: "Flood Relief Event",
  },
  {
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
    text: "Blood Donation Drive",
  },
  {
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    text: "Winter Clothes Distribution",
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    text: "Tree Plantation Campaign",
  },
  {
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    text: "Education for All",
  },
  {
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    text: "Food for Needy",
  },
];

// 2. Who We Are section
const whoWeAre = [
  {
    title: "Our Mission",
    icon: (
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M12 8c-1.845 0-3.5 1.02-3.5 2.5S10.155 13 12 13s3.5-1.02 3.5-2.5S13.845 8 12 8z"/><path strokeWidth="2" d="M12 22s8-4.5 8-10V5.75C20 4.784 19.216 4 18.25 4h-12.5C4.784 4 4 4.784 4 5.75V12c0 5.5 8 10 8 10z"/></svg>
    ),
    desc: "We are committed to helping people in need through various events and drives, inspiring positive change in society.",
  },
  {
    title: "Our Vision",
    icon: (
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth="2"/><path strokeWidth="2" d="M2 12C3.5 7 7.5 4 12 4s8.5 3 10 8c-1.5 5-5.5 8-10 8s-8.5-3-10-8z"/></svg>
    ),
    desc: "To be the most impactful social event platform in Bangladesh, connecting volunteers with people in need.",
  },
  {
    title: "Our Values",
    icon: (
      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M12 20l-7-7 7-7 7 7-7 7z"/></svg>
    ),
    desc: "Empathy, integrity, transparency, and action are at the heart of every event we organize.",
  },
];

// 3. Priority Events
const priorityEvents = [
  {
    icon: "🌊",
    name: "Flood Relief",
    desc: "Emergency support and rehabilitation during floods.",
    color: "bg-cyan-100 text-cyan-800",
  },
  {
    icon: "🩸",
    name: "Blood Donation",
    desc: "Organizing blood donation camps to save lives.",
    color: "bg-rose-100 text-rose-800",
  },
  {
    icon: "🧣",
    name: "Winter Help",
    desc: "Distributing warm clothes to the underprivileged.",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    icon: "🌳",
    name: "Tree Plantation",
    desc: "Planting trees for a greener tomorrow.",
    color: "bg-green-100 text-green-800",
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
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIdx((idx) => (idx + 1) % carouselData.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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
    <main className="bg-gradient-to-br from-white to-gray-100 min-h-screen text-[#222]">
      {/* Carousel */}
      <section className="w-full h-[350px] md:h-[480px] lg:h-[620px] relative overflow-hidden shadow-2xl rounded-b-3xl animate-fadeIn">
        {carouselData.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === carouselIdx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            aria-hidden={i !== carouselIdx}
          >
            <img
              src={item.img}
              className="w-full h-full object-cover object-center scale-105 blur-[1px]"
              alt={item.text}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-white/0 flex items-center justify-center">
              <h2 className="text-3xl md:text-5xl font-extrabold px-4 py-2 rounded-xl shadow-2xl text-primary backdrop-blur-2xl animate-slideInUp tracking-tight uppercase drop-shadow-lg">
                {item.text}
              </h2>
            </div>
          </div>
        ))}
        <div className="absolute bottom-7 w-full flex justify-center gap-2 z-10">
          {carouselData.map((_, i) => (
            <span
              key={i}
              className={`h-[12px] w-[12px] rounded-full cursor-pointer ring-2 transition-all duration-200 ${carouselIdx === i ? "bg-primary ring-primary" : "bg-gray-300 ring-gray-300/60"}`}
              onClick={() => setCarouselIdx(i)}
            />
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-5xl mx-auto mt-14 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-7 text-center text-primary animate-fadeInDown">Who We Are</h2>
        <div className="grid md:grid-cols-3 gap-7">
          {whoWeAre.map((item, i) => (
            <div
              key={i}
              className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center border border-primary/10 hover:-translate-y-2 transition-all duration-300 group animate-fadeIn"
            >
              <span className="mb-3 drop-shadow-xl group-hover:scale-125 transition-transform duration-300">{item.icon}</span>
              <h3 className="mt-3 mb-2 font-bold text-xl text-primary group-hover:text-secondary transition">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Priority Events */}
      <section className="max-w-6xl mx-auto mt-20 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-7 text-center text-primary animate-fadeInDown">Our Priority Events</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-7">
          {priorityEvents.map((e, i) => (
            <div
              key={i}
              className={`rounded-2xl shadow-xl p-8 flex flex-col items-center border border-primary/10 bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-fadeIn`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className={`text-4xl mb-2 animate-bounce-slow`}>{e.icon}</span>
              <h4 className={`font-bold text-lg mb-1 ${e.color}`}>{e.name}</h4>
              <p className="text-gray-600 text-center text-sm">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-3xl mx-auto mt-20 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-7 text-center text-primary animate-fadeInDown">Testimonials</h2>
        <div className="relative min-h-[220px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${i === testimonialIdx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full border-4 border-primary shadow-xl mb-4 animate-scaleIn"
              />
              <p className="text-lg text-center max-w-xl mb-2 text-[#222] font-medium">"{t.text}"</p>
              <div className="font-extrabold text-primary">{t.name}</div>
              <div className="text-sm text-gray-500">{t.title}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full cursor-pointer border-2 transition-all duration-150 ${testimonialIdx === i ? "bg-primary border-primary" : "bg-gray-300 border-gray-300/60"}`}
              onClick={() => setTestimonialIdx(i)}
            />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-5xl mx-auto mt-20 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-7 text-center text-primary animate-fadeInDown">Photo Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="relative group rounded-2xl overflow-hidden shadow-xl cursor-pointer animate-fadeIn"
              onClick={() => openModal(img)}
            >
              <img
                src={img}
                alt={`gallery-${i}`}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200">
                <span className="text-5xl text-white font-bold animate-bounce">+</span>
              </div>
            </div>
          ))}
        </div>
        <GalleryModal open={modalOpen} img={modalImg} onClose={() => setModalOpen(false)} />
      </section>

      {/* Contact Form */}
      <section className="max-w-xl mx-auto mt-20 px-4 mb-20">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-7 text-center text-primary animate-fadeInDown">Contact Us</h2>
        <form className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-4 border border-primary/10 animate-fadeIn">
          <div>
            <label className="block mb-2 font-semibold text-primary" htmlFor="name">Name</label>
            <input className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" id="name" type="text" placeholder="Your Name" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-primary" htmlFor="mail">Email</label>
            <input className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" id="mail" type="email" placeholder="your@email.com" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-primary" htmlFor="phone">Phone</label>
            <input className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" id="phone" type="text" placeholder="Your Phone" required />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-primary" htmlFor="msg">Message</label>
            <textarea className="w-full bg-gray-100 text-[#7F0B0B] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" id="msg" placeholder="Your message..." rows={4} required />
          </div>
          <button type="submit" className="bg-primary text-white font-bold px-8 py-2 rounded-xl shadow hover:bg-secondary transition">Send</button>
        </form>
      </section>

      {/* Custom Animations */}
      <style>
        {`
        .text-primary { color: #7F0B0B; }
        .bg-primary { background-color: #7F0B0B; }
        .border-primary { border-color: #7F0B0B; }
        .ring-primary { --tw-ring-color: #7F0B0B; }
        .text-secondary { color: #590000; }
        .bg-secondary { background-color: #590000; }
        .hover\\:bg-secondary:hover { background-color: #590000; }
        .animate-fadeIn { animation: fadeIn 1.1s cubic-bezier(.4,0,.2,1); }
        .animate-fadeInDown { animation: fadeInDown 1s cubic-bezier(.4,0,.2,1); }
        .animate-slideInUp { animation: slideInUp 1s cubic-bezier(.4,0,.2,1); }
        .animate-zoomIn { animation: zoomIn 0.3s cubic-bezier(.4,0,.2,1); }
        .animate-bounce-slow { animation: bounce 2s infinite; }
        .animate-scaleIn { animation: scaleIn .7s cubic-bezier(.4,0,.2,1); }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeInDown { from { opacity:0; transform: translateY(-32px);} to { opacity:1; transform: none; } }
        @keyframes slideInUp { from {opacity:0; transform:translateY(30px);} to {opacity:1; transform:none;} }
        @keyframes zoomIn { from {opacity:0; transform:scale(0.9);} to {opacity:1; transform:scale(1);} }
        @keyframes scaleIn { from {opacity:0; transform:scale(0.8);} to {opacity:1; transform:scale(1);} }
        `}
      </style>
    </main>
  );
}