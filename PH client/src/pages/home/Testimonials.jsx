"use client"

import { useState, useEffect } from "react"

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "আহমেদ হাসান",
      title: "সিইও ও প্রতিষ্ঠাতা",
      company: "টেকইনোভেশন",
      text: "এই ইভেন্টটি আমার ব্যবসায়িক দৃষ্টিভঙ্গি সম্পূর্ণ পরিবর্তন করে দিয়েছে। নতুন প্রযুক্তি এবং উদ্ভাবনী ধারণাগুলি আমাদের কোম্পানির বৃদ্ধিতে অসাধারণ ভূমিকা রেখেছে।",
      rating: 5,
      date: "জানুয়ারি ১৫, ২০২৫",
    },
    {
      id: 2,
      name: "ফাতিমা খান",
      title: "প্রোডাক্ট ম্যানেজার",
      company: "ডিজিটাল সলিউশন",
      text: "অসাধারণ নেটওয়ার্কিং সুযোগ এবং বিশেষজ্ঞদের সাথে আলোচনার মাধ্যমে আমি আমার ক্যারিয়ারে নতুন দিগন্ত উন্মোচন করতে পেরেছি। প্রতিটি সেশন ছিল অত্যন্ত শিক্ষণীয়।",
      rating: 5,
      date: "জানুয়ারি ১২, ২০২৫",
    },
    {
      id: 3,
      name: "রফিকুল ইসলাম",
      title: "টেকনিক্যাল ডিরেক্টর",
      company: "স্মার্ট সিস্টেমস",
      text: "এআই এবং মেশিন লার্নিং এর উপর যে গভীর আলোচনা হয়েছে, তা আমাদের প্রতিষ্ঠানের ভবিষ্যৎ পরিকল্পনায় গুরুত্বপূর্ণ প্রভাব ফেলেছে। অত্যন্ত মানসম্পন্ন ইভেন্ট।",
      rating: 5,
      date: "জানুয়ারি ১০, ২০২৫",
    },
    {
      id: 4,
      name: "নাসরিন আক্তার",
      title: "বিজনেস ডেভেলপমেন্ট হেড",
      company: "গ্রোথ পার্টনারস",
      text: "উদ্যোক্তাদের জন্য এমন একটি প্ল্যাটফর্ম খুবই প্রয়োজন ছিল। এখানে পাওয়া অভিজ্ঞতা এবং পরামর্শ আমার স্টার্টআপ যাত্রায় অমূল্য সম্পদ হিসেবে কাজ করবে।",
      rating: 4,
      date: "জানুয়ারি ০৮, ২০২৫",
    },
    {
      id: 5,
      name: "কামরুল হাসান",
      title: "ইনোভেশন কনসালট্যান্ট",
      company: "ফিউচার ভিশন",
      text: "টেকনোলজি ট্রেন্ড এবং ভবিষ্যতের বাজার সম্পর্কে যে বিশ্লেষণ পেয়েছি, তা আমার ক্লায়েন্টদের সেবায় নতুন মাত্রা যোগ করেছে। সত্যিই একটি অসাধারণ অভিজ্ঞতা।",
      rating: 5,
      date: "জানুয়ারি ০৫, ২০২৫",
    },
  ]

  // Auto-change testimonial every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-8 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">What Our Participants Say</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Review Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: "#D80000" }}
              >
                {currentTestimonial.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{currentTestimonial.name}</h3>
                <p className="text-gray-500 text-sm">{currentTestimonial.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-green-700 text-sm font-medium">Verified Participant</span>
            </div>
          </div>

          <div className="flex gap-1 mb-4">{renderStars(currentTestimonial.rating)}</div>

          <h4 className="text-xl font-bold text-gray-900 mb-4">Outstanding Experience</h4>

          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded w-full"></div>
            <div className="h-2 bg-gray-200 rounded w-4/5"></div>
            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-red-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                style={{ backgroundColor: index === currentIndex ? "#D80000" : undefined }}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Testimonial Quote */}
        <div className="rounded-2xl p-8 text-white relative overflow-hidden" style={{ backgroundColor: "#D80000" }}>
          {/* Quote Icon */}
          <div className="text-6xl font-bold opacity-20 mb-4">"</div>

          <blockquote className="text-lg leading-relaxed mb-8 relative z-10">{currentTestimonial.text}</blockquote>

          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-white/30"
              style={{ backgroundColor: "#720000" }}
            >
              {currentTestimonial.name.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-xl">{currentTestimonial.name}</h4>
              <p className="text-white/90">{currentTestimonial.title}</p>
              <p className="font-bold text-sm tracking-wider mt-1" style={{ color: "#FFD700" }}>
                {currentTestimonial.company.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Background Pattern */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
            style={{ backgroundColor: "#720000" }}
          ></div>
          <div
            className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
            style={{ backgroundColor: "#720000" }}
          ></div>
        </div>
      </div>
    </div>
  )
}
