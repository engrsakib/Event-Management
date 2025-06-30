import React from 'react'

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

export default function WhoWeAre() {
  return (
    <>
      {/* Who We Are */}
      <section className="w-[80%] mx-auto mt-16 px-4">
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
    </>
  )
}
