/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import axiosSecure from "../../../utils/axiosSecure";
import nodata from '/nodata.svg'


const FILTERS = [
  { value: "", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "current_week", label: "Current Week" },
  { value: "last_week", label: "Last Week" },
  { value: "current_month", label: "Current Month" },
  { value: "last_month", label: "Last Month" },
];

// Marquee component for placeholder animation
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
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // Search button handler
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  // Filter change handler
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-[#FFF5F5] pb-12">
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
                onChange={e => setSearchInput(e.target.value)}
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
              {FILTERS?.map(f => (
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
            {data.map(event => (
              <motion.div
                key={event._id || event.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white rounded-3xl shadow-xl border border-[#7F0B0B]/10 flex flex-col group transition-all duration-300 hover:shadow-2xl hover:z-10"
              >
                {/* Card Header: Title */}
                <div className="p-5 pb-3 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#7F0B0B] text-2xl font-extrabold truncate max-w-[90%]">
                      {event.title}
                    </span>
                  </div>
                  {/* Date & Time */}
                  {event.eventDateTime && (
                    <div className="text-[#590000] text-base font-semibold mb-1 flex items-center gap-1">
                      <span role="img" aria-label="calendar">📅</span>
                      {new Date(event.eventDateTime).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                    </div>
                  )}
                  {/* Location preview */}
                  <div className="text-[#7F0B0B]/80 text-sm mb-1 font-semibold flex flex-wrap gap-1">
                    {event.location?.division && <span>{event.location.division}</span>}
                    {event.location?.district && <> → <span>{event.location.district}</span></>}
                    {event.location?.upazila && <> → <span>{event.location.upazila}</span></>}
                    {event.location?.union && <> → <span>{event.location.union}</span></>}
                  </div>
                  {/* Address */}
                  {event.address && (
                    <div className="text-[#590000]/90 text-xs mt-1 mb-2 italic">
                      {event?.address?.Textlocation ? event.address.Textlocation : "No specific address provided"}
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
                    className="w-full bg-gradient-to-r from-[#7F0B0B] to-[#590000] text-white font-bold rounded-full py-2 mt-3 shadow-lg hover:scale-[1.04] active:scale-100 transition-all duration-200 group-hover:bg-[#7F0B0B]/90"
                  >
                    Join Event
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center mt-16 text-[#7F0B0B] text-2xl font-bold">
            <img className="w-[80%] object-cover h-auto" src={nodata} alt="No data available" />
          </div>
        )}
      </div>
    </div>
  );
}