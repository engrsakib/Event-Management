/* eslint-disable react-hooks/exhaustive-deps */


import { useState, useEffect, useRef } from "react"

const whoWeAre = [
  {
    title: "Our Mission",
    subtitle: "আমাদের লক্ষ্য",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeWidth="2" d="M12 8c-1.845 0-3.5 1.02-3.5 2.5S10.155 13 12 13s3.5-1.02 3.5-2.5S13.845 8 12 8z" />
        <path
          strokeWidth="2"
          d="M12 22s8-4.5 8-10V5.75C20 4.784 19.216 4 18.25 4h-12.5C4.784 4 4 4.784 4 5.75V12c0 5.5 8 10 8 10z"
        />
      </svg>
    ),
    desc: "We are dedicated to social change — running impactful events, guiding volunteers, and building a better tomorrow.",
    bengaliDesc: "আমরা সামাজিক পরিবর্তনে নিবেদিত — প্রভাবশালী ইভেন্ট পরিচালনা, স্বেচ্ছাসেবকদের গাইড করা এবং একটি উন্নত আগামী গড়ে তোলা।",
    color: "from-red-500 to-red-600",
    bgColor: "from-red-50 to-red-100",
  },
  {
    title: "Our Vision",
    subtitle: "আমাদের দৃষ্টিভঙ্গি",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
        <path strokeWidth="2" d="M2 12C3.5 7 7.5 4 12 4s8.5 3 10 8c-1.5 5-5.5 8-10 8s-8.5-3-10-8z" />
      </svg>
    ),
    desc: "To be the top event platform in Bangladesh — connecting hearts, hands, and hope.",
    bengaliDesc: "বাংলাদেশের শীর্ষ ইভেন্ট প্ল্যাটফর্ম হওয়া — হৃদয়, হাত এবং আশার সংযোগ স্থাপন।",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50",
  },
  {
    title: "Our Values",
    subtitle: "আমাদের মূল্যবোধ",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    desc: "Empathy. Integrity. Transparency. Action. This is our DNA for every event, every smile.",
    bengaliDesc: "সহানুভূতি। সততা। স্বচ্ছতা। কর্ম। এটি প্রতিটি ইভেন্ট, প্রতিটি হাসির জন্য আমাদের DNA।",
    color: "from-red-600 to-red-700",
    bgColor: "from-red-100 to-red-50",
  },
]

export default function EnhancedWhoWeAre() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <>
      <section ref={sectionRef} className="w-11/12 lg:w-[85%] mx-auto mt-20 px-4 py-16 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-orange-100 to-red-100 rounded-full opacity-15 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-red-50 to-orange-50 rounded-full opacity-10 blur-3xl"></div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-semibold shadow-lg">
              আমাদের পরিচয়
            </span>
          </div>
          <h2
            className={`text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Who We Are
          </h2>
          <p
            className={`text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            We are a purpose-driven organization working towards positive change in society. Each of our events represents a dream, a hope, and a commitment to a better future.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 relative z-10">
          {whoWeAre.map((item, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform border border-red-100 overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              } hover:-translate-y-4 hover:scale-105`}
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              ></div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-tr from-orange-200 to-red-200 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon Container */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <h3 className="text-2xl font-extrabold text-red-800 mb-1 group-hover:text-red-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-red-600 opacity-80">{item.subtitle}</p>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <p className="text-gray-700 text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    {item.desc}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed italic opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    {item.bengaliDesc}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full mt-6">
                  <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: hoveredCard === i ? "100%" : isVisible ? "70%" : "0%",
                        transitionDelay: `${i * 0.3}s`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Floating Action Button */}
                <button className="mt-6 px-6 py-2 bg-white border-2 border-red-200 text-red-700 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-red-50 hover:border-red-300">
                  Learn More
                </button>
              </div>

              {/* Hover Border Effect */}
              <div
                className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-red-300 transition-all duration-300 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16 relative z-10">
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-gray-600 text-lg mb-6">আমাদের সাথে যোগ দিন এবং একসাথে একটি উন্নত সমাজ গড়ে তুলুন</p>
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-red-700 hover:to-red-800">
              Join Our Mission
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-red-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-orange-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-5 w-3 h-3 bg-red-400 rounded-full opacity-40 animate-ping"></div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 30px rgba(220, 38, 38, 0.5); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
