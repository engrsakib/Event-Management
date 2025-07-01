"use client"

import { useEffect, useState } from "react"

const carouselData = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    text: "Flood Relief Event",
    subtitle: "সাহায্যের হাত বাড়িয়ে দিন",
    description: "বন্যা দুর্গতদের পাশে দাঁড়ান",
  },
  {
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
    text: "Blood Donation Drive",
    subtitle: "জীবন বাঁচান, রক্ত দান করুন",
    description: "একটি রক্তদান একটি জীবন",
  },
  {
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    text: "Winter Clothes Distribution",
    subtitle: "শীতের উষ্ণতা ভাগ করুন",
    description: "গরিব মানুষদের শীতবস্ত্র দিন",
  },
  {
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",
    text: "Tree Plantation Campaign",
    subtitle: "সবুজ পৃথিবী গড়ুন",
    description: "পরিব���শ রক্ষায় এগিয়ে আসুন",
  },
  {
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    text: "Education for All",
    subtitle: "শিক্ষার আলো ছড়িয়ে দিন",
    description: "সবার জন্য শিক্ষার সুযোগ",
  },
  {
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
    text: "Food for Needy",
    subtitle: "ক্ষুধার্তদের খাবার দিন",
    description: "কেউ যেন ক্ষুধার্ত না থাকে",
  },
]

export default function EnhancedCarousel() {
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval
    let progressInterval

    if (isPlaying) {
      // Main carousel interval
      interval = setInterval(() => {
        setCarouselIdx((idx) => (idx + 1) % carouselData.length)
        setProgress(0)
      }, 5000)

      // Progress bar interval
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0
          }
          return prev + 2
        })
      }, 100)
    }

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [isPlaying])

  const nextSlide = () => {
    setCarouselIdx((idx) => (idx + 1) % carouselData.length)
    setProgress(0)
  }

  const prevSlide = () => {
    setCarouselIdx((idx) => (idx - 1 + carouselData.length) % carouselData.length)
    setProgress(0)
  }

  const goToSlide = (index) => {
    setCarouselIdx(index)
    setProgress(0)
  }

  return (
    <>
      <section
        className="w-full h-[85vh] relative overflow-hidden shadow-2xl group"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Background Images */}
        {carouselData.map((item, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === carouselIdx ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
            }`}
            aria-hidden={i !== carouselIdx}
          >
            <img
              src={item.img || "/placeholder.svg"}
              className="w-full h-full object-cover object-center transition-transform duration-[8000ms] hover:scale-110"
              alt={item.text}
            />

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#7F0B0B]/95 via-[#7F0B0B]/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 lg:pl-24">
              <div className="max-w-2xl text-white space-y-6 animate-fadeInLeft">
                {/* Main Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                  <span className="block text-yellow-300 text-lg md:text-xl font-medium mb-2 animate-slideInDown">
                    {item.subtitle}
                  </span>
                  <span className="bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent drop-shadow-2xl">
                    {item.text}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed animate-slideInUp">
                  {item.description}
                </p>

                {/* Call to Action Button */}
                <div className="flex gap-4 pt-4 animate-slideInUp">
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-[#7F0B0B] font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    যোগ দিন
                  </button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-[#7F0B0B] font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105">
                    আরও জানুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Enhanced Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full">
            {carouselData.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`relative transition-all duration-300 ${
                  carouselIdx === i
                    ? "w-12 h-3 bg-yellow-400 rounded-full"
                    : "w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full hover:scale-125"
                }`}
              >
                {carouselIdx === i && (
                  <div
                    className="absolute top-0 left-0 h-full bg-[#7F0B0B] rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-6 right-6 z-20 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Slide Counter */}
        <div className="absolute top-6 left-6 z-20 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-yellow-400">{carouselIdx + 1}</span>
          <span className="mx-1">/</span>
          <span>{carouselData.length}</span>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#7F0B0B]/20 to-transparent pointer-events-none"></div>

        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.8s ease-out 0.2s both;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out 0.4s both;
        }
      `}</style>
    </>
  )
}
