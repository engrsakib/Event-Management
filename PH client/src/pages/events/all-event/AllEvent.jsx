"use client"

/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { FaSearch, FaTimes, FaUserFriends, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaStar } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import Swal from "sweetalert2"
import axiosSecure from "../../../utils/axiosSecure"
import nodata from "/nodata.svg"
import useProfile from "../../../hooks/getUserProfile"

const FILTERS = [
  { value: "", label: "All Time", icon: "🌟" },
  { value: "today", label: "Today", icon: "📅" },
  { value: "current_week", label: "Current Week", icon: "📊" },
  { value: "last_week", label: "Last Week", icon: "📈" },
  { value: "current_month", label: "Current Month", icon: "🗓️" },
  { value: "last_month", label: "Last Month", icon: "📋" },
]

function MarqueePlaceholder({ text }) {
  return (
    <div className="overflow-hidden w-full h-6 flex items-center relative">
      <div className="absolute whitespace-nowrap animate-marquee text-gray-400 font-medium">{text}</div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%) }
          100% { transform: translateX(-100%) }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center mt-16">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-red-200 rounded-full animate-spin border-t-red-600"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default function EnhancedAllEvents() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const { data: user, error } = useProfile()

  const queryKey = useMemo(() => ["/events", { filter, search }], [filter, search])

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const url = `/events?filter=${filter}&search=${search}`
      const res = await axiosSecure.get(url)
      return res.data?.events || []
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
    enabled: !!user,
    refetchInterval: 3000,
  })

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput.trim())
  }

  const handleFilter = (e) => setFilter(e.target.value)

  const handleCardClick = (e, event) => {
    if (e.target.closest(".join-event-btn")) {
      return
    }
    setSelectedEvent(event)
  }

  const handleCloseModal = () => setSelectedEvent(null)

  const handleJoinEvent = async (eventId) => {
    if (!user || !user.user.email) {
      Swal.fire({
        icon: "info",
        title: "Please log in",
        text: "You need to be logged in to join an event.",
        confirmButtonColor: "#DC2626",
        background: "#FEF2F2",
        color: "#7F1D1D",
      })
      return
    }

    try {
      const joinData = {
        eventId: eventId,
        userEmail: user.user.email,
        attendeeCount: 1,
      }

      const response = await axiosSecure.patch("/join-event", joinData)
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Joined Successfully!",
          text: "You have successfully joined the event!",
          confirmButtonColor: "#DC2626",
          background: "#F0FDF4",
          color: "#14532D",
        })
        refetch()
      } else {
        Swal.fire({
          icon: "warning",
          title: "Could not join",
          text: response.data.message || "You may have already joined.",
          confirmButtonColor: "#DC2626",
          background: "#FFFBEB",
          color: "#92400E",
        })
      }
    } catch (error) {
      if (error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Already Joined",
          text: "You have already joined this event.",
          confirmButtonColor: "#DC2626",
          background: "#FEF2F2",
          color: "#7F1D1D",
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Join Failed",
          text: "You could not join your own event.",
          confirmButtonColor: "#DC2626",
          background: "#FEF2F2",
          color: "#7F1D1D",
        })
      }
    }
  }

  function DetailsModal({ event, onClose }) {
    if (!event) return null

    return (
      <AnimatePresence>
        {event && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
            >
              {/* Header with gradient */}
              <div className="relative h-40 bg-gradient-to-br from-red-600 via-red-700 to-red-800 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="relative z-10 h-full flex items-end p-8">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-lg">{event.title}</h2>
                    {event.eventDateTime && (
                      <div className="flex items-center gap-2 text-red-100 font-semibold">
                        <FaCalendarAlt className="text-yellow-300" />
                        <span>
                          {new Date(event.eventDateTime).toLocaleString(undefined, {
                            dateStyle: "full",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  onClick={onClose}
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 -mt-16 relative z-10">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <FaUser className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-medium">Organizer</p>
                        <p className="text-gray-900 font-bold">
                          {event.createdBy?.user || event.createdBy || "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <FaUserFriends className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-medium">Attendees</p>
                        <p className="text-gray-900 font-bold text-xl">{event.attendeeCount || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FaMapMarkerAlt className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm font-medium">Location</p>
                        <p className="text-gray-900 font-bold text-sm">{event.location?.division || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Details */}
                {event.location && (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-600" />
                      Event Location
                    </h3>
                    <div className="flex flex-wrap gap-2 text-gray-700">
                      {event.location.division && (
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium border">
                          {event.location.division}
                        </span>
                      )}
                      {event.location.district && (
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium border">
                          {event.location.district}
                        </span>
                      )}
                      {event.location.upazila && (
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium border">
                          {event.location.upazila}
                        </span>
                      )}
                      {event.location.union && (
                        <span className="bg-white px-3 py-1 rounded-full text-sm font-medium border">
                          {event.location.union}
                        </span>
                      )}
                    </div>
                    {event.address && (
                      <p className="text-gray-600 mt-3 italic">
                        {event?.address?.Textlocation || event?.address || "No specific address provided"}
                      </p>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Event Description</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 rounded-2xl p-6">
                    {event.description}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                  <button
                    className="join-event-btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                    onClick={() => handleJoinEvent(event._id)}
                  >
                    <FaStar className="text-yellow-300" />
                    Join This Event
                    <FaStar className="text-yellow-300" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 pb-12">
      <DetailsModal event={selectedEvent} onClose={handleCloseModal} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg"
          >
            Discover Amazing Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-red-100 mb-8 font-medium"
          >
            Join thousands of people in exciting events happening around you
          </motion.p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSearch}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">Search Events</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder=""
                  className="w-full rounded-2xl border-2 border-gray-200 focus:border-red-500 px-6 py-4 text-lg font-medium text-gray-700 bg-gray-50 focus:bg-white outline-none transition-all duration-200"
                />
                {!searchInput && (
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none w-2/3">
                    <MarqueePlaceholder text="🔍 Search for events by title, location, or organizer..." />
                  </div>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl px-6 py-3 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <FaSearch />
                  <span className="hidden sm:inline font-bold">Search</span>
                </button>
              </div>
            </div>

            {/* Filter Dropdown */}
            <div className="lg:w-64">
              <label className="block text-sm font-bold text-gray-700 mb-2">Filter by Time</label>
              <select
                value={filter}
                onChange={handleFilter}
                className="w-full rounded-2xl border-2 border-gray-200 focus:border-red-500 px-6 py-4 text-lg font-semibold text-gray-700 bg-gray-50 focus:bg-white outline-none transition-all duration-200"
              >
                {FILTERS.map((f) => (
                  <option value={f.value} key={f.value}>
                    {f.icon} {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-3xl p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">Failed to Load Events</h3>
              <p className="text-red-600">Please try again later.</p>
            </div>
          </motion.div>
        ) : data && data.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {data.map((event, index) => (
              <motion.div
                key={event._id || event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300"
                onClick={(e) => handleCardClick(e, event)}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-white mb-2 line-clamp-2 drop-shadow-sm">{event.title}</h3>
                    {event.eventDateTime && (
                      <div className="flex items-center gap-2 text-red-100 text-sm font-semibold">
                        <FaCalendarAlt className="text-yellow-300" />
                        {new Date(event.eventDateTime).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Organizer & Attendees */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-blue-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Organizer</p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {event.createdBy?.user || event.createdBy || "Unknown"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FaUserFriends className="text-green-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Attendees</p>
                        <p className="text-sm font-bold text-gray-900">{event.attendeeCount || 0} joined</p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  {event.location && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span className="font-semibold">
                          {event.location.division}
                          {event.location.district && ` → ${event.location.district}`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {event.description && (
                    <div className="mb-6 flex-1">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{event.description}</p>
                    </div>
                  )}

                  {/* Join Button */}
                  <button
                    className="join-event-btn w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleJoinEvent(event._id)
                    }}
                  >
                    Join Event
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="max-w-md mx-auto">
              <img className="w-full h-auto mb-8 opacity-80" src={nodata || "/placeholder.svg"} alt="No events found" />
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No Events Found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
