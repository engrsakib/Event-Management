import React, { useEffect, useState } from 'react'
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

export default function Testimonials() {

     const [testimonialIdx, setTestimonialIdx] = useState(0);
      useEffect(() => {
        const interval = setInterval(() => {
          setTestimonialIdx((i) => (i + 1) % testimonials.length);
        }, 15000);
        return () => clearInterval(interval);
      }, []);
  return (
    <>
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
    </>
  )
}
