"use client"

import { useState, useEffect } from "react"

const galleryImages = [
  {
    src: "https://5.imimg.com/data5/SELLER/Default/2024/11/462865092/KL/FV/UY/73009269/event-management-services.jpeg",
    title: "Corporate Events",
    category: "corporate",
    description: "Professional corporate event management",
  },
  {
    src: "https://media.licdn.com/dms/image/v2/C4E1BAQHQzcJ-Mte5JQ/company-background_10000/company-background_10000/0/1584692313412/atelier_events_dc_llc_cover?e=2147483647&v=beta&t=F_uTm6zZYC0A3yQ8v4IGuRAO2ir5zq-TmhnDPl3P_bM",
    title: "Event Planning",
    category: "planning",
    description: "Complete event planning solutions",
  },
  {
    src: "https://4.imimg.com/data4/WR/TX/MY-23918569/wedding-reception-event-services.jpg",
    title: "Wedding Reception",
    category: "wedding",
    description: "Beautiful wedding celebrations",
  },
  {
    src: "https://onlinecareertraining.bergen.edu/common/images/1/16842/event-management.jpg",
    title: "Event Management",
    category: "corporate",
    description: "Professional event coordination",
  },
  {
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&q=80",
    title: "Conference Setup",
    category: "conference",
    description: "Modern conference arrangements",
  },
  {
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80",
    title: "Catering Services",
    category: "catering",
    description: "Delicious food arrangements",
  },
  {
    src: "https://www.universityevents.harvard.edu/sites/default/files/Homepage-Photo-PG-The-Plaza.jpg",
    title: "University Events",
    category: "academic",
    description: "Educational event management",
  },
  {
    src: "https://www.mbatuts.com/wp-content/uploads/2019/11/Event-Planning-Business-in-plan.jpg",
    title: "Business Planning",
    category: "planning",
    description: "Strategic event planning",
  },
  {
    src: "https://news.miami.edu/uonline/_assets/images/images-stories/2023/10/event-management-sports-lg.jpg",
    title: "Sports Events",
    category: "sports",
    description: "Athletic event coordination",
  },
  {
    src: "https://www.training.com.au/wp-content/uploads/event-manager.jpeg",
    title: "Training Sessions",
    category: "training",
    description: "Professional training events",
  },
  {
    src: "https://gomomentus.com/hs-fs/hubfs/shutterstock_2140269661.jpg?length=1280&name=shutterstock_2140269661.jpg",
    title: "Team Building",
    category: "corporate",
    description: "Corporate team activities",
  },
  {
    src: "https://blog.inevent.com/wp-content/uploads/2024/01/networking-min-1024x577.png",
    title: "Networking Events",
    category: "networking",
    description: "Professional networking sessions",
  },
]

const categories = [
  { id: "all", name: "All Events", icon: "🎯" },
  { id: "corporate", name: "Corporate", icon: "🏢" },
  { id: "wedding", name: "Wedding", icon: "💒" },
  { id: "conference", name: "Conference", icon: "🎤" },
  { id: "planning", name: "Planning", icon: "📋" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "networking", name: "Networking", icon: "🤝" },
]

export default function EnhancedGallery() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImg, setModalImg] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredImages, setFilteredImages] = useState(galleryImages)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      if (activeCategory === "all") {
        setFilteredImages(galleryImages)
      } else {
        setFilteredImages(galleryImages.filter((img) => img.category === activeCategory))
      }
      setLoading(false)
    }, 300)
  }, [activeCategory])

  const openModal = (img, index) => {
    setModalImg(img)
    setCurrentIndex(index)
    setModalOpen(true)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setCurrentIndex(nextIndex)
    setModalImg(filteredImages[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentIndex(prevIndex)
    setModalImg(filteredImages[prevIndex])
  }

  function EnhancedModal({ open, img, onClose, onNext, onPrev, current, total }) {
    if (!open) return null

    return (
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        <div className="relative max-w-6xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors duration-200 z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image */}
          <img
            src={img?.src || "/placeholder.svg"}
            alt={img?.title}
            className="max-h-[70vh] max-w-full rounded-2xl shadow-2xl border-4 border-white/20 animate-zoomIn object-contain"
          />

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-2xl">
            <h3 className="text-white text-xl font-bold mb-2">{img?.title}</h3>
            <p className="text-gray-300 text-sm mb-3">{img?.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-yellow-400 text-sm font-medium">
                {current + 1} / {total}
              </span>
              <div className="flex gap-2">
                {filteredImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === current ? "bg-yellow-400" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="w-11/12 lg:w-[85%] mx-auto mt-24 px-4 mb-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#7F0B0B] animate-fadeInDown tracking-tight">
            Photo Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Check out the beautiful moments of our successful events and get inspired.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? "bg-[#7F0B0B] text-white shadow-lg"
                  : "bg-white text-[#7F0B0B] border-2 border-[#7F0B0B]/20 hover:border-[#7F0B0B]/50 hover:bg-[#7F0B0B]/5"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#7F0B0B] border-t-transparent"></div>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((img, i) => (
              <div
                key={i}
                className="group relative rounded-3xl overflow-hidden shadow-xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn bg-white"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => openModal(img, i)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={img.src || "/placeholder.svg"}
                    alt={img.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7F0B0B]/90 via-[#7F0B0B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="text-white font-bold text-lg mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {img.title}
                      </h3>
                      <p className="text-white/90 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {img.description}
                      </p>
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#7F0B0B] text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                    {categories.find((cat) => cat.id === img.category)?.name || "Event"}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800 truncate">{img.title}</h4>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, index) => (
                        <svg key={index} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredImages.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No images found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}

        {/* Enhanced Modal */}
        <EnhancedModal
          open={modalOpen}
          img={modalImg}
          onClose={() => setModalOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
          current={currentIndex}
          total={filteredImages.length}
        />
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease-out;
        }
        
        .animate-zoomIn {
          animation: zoomIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
