

import { useState, useEffect, useRef } from "react"

const priorityEvents = [
  {
    id: 1,
    icon: "🌊",
    name: "Flood Relief",
    subtitle: "বন্যা সহায়তা",
    desc: "Emergency support and rehabilitation during floods with immediate response teams.",
    bengaliDesc: "বন্যার সময় জরুরি সহায়তা ও পুনর্বাসনে তাৎক্ষণিক সাড়া দল।",
    stats: "500+",
    statsLabel: "Families Helped",
    impact: "৫০০+ পরিবার",
    color: "from-cyan-400 via-blue-500 to-blue-600",
    bgPattern: "bg-gradient-to-br from-cyan-50 to-blue-100",
    iconBg: "from-cyan-400 to-blue-500",
    category: "Emergency",
    urgency: "High",
  },
  {
    id: 2,
    icon: "🩸",
    name: "Blood Donation",
    subtitle: "রক্তদান",
    desc: "Organizing blood donation camps to save lives with modern medical facilities.",
    bengaliDesc: "আধুনিক চিকিৎসা সুবিধা সহ জীবন বাঁচাতে রক্তদান শিবির।",
    stats: "1000+",
    statsLabel: "Units Collected",
    impact: "১০০০+ ইউনিট",
    color: "from-red-400 via-red-500 to-red-600",
    bgPattern: "bg-gradient-to-br from-red-50 to-red-100",
    iconBg: "from-red-400 to-red-500",
    category: "Healthcare",
    urgency: "Critical",
  },
  {
    id: 3,
    icon: "🧣",
    name: "Winter Help",
    subtitle: "শীত সহায়তা",
    desc: "Distributing warm clothes and blankets to underprivileged communities.",
    bengaliDesc: "অসহায় সম্প্রদায়ের মাঝে গরম কাপড় ও কম্বল বিতরণ।",
    stats: "2000+",
    statsLabel: "Items Distributed",
    impact: "২০০০+ সামগ্রী",
    color: "from-orange-400 via-yellow-500 to-amber-500",
    bgPattern: "bg-gradient-to-br from-orange-50 to-yellow-100",
    iconBg: "from-orange-400 to-yellow-500",
    category: "Welfare",
    urgency: "Seasonal",
  },
  {
    id: 4,
    icon: "🌳",
    name: "Tree Plantation",
    subtitle: "বৃক্ষরোপণ",
    desc: "Planting trees for environmental conservation and a sustainable future.",
    bengaliDesc: "পরিবেশ সংরক্ষণ ও টেকসই ভবিষ্যতের জন্য বৃক্ষরোপণ।",
    stats: "5000+",
    statsLabel: "Trees Planted",
    impact: "৫০০০+ গাছ",
    color: "from-green-400 via-emerald-500 to-green-600",
    bgPattern: "bg-gradient-to-br from-green-50 to-emerald-100",
    iconBg: "from-green-400 to-emerald-500",
    category: "Environment",
    urgency: "Ongoing",
  },
]

export default function StunningPriorityEvents() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState(0)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % priorityEvents.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e, cardIndex) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "Critical":
        return "bg-red-500 text-white"
      case "High":
        return "bg-orange-500 text-white"
      case "Seasonal":
        return "bg-yellow-500 text-black"
      case "Ongoing":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <>
      <section ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-gray-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
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

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-20">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm font-bold shadow-lg mb-6 animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                আমাদের প্রাথমিকতা
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 via-red-800 to-gray-900 bg-clip-text text-transparent leading-tight">
                Priority Events
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                সমাজের সবচেয়ে গুরুত্বপূর্ণ চাহিদাগুলো পূরণে আমাদের মূল কার্যক্রম
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Side - Featured Card */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="relative">
                <div
                  className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${priorityEvents[activeCard].color} shadow-2xl transform transition-all duration-700`}
                  style={{
                    background: `linear-gradient(135deg, ${priorityEvents[activeCard].color})`,
                  }}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                  </div>

                  <div className="relative z-10 text-white">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getUrgencyColor(priorityEvents[activeCard].urgency)}`}
                      >
                        {priorityEvents[activeCard].urgency}
                      </div>
                      <div className="text-sm opacity-80">{priorityEvents[activeCard].category}</div>
                    </div>

                    {/* Icon */}
                    <div className="text-8xl mb-6 animate-bounce">{priorityEvents[activeCard].icon}</div>

                    {/* Content */}
                    <h3 className="text-3xl font-black mb-2">{priorityEvents[activeCard].name}</h3>
                    <p className="text-lg opacity-90 mb-1">{priorityEvents[activeCard].subtitle}</p>
                    <p className="text-white/80 mb-6 leading-relaxed">{priorityEvents[activeCard].desc}</p>
                    <p className="text-white/70 text-sm italic mb-8">{priorityEvents[activeCard].bengaliDesc}</p>

                    {/* Stats */}
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                      <div className="text-4xl font-black mb-2">{priorityEvents[activeCard].stats}</div>
                      <div className="text-sm opacity-90">{priorityEvents[activeCard].statsLabel}</div>
                      <div className="text-xs opacity-70 mt-1">{priorityEvents[activeCard].impact}</div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-2xl font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                      Get Involved
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Card Grid */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                {priorityEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`group relative cursor-pointer transition-all duration-500 ${
                      activeCard === index ? "scale-105 z-10" : "hover:scale-105"
                    }`}
                    onClick={() => setActiveCard(index)}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl p-6 h-48 bg-gradient-to-br ${event.color} shadow-lg group-hover:shadow-2xl transition-all duration-500`}
                    >
                      {/* Mouse Follow Effect */}
                      {hoveredCard === index && (
                        <div
                          className="absolute w-32 h-32 bg-white/10 rounded-full blur-xl transition-all duration-300"
                          style={{
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      )}

                      {/* Content */}
                      <div className="relative z-10 text-white h-full flex flex-col justify-between">
                        <div>
                          <div className="text-3xl mb-2 group-hover:animate-bounce">{event.icon}</div>
                          <h4 className="font-bold text-lg mb-1">{event.name}</h4>
                          <p className="text-xs opacity-80">{event.subtitle}</p>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-black">{event.stats}</div>
                          <div className="text-xs opacity-70">{event.impact}</div>
                        </div>
                      </div>

                      {/* Active Indicator */}
                      {activeCard === index && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className={`text-center transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Navigation */}
            <div className="flex justify-center gap-4 mb-12">
              {priorityEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCard(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    activeCard === index ? "bg-red-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 max-w-4xl mx-auto">
              <h3 className="text-3xl font-black text-gray-900 mb-4">Ready to Make a Difference?</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Join us and be a part of positive change in society. Your small contribution can make a huge difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  🤝 Become a Volunteer
                </button>
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  💝 Make a Donation
                </button>
                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  📞 Contact Us
                </button>
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
        `}</style>
      </section>
    </>
  )
}
