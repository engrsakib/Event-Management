/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import LocationPicker from "../LocationPicker/LocationPicker";
import useProfile from "../../../hooks/getUserProfile";

// Change this to your secure axios instance if needed
const axiosSecure = axios;

export default function AddEvents() {
  const [eventTitle, setEventTitle] = useState("");
  const [Textlocation, setTextLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventDateTime, setEventDateTime] = useState("");
  const [location, setLocation] = useState({
    division: "",
    district: "",
    upazila: "",
    union: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useProfile();

  const user = data?.user?.name || "User";
  const userMail = data?.user?.email || "user@example.com";

  // Validate all fields
  const isValid = () =>
    eventTitle.trim() &&
    location.division &&
    location.district &&
    location.upazila &&
    location.union &&
    Textlocation.trim() &&
    description.trim() &&
    eventDateTime.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      Swal.fire({
        icon: "error",
        title: "All fields are required!",
        text: "Please fill in every field before submitting.",
        confirmButtonColor: "#7F0B0B",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axiosSecure.post("/add-events", {
        title: eventTitle,

        address: {
          location: {
            division: location.division,
            district: location.district,
            upazila: location.upazila,
            union: location.union,
          },
          Textlocation,
        },
        description,
        eventDateTime,
        createdBy: { user, userMail },
      });
      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Event Added!",
          text: "Your event was successfully added.",
          confirmButtonColor: "#7F0B0B",
        }).then(() => {
          navigate("/events");
        });
      } else {
        throw new Error("Failed to add event.");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Event could not be added. Please try again.",
        confirmButtonColor: "#7F0B0B",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#FFF5F5] flex items-center justify-center px-3 py-10">
      <form
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-7 border border-[#7F0B0B]/15"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold text-center text-[#7F0B0B] mb-2 tracking-tight">
          Add New Event
        </h2>

        {/* User Name (Read-only) */}
        <div>
          <label className="block mb-2 text-lg font-semibold text-[#7F0B0B]">
            Organizer <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={user}
            readOnly
            className="w-full rounded-xl px-4 py-3 text-[#590000] text-base font-medium border-2 border-[#7F0B0B]/20 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Event Title */}
        <div>
          <label
            className="block mb-2 text-lg font-semibold text-[#7F0B0B]"
            htmlFor="eventTitle"
          >
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            id="eventTitle"
            name="eventTitle"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            type="text"
            placeholder="Enter event title"
            className="w-full rounded-xl px-4 py-3 text-[#590000] text-base font-medium border-2 border-[#7F0B0B]/20 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/20 outline-none transition bg-gray-50"
            required
          />
        </div>

        {/* Date & Time Picker */}
        <div>
          <label
            className="block mb-2 text-lg font-semibold text-[#7F0B0B]"
            htmlFor="eventDateTime"
          >
            Event Date & Time <span className="text-red-500">*</span>
          </label>
          <input
            id="eventDateTime"
            name="eventDateTime"
            type="datetime-local"
            value={eventDateTime}
            onChange={(e) => setEventDateTime(e.target.value)}
            className="w-full rounded-xl px-4 py-3 text-[#590000] text-base font-medium border-2 border-[#7F0B0B]/20 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/20 outline-none transition bg-gray-50"
            required
          />
        </div>

        {/* select location */}
        <div>
          <label className="block mb-2 text-lg font-semibold text-[#7F0B0B]">
            Location (Division/District/Upazila/Union){" "}
            <span className="text-red-500">*</span>
          </label>
          <LocationPicker location={location} setLocation={setLocation} />
        </div>

        {/* Address (Textarea) */}
        <div>
          <label
            className="block mb-2 text-lg font-semibold text-[#7F0B0B]"
            htmlFor="address"
          >
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={Textlocation}
            onChange={(e) => setTextLocation(e.target.value)}
            rows={3}
            placeholder="Event location details"
            className="w-full rounded-xl px-4 py-3 text-[#590000] text-base font-medium border-2 border-[#7F0B0B]/20 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/20 outline-none transition bg-gray-50 resize-none"
            required
          ></textarea>
        </div>

        {/* Description */}
        <div>
          <label
            className="block mb-2 text-lg font-semibold text-[#7F0B0B]"
            htmlFor="description"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Event description"
            className="w-full rounded-xl px-4 py-3 text-[#590000] text-base font-medium border-2 border-[#7F0B0B]/20 focus:border-[#7F0B0B] focus:ring-2 focus:ring-[#7F0B0B]/20 outline-none transition bg-gray-50 resize-none"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#7F0B0B] to-[#590000] text-white font-bold text-lg rounded-full py-3 mt-2 shadow-lg hover:scale-[1.03] transition-all active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Adding Event..." : "Add Event"}
        </button>
      </form>
    </div>
  );
}
