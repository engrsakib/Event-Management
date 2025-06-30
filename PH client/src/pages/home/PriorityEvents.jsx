import React from 'react'

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


export default function PriorityEvents() {
  return (
    <>
       {/* Priority Events */}
      <section className="w-11/12 lg:w-[80%] mx-auto mt-20 px-4">
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
    </>
  )
}
