

export default function EventOverview() {
  return (
    <div className="w-11/12 lg:w-[80%] mx-auto p-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Text Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-red-900 mb-4 tracking-wide">OVERVIEW OF OUR MISSION</h1>
            <p className="text-gray-600 italic text-sm mb-8">
              Join us for an inspiring gathering of innovators, entrepreneurs, and creative minds
            </p>
            <div className="w-16 h-0.5 bg-red-800 mb-8"></div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-red-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
              L
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-4">
                Our annual innovation summit brings together forward-thinking professionals from diverse industries to
                share insights, collaborate on groundbreaking projects, and explore the future of technology and
                business. This year's event focuses on sustainable innovation and digital transformation.
              </p>
            </div>
          </div>

          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Experience three days of intensive workshops, keynote presentations, and networking opportunities designed
              to accelerate your professional growth. Connect with industry leaders, discover emerging trends, and gain
              practical knowledge that you can immediately apply to your work.
            </p>

            <p>
              The summit features interactive sessions covering artificial intelligence, sustainable business practices,
              digital marketing strategies, and innovative product development. Participants will have access to
              exclusive resources, mentorship opportunities, and collaborative workspace environments throughout the
              event.
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative">
          <div className="relative border-2 border-gray-300 p-4">
            {/* Decorative corner elements */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-red-800"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-red-800"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-red-800"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-red-800"></div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Team collaboration session with professionals working together around a table with laptops and coffee"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />

              {/* Pagination dots */}
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-red-600 shadow-sm"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
