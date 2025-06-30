/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaTimes, FaUserFriends, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import axiosSecure from "../../../utils/axiosSecure";
import nodata from "/nodata.svg";
import useProfile from "../../../hooks/getUserProfile";

const FILTERS = [
  { value: "", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "current_week", label: "Current Week" },
  { value: "last_week", label: "Last Week" },
  { value: "current_month", label: "Current Month" },
  { value: "last_month", label: "Last Month" },
];

function MarqueePlaceholder({ text }) {
  return (
    <div className="overflow-hidden w-full h-6 flex items-center relative">
      <div className="absolute whitespace-nowrap animate-marquee text-[#590000]/80">
        {text}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%) }
          100% { transform: translateX(-100%) }
        }
        .animate-marquee {
          animation: marquee 7s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function AllEvents() {
  // State for search and filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const { data: user, error } = useProfile();

  // Compose query string for API
  const queryKey = useMemo(
    () => ["/events", { filter, search }],
    [filter, search]
  );

  // Data fetching with TanStack Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn: async () => {
      const url = `/events?filter=${filter}&search=${search}`;
      const res = await axiosSecure.get(url);
      return res.data?.events || [];
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    enabled: !!user, // Only fetch if user is available
    refetchInterval: 3000 
  });


  // Search button handler
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  // Filter change handler
  const handleFilter = (e) => setFilter(e.target.value);

  // Card click handler (only modal, not join)
  const handleCardClick = (e, event) => {
    // if the clicked element is the join button or inside it, don't open modal
    if (e.target.closest(".join-event-btn")) {
      return;
    }
    setSelectedEvent(event);
  };
  const handleCloseModal = () => setSelectedEvent(null);

  // Join event handler (SweetAlert)
  const handleJoinEvent = async (eventId) => {
    if (!user || !user.user.email) {
      Swal.fire({
        icon: "info",
        title: "Please log in",
        text: "You need to be logged in to join an event.",
        confirmButtonColor: "#7F0B0B",
      });
      return;
    }

    try {
      const joinData = {
        eventId: eventId,
        userEmail: user.user.email,
        attendeeCount: 1,
      };
      const response = await axiosSecure.patch("/join-event", joinData);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Joined!",
          text: "You have successfully joined the event!",
          confirmButtonColor: "#7F0B0B",
        });
        refetch();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Could not join",
          text: response.data.message || "You may have already joined.",
          confirmButtonColor: "#7F0B0B",
        });
      }
    } catch (error) {
      if (error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Join failed",
          text: "You have already joined this event.",
          confirmButtonColor: "#7F0B0B",
        });
      }else{
        Swal.fire({
        icon: "error",
        title: "Join failed",
        text: "You could not join your own event.",
        confirmButtonColor: "#7F0B0B",
      });
      }
    }
  };

  // Details Modal
  function DetailsModal({ event, onClose }) {
    if (!event) return null;
    return (
      <AnimatePresence>
        {event && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center"
          >
            {/* Blur background */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-[5px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            {/* Details card */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="relative z-10 max-w-2xl w-[95vw] bg-gradient-to-br from-[#FFF5F5] to-[#fff] rounded-3xl shadow-2xl px-0 py-0 border-2 border-[#7F0B0B]/35 overflow-hidden"
            >
              {/* Top Banner */}
              <div className="relative h-32 md:h-36 bg-gradient-to-r from-[#7F0B0B] to-[#590000] flex items-end px-8 pt-6 pb-3">
                <div>
                  <div className="text-white text-2xl md:text-3xl font-extrabold drop-shadow-sm mb-1">
                    {event.title}
                  </div>
                  {event.eventDateTime && (
                    <div className="text-[#FFDF8B] text-base font-semibold flex items-center gap-1 drop-shadow-sm">
                      <span role="img" aria-label="calendar">
                        📅
                      </span>
                      {new Date(event.eventDateTime).toLocaleString(undefined, {
                        dateStyle: "full",
                        timeStyle: "short",
                      })}
                    </div>
                  )}
                </div>
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-[#7F0B0B] bg-white bg-opacity-90 hover:bg-[#FFF5F5] rounded-full border border-[#7F0B0B]/20 shadow px-3 py-3 transition text-xl"
                  onClick={onClose}
                  aria-label="Close details"
                >
                  <FaTimes />
                </button>
              </div>
              {/* Organizer & Attendees */}
              <div className="flex flex-col md:flex-row items-center md:items-end gap-2 px-8 mt-[-1rem] mb-3 z-10 relative">
                <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-1 shadow border border-[#7F0B0B]/10">
                  <FaUser className="text-[#7F0B0B] text-lg" />
                  <span className="font-bold text-[#7F0B0B]">
                    {event.createdBy?.user || event.createdBy || "Unknown"}
                  </span>
                  <span className="ml-1 text-[#590000] text-xs font-semibold">
                    Organizer
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-1 shadow border border-[#7F0B0B]/10">
                  <FaUserFriends className="text-[#7F0B0B] text-lg" />
                  <span className="font-bold text-[#7F0B0B]">
                    {event.attendeeCount || 0}
                  </span>
                  <span className="ml-1 text-[#590000] text-xs font-semibold">
                    Attendees
                  </span>
                </div>
              </div>
              {/* Location */}
              <div className="px-8 mt-2 mb-2 flex flex-wrap gap-2 items-center">
                <div className="flex items-center gap-1 text-[#7F0B0B]/90 text-base font-semibold">
                  <span className="font-bold">Location:</span>
                  {event.location?.division && (
                    <span>{event.location.division}</span>
                  )}
                  {event.location?.district && (
                    <>
                      {" "}
                      → <span>{event.location.district}</span>
                    </>
                  )}
                  {event.location?.upazila && (
                    <>
                      {" "}
                      → <span>{event.location.upazila}</span>
                    </>
                  )}
                  {event.location?.union && (
                    <>
                      {" "}
                      → <span>{event.location.union}</span>
                    </>
                  )}
                </div>
                {event.address && (
                  <div className="text-[#590000]/90 text-sm italic flex-1 whitespace-nowrap overflow-x-auto">
                    {event?.address?.Textlocation ||
                      event?.address ||
                      "No specific address provided"}
                  </div>
                )}
              </div>
              {/* Description */}
              <div className="px-8 pb-7 pt-2">
                <div className="text-base text-gray-700 whitespace-pre-line leading-relaxed mb-5 mt-2">
                  {event.description}
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-gradient-to-r from-[#7F0B0B] to-[#590000] text-white font-bold rounded-full px-7 py-2 shadow-lg hover:scale-[1.04] active:scale-100 transition-all duration-200 join-event-btn"
                    onClick={() => handleJoinEvent(event._id)}
                  >
                    Join Event
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-[#FFF5F5] pb-12">
      {/* Modal */}
      <DetailsModal event={selectedEvent} onClose={handleCloseModal} />

      {/* Search Bar Section */}
      <div className="max-w-3xl mx-auto pt-8 px-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 items-center md:items-end justify-between bg-white/80 p-6 rounded-2xl shadow-lg border border-[#7F0B0B]/20 mb-10"
        >
          {/* Search Box with Marquee Placeholder */}
          <div className="flex-1 w-full">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder=""
                className="w-full rounded-full border-2 border-[#7F0B0B]/30 focus:border-[#7F0B0B] px-5 py-3 text-lg font-medium text-[#590000] bg-white outline-none transition"
                style={{ paddingRight: 52 }}
                aria-label="Search events by title"
              />
              {/* Marquee Placeholder */}
              {!searchInput && (
                <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none w-2/3 md:w-1/2">
                  <MarqueePlaceholder text="🔎 Search events by title..." />
                </div>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#7F0B0B] to-[#590000] text-white rounded-full px-4 py-2 flex items-center gap-2 shadow hover:scale-105 transition font-bold"
              >
                <FaSearch className="text-lg" />
                <span className="hidden md:inline">Search</span>
              </button>
            </div>
          </div>
          {/* Filter Dropdown */}
          <div className="w-full md:w-48">
            <select
              value={filter}
              onChange={handleFilter}
              className="w-full rounded-full border-2 border-[#7F0B0B]/30 focus:border-[#7F0B0B] px-4 py-3 text-lg font-semibold text-[#7F0B0B] bg-white outline-none transition"
            >
              {FILTERS.map((f) => (
                <option value={f.value} key={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        {isLoading ? (
          <div className="w-full flex justify-center mt-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#7F0B0B] border-b-4 border-[#FFDF8B] border-r-4 border-[#590000] border-l-4 border-white"></div>
          </div>
        ) : isError ? (
          <div className="w-full flex justify-center mt-10 text-xl text-red-600 font-bold">
            Failed to load events. Please try again.
          </div>
        ) : data && data.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {data.map((event) => (
              <motion.div
                key={event._id || event.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white rounded-3xl shadow-xl border border-[#7F0B0B]/10 flex flex-col group transition-all duration-300 hover:shadow-2xl hover:z-10 cursor-pointer"
                onClick={(e) => handleCardClick(e, event)}
                style={{ marginBottom: "0.5rem", padding: "0.5rem 0.2rem" }}
              >
                {/* Card Header: Title */}
                <div className="p-5 pb-3 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#7F0B0B] text-2xl font-extrabold truncate max-w-[90%]">
                      {event.title}
                    </span>
                  </div>
                  {/* createdBy */}
                  <div>
                    <div className="text-[#590000] text-sm mb-1 flex items-center gap-1">
                      <FaUser className="text-[#7F0B0B] mr-1" />
                      <span className="font-semibold">Organizer:</span>{" "}
                      {event.createdBy?.user || event.createdBy || "Unknown"}
                    </div>
                    {/* attendeeCount */}
                    <div className="text-[#590000] text-sm mb-1 flex items-center gap-1">
                      <FaUserFriends className="text-[#7F0B0B] mr-1" />
                      <span className="font-semibold">Attendees:</span>{" "}
                      {event.attendeeCount || 0}
                    </div>
                  </div>
                  {/* Date & Time */}
                  {event.eventDateTime && (
                    <div className="text-[#590000] text-base font-semibold mb-1 flex items-center gap-1">
                      <span role="img" aria-label="calendar">
                        📅
                      </span>
                      {new Date(event.eventDateTime).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  )}
                  {/* Location preview */}
                  <div className="text-[#7F0B0B]/80 text-sm mb-1 font-semibold flex flex-wrap gap-1">
                    {event.location?.division && (
                      <span>{event.location.division}</span>
                    )}
                    {event.location?.district && (
                      <>
                        {" "}
                        → <span>{event.location.district}</span>
                      </>
                    )}
                    {event.location?.upazila && (
                      <>
                        {" "}
                        → <span>{event.location.upazila}</span>
                      </>
                    )}
                    {event.location?.union && (
                      <>
                        {" "}
                        → <span>{event.location.union}</span>
                      </>
                    )}
                  </div>
                  {/* Address */}
                  {event.address && (
                    <div className="text-[#590000]/90 text-xs mt-1 mb-2 italic">
                      {event?.address?.Textlocation ||
                        event?.address ||
                        "No specific address provided"}
                    </div>
                  )}
                  {/* Description */}
                  {event.description && (
                    <div className="text-gray-700 text-[15px] mt-2 line-clamp-3">
                      {event.description}
                    </div>
                  )}
                </div>
                {/* Card Footer: Join Button */}
                <div className="px-5 pb-5 flex items-end">
                  <button
                    className="join-event-btn w-full bg-gradient-to-r from-[#7F0B0B] to-[#590000] text-white font-bold rounded-full py-2 mt-3 shadow-lg hover:scale-[1.04] active:scale-100 transition-all duration-200 group-hover:bg-[#7F0B0B]/90"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinEvent(event._id);
                    }}
                    style={{ marginTop: "0.5rem", padding: "0.7rem 0" }}
                  >
                    Join Event
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center mt-16 text-[#7F0B0B] text-2xl font-bold">
            <img
              className="w-[80%] max-w-[400px] object-cover h-auto"
              src={nodata}
              alt="No data available"
            />
            <div>No events found.</div>
          </div>
        )}
      </div>
    </div>
  );
}
