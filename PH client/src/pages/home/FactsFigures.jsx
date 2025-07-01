/* eslint-disable react-hooks/exhaustive-deps */


import { useState, useEffect, useRef } from "react"

export default function StunningFactsFigures() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ events: 0, topics: 0, sponsors: 0, countries: 0 })
  const [activeCard, setActiveCard] = useState(0)
  const sectionRef = useRef(null)

  const targetCounts = {
    events: 45,
    topics: 32,
    sponsors: 145,
    countries: 11,
  }

  const statsData = [
    {
      key: "events",
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          <circle cx="18" cy="8" r="2" />
          <path d="M18 12c-1.33 0-2.67.33-3.67 1H22v-2c0-1.33-2.67-2-4-2z" />
          <circle cx="6" cy="8" r="2" />
          <path d="M6 12c1.33 0 2.67.33 3.67 1H2v-2c0-1.33 2.67-2 4-2z" />
        </svg>
      ),
      title: "Active Events",
      subtitle: "সক্রিয় ইভেন্ট",
      description: "Successfully organized events",
      color: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      glowColor: "shadow-red-500/30",
    },
    {
      key: "topics",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Topics",
      subtitle: "বিষয়বস্তু",
      description: "Diverse event topics covered",
      color: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      glowColor: "shadow-blue-500/30",
    },
    {
      key: "sponsors",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
        </svg>
      ),
      title: "Sponsors",
      subtitle: "স্পন্সর",
      description: "Trusted business partners",
      color: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      glowColor: "shadow-green-500/30",
    },
    {
      key: "countries",
      icon: (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      ),
      title: "Countries",
      subtitle: "দেশসমূহ",
      description: "International presence",
      color: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      glowColor: "shadow-purple-500/30",
    },
  ]

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  // Counting animation
  useEffect(() => {
    if (isVisible) {
      const duration = 1500
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setCounts({
          events: Math.floor(targetCounts.events * progress),
          topics: Math.floor(targetCounts.topics * progress),
          sponsors: Math.floor(targetCounts.sponsors * progress),
          countries: Math.floor(targetCounts.countries * progress),
        })

        if (currentStep >= steps) {
          setCounts(targetCounts)
          clearInterval(timer)
        }
      }, stepDuration)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  // Auto-rotate active card
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % statsData.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-blue-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-11/12 lg:w-[85%] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-bold shadow-lg mb-6 animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              আমাদের অর্জন
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-red-800 to-gray-900 bg-clip-text text-transparent leading-tight">
              Facts & Figures About Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              আমাদের যাত্রার গুরুত্বপূর্ণ মাইলফলক এবং সাফল্যের পরিসংখ্যান
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-700 mx-auto mt-6 rounded-full"></div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.key}
              className={`group relative transition-all duration-700 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              } ${activeCard === index ? "scale-105 -translate-y-2" : "hover:scale-105 hover:-translate-y-2"}`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Card */}
              <div
                className={`relative overflow-hidden bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 ${
                  activeCard === index ? stat.glowColor : ""
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-tr from-gray-200 to-gray-300 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                    >
                      <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                    </div>

                    {/* Floating Ring */}
                    {activeCard === index && (
                      <div className="absolute inset-0 border-4 border-red-400 rounded-2xl animate-ping opacity-75"></div>
                    )}
                  </div>

                  {/* Counter */}
                  <div className="mb-4">
                    <div className="text-5xl md:text-6xl font-black mb-2 tabular-nums bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                      {counts[stat.key]}
                      <span className="text-2xl">+</span>
                    </div>
                    <div className="text-sm font-medium text-gray-500 mb-1">{stat.subtitle}</div>
                    <div className="text-lg font-bold text-gray-800">{stat.title}</div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{stat.description}</p>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1500 ease-out bg-gradient-to-r ${stat.color}`}
                        style={{
                          width: isVisible ? "100%" : "0%",
                          transitionDelay: `${index * 0.3}s`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Active Indicator */}
                {activeCard === index && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Growing Every Day</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              আমাদের প্রতিটি সংখ্যার পেছনে রয়েছে অসংখ্য মানুষের হাসি, আশা এবং স্বপ্ন পূরণের গল্প।
            </p>
            <div className="flex justify-center items-center gap-4 text-gray-400">
              <div className="w-12 h-px bg-gray-300"></div>
              <div className="text-sm font-medium">Since 2020</div>
              <div className="w-12 h-px bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </section>
  )
}
