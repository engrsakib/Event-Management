import React, { useEffect, useState } from 'react'

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

export default function Carasol() {
    const [carouselIdx, setCarouselIdx] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setCarouselIdx((idx) => (idx + 1) % carouselData.length);
        }, 3400);
        return () => clearInterval(interval);
      }, []);
  return (
    <>
       {/* Carousel */}
      <section className="w-full h-[340px] md:h-[460px] lg:h-[580px] relative overflow-hidden shadow-2xl animate-fadeIn">
        {carouselData.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === carouselIdx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            aria-hidden={i !== carouselIdx}
          >
            <img
              src={item.img}
              className="w-full h-full object-cover object-center scale-110 blur-[1.5px] brightness-90"
              alt={item.text}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7F0B0B]/90 via-white/45 to-white/0 flex items-center justify-center">
              <h2 className="text-[2.3rem] md:text-5xl font-extrabold px-8 py-4 rounded-[2.5rem] shadow-2xl text-white bg-[#7F0B0B]/90 backdrop-blur-3xl animate-slideInUp tracking-wider uppercase drop-shadow-2xl border-[3.5px] border-yellow-300">
                {item.text}
              </h2>
            </div>
          </div>
        ))}
        <div className="absolute bottom-8 w-full flex justify-center gap-2 z-10">
          {carouselData.map((_, i) => (
            <span
              key={i}
              className={`h-[14px] w-[14px] rounded-full cursor-pointer ring-2 transition-all duration-200 ${carouselIdx === i ? "bg-[#7F0B0B] ring-yellow-300" : "bg-white/60 ring-[#7F0B0B]/30"}`}
              onClick={() => setCarouselIdx(i)}
            />
          ))}
        </div>
      </section>
    </>
  )
}
