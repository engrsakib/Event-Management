

/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate } from "react-router"
import Swal from "sweetalert2"
import { motion } from "framer-motion"
import LocationPicker from "../LocationPicker/LocationPicker"
import useProfile from "../../../hooks/getUserProfile"
import axiosSecure from "../../../utils/axiosSecure"

// SVG Icons
const UserIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const MapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const FileIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

const TimesIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3l1.5 1.5L5 6l-1.5-1.5L5 3zM19 3l1.5 1.5L19 6l-1.5-1.5L19 3zM12 8l1.5 1.5L12 11l-1.5-1.5L12 8zM5 17l1.5 1.5L5 20l-1.5-1.5L5 17zM19 17l1.5 1.5L19 20l-1.5-1.5L19 17z"
    />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const RocketIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-6 h-6 border-2 border-white/30 rounded-full animate-spin border-t-white"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

function FieldWrapper({ children, icon, label, required = false, error = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <label className="flex items-center gap-2 text-lg font-bold text-gray-800">
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center ${error ? "bg-red-100 text-red-600" : "bg-red-100 text-red-600"}`}
        >
          {icon}
        </div>
        {label}
        {required && <span className="text-red-500 text-xl">*</span>}
      </label>
      {children}
    </motion.div>
  )
}

export default function EnhancedAddEvents() {
  const [eventTitle, setEventTitle] = useState("")
  const [Textlocation, setTextLocation] = useState("")
  const [description, setDescription] = useState("")
  const [eventDateTime, setEventDateTime] = useState("")
  const [location, setLocation] = useState({
    division: "",
    district: "",
    upazila: "",
    union: "",
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useProfile()
  const user = data?.user?.name || "User"
  const userMail = data?.user?.email || "user@example.com"

  // Validation function
  const validateField = (field, value) => {
    switch (field) {
      case "eventTitle":
        return value.trim().length >= 3 ? null : "Event title must be at least 3 characters"
      case "description":
        return value.trim().length >= 10 ? null : "Description must be at least 10 characters"
      case "Textlocation":
        return value.trim().length >= 5 ? null : "Address must be at least 5 characters"
      case "eventDateTime":
        return new Date(value) > new Date() ? null : "Event date must be in the future"
      case "location":
        return location.division && location.district && location.upazila && location.union
          ? null
          : "Please select complete location"
      default:
        return null
    }
  }

  // Real-time validation
  const handleFieldChange = (field, value) => {
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))

    switch (field) {
      case "eventTitle":
        setEventTitle(value)
        break
      case "description":
        setDescription(value)
        break
      case "Textlocation":
        setTextLocation(value)
        break
      case "eventDateTime":
        setEventDateTime(value)
        break
    }
  }

  // Check if form is valid
  const isValid = () => {
    const fields = ["eventTitle", "description", "Textlocation", "eventDateTime", "location"]
    return fields.every(
      (field) =>
        !validateField(
          field,
          field === "eventTitle"
            ? eventTitle
            : field === "description"
              ? description
              : field === "Textlocation"
                ? Textlocation
                : field === "eventDateTime"
                  ? eventDateTime
                  : location,
        ),
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const newErrors = {}
    const fields = ["eventTitle", "description", "Textlocation", "eventDateTime", "location"]
    fields.forEach((field) => {
      const error = validateField(
        field,
        field === "eventTitle"
          ? eventTitle
          : field === "description"
            ? description
            : field === "Textlocation"
              ? Textlocation
              : field === "eventDateTime"
                ? eventDateTime
                : location,
      )
      if (error) newErrors[field] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      Swal.fire({
        icon: "error",
        title: "Please fix the errors!",
        text: "Check all required fields and fix any validation errors.",
        confirmButtonColor: "#DC2626",
        background: "#FEF2F2",
        color: "#7F1D1D",
      })
      return
    }

    setLoading(true)

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
        attendeeeCount: 0,
        eventDateTime,
        createdBy: { user, userMail },
        userId: data?.user?._id || "defaultUserId",
      })

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Event Created Successfully!",
          text: "Your event has been added and is now live.",
          confirmButtonColor: "#DC2626",
          background: "#F0FDF4",
          color: "#14532D",
        }).then(() => {
          navigate("/events")
        })
      } else {
        throw new Error("Failed to add event.")
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Creation Failed!",
        text: "Event could not be created. Please try again.",
        confirmButtonColor: "#DC2626",
        background: "#FEF2F2",
        color: "#7F1D1D",
      })
    } finally {
      setLoading(false)
    }
  }

  const progressPercentage = () => {
    const fields = [eventTitle, eventDateTime, location.division, Textlocation, description]
    const completed = fields.filter((field) => field && field.toString().trim()).length
    return (completed / fields.length) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 py-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-16 mb-12">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <RocketIcon />
            </div>
            <span className="text-yellow-300 font-bold text-lg">Create Something Amazing</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg"
          >
            Add New Event
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-red-100 font-medium"
          >
            Bring people together and create memorable experiences
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Event Creation Progress</h3>
            <span className="text-sm font-semibold text-red-600">{Math.round(progressPercentage())}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
            <SparklesIcon />
            <span>Fill all fields to unlock the create button</span>
          </div>
        </motion.div>

        {/* Main Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border border-gray-100"
          onSubmit={handleSubmit}
        >
          {/* Organizer Field */}
          <FieldWrapper icon={<UserIcon />} label="Event Organizer" required>
            <div className="relative">
              <input
                type="text"
                value={user}
                readOnly
                className="w-full rounded-2xl px-6 py-4 text-gray-700 text-lg font-semibold border-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 cursor-not-allowed"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckIcon />
                </div>
              </div>
            </div>
          </FieldWrapper>

          {/* Event Title */}
          <FieldWrapper icon={<SparklesIcon />} label="Event Title" required error={errors.eventTitle}>
            <div className="relative">
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => handleFieldChange("eventTitle", e.target.value)}
                placeholder="Enter an exciting event title..."
                className={`w-full rounded-2xl px-6 py-4 text-gray-800 text-lg font-medium border-2 transition-all duration-200 bg-gray-50 focus:bg-white outline-none ${
                  errors.eventTitle
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                }`}
                required
              />
              {eventTitle && !errors.eventTitle && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                </div>
              )}
            </div>
            {errors.eventTitle && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium flex items-center gap-2"
              >
                <TimesIcon />
                {errors.eventTitle}
              </motion.p>
            )}
          </FieldWrapper>

          {/* Date & Time */}
          <FieldWrapper icon={<CalendarIcon />} label="Event Date & Time" required error={errors.eventDateTime}>
            <div className="relative">
              <input
                type="datetime-local"
                value={eventDateTime}
                onChange={(e) => handleFieldChange("eventDateTime", e.target.value)}
                className={`w-full rounded-2xl px-6 py-4 text-gray-800 text-lg font-medium border-2 transition-all duration-200 bg-gray-50 focus:bg-white outline-none ${
                  errors.eventDateTime
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                }`}
                required
              />
              {eventDateTime && !errors.eventDateTime && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                </div>
              )}
            </div>
            {errors.eventDateTime && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium flex items-center gap-2"
              >
                <TimesIcon />
                {errors.eventDateTime}
              </motion.p>
            )}
          </FieldWrapper>

          {/* Location Picker */}
          <FieldWrapper icon={<MapIcon />} label="Event Location" required error={errors.location}>
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-100 transition-all duration-200">
              <LocationPicker location={location} setLocation={setLocation} />
            </div>
            {errors.location && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium flex items-center gap-2"
              >
                <TimesIcon />
                {errors.location}
              </motion.p>
            )}
          </FieldWrapper>

          {/* Address */}
          <FieldWrapper icon={<MapIcon />} label="Detailed Address" required error={errors.Textlocation}>
            <div className="relative">
              <textarea
                value={Textlocation}
                onChange={(e) => handleFieldChange("Textlocation", e.target.value)}
                rows={3}
                placeholder="Provide specific address details, landmarks, or directions..."
                className={`w-full rounded-2xl px-6 py-4 text-gray-800 text-lg font-medium border-2 transition-all duration-200 bg-gray-50 focus:bg-white outline-none resize-none ${
                  errors.Textlocation
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                }`}
                required
              />
              {Textlocation && !errors.Textlocation && (
                <div className="absolute right-4 top-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                </div>
              )}
            </div>
            {errors.Textlocation && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm font-medium flex items-center gap-2"
              >
                <TimesIcon />
                {errors.Textlocation}
              </motion.p>
            )}
          </FieldWrapper>

          {/* Description */}
          <FieldWrapper icon={<FileIcon />} label="Event Description" required error={errors.description}>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                rows={6}
                placeholder="Describe your event in detail. What makes it special? What can attendees expect?"
                className={`w-full rounded-2xl px-6 py-4 text-gray-800 text-lg font-medium border-2 transition-all duration-200 bg-gray-50 focus:bg-white outline-none resize-none ${
                  errors.description
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    : "border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                }`}
                required
              />
              {description && !errors.description && (
                <div className="absolute right-4 top-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckIcon />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-2">
              {errors.description ? (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm font-medium flex items-center gap-2"
                >
                  <TimesIcon />
                  {errors.description}
                </motion.p>
              ) : (
                <div></div>
              )}
              <span className="text-sm text-gray-500 font-medium">{description.length} characters</span>
            </div>
          </FieldWrapper>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-6"
          >
            <button
              type="submit"
              disabled={loading || !isValid()}
              className={`w-full py-5 rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                loading || !isValid()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:shadow-xl transform hover:scale-105 active:scale-95"
              }`}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  Creating Event...
                </>
              ) : (
                <>
                  <PlusIcon />
                  Create Event
                  <RocketIcon />
                </>
              )}
            </button>

            {!isValid() && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-500 text-sm mt-3 flex items-center justify-center gap-2"
              >
                <SparklesIcon />
                Complete all fields to enable event creation
              </motion.p>
            )}
          </motion.div>
        </motion.form>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <SparklesIcon />
            Pro Tips for Great Events
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckIcon />
              </div>
              <div>
                <p className="font-semibold">Clear Title</p>
                <p className="text-sm">Make it descriptive and engaging</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckIcon />
              </div>
              <div>
                <p className="font-semibold">Detailed Description</p>
                <p className="text-sm">Include agenda, benefits, and expectations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckIcon />
              </div>
              <div>
                <p className="font-semibold">Precise Location</p>
                <p className="text-sm">Include landmarks and directions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckIcon />
              </div>
              <div>
                <p className="font-semibold">Optimal Timing</p>
                <p className="text-sm">Consider your audience's availability</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
