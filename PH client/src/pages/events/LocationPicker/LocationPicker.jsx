import React, { useState, useEffect } from "react";
import axios from "axios";

// Theme colors
const PRIMARY = "#7F0B0B";
const SECONDARY = "#590000";
const HIGHLIGHT = "#FFDF8B";

export default function LocationPicker({ location, setLocation }) {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");
    

  // For loading state of dropdowns
  const [loading, setLoading] = useState({
    division: false,
    district: false,
    upazila: false,
    union: false
  });

  useEffect(() => {
    setLoading(l => ({ ...l, division: true }));
    axios.get("https://bdapi.vercel.app/api/v.1/division")
      .then(res => setDivisions(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(l => ({ ...l, division: false })));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      const selected = divisions.find(d => d.id === selectedDivision);
      setLocation(prev => ({ ...prev, division: selected?.name || "" }));
      setDistricts([]);
      setUpazilas([]);
      setUnions([]);
      setSelectedDistrict("");
      setSelectedUpazila("");
      setSelectedUnion("");
      setLoading(l => ({ ...l, district: true }));
      axios.get(`https://bdapi.vercel.app/api/v.1/district/${selectedDivision}`)
        .then(res => setDistricts(res.data.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(l => ({ ...l, district: false })));
    }
  }, [selectedDivision, divisions]);

  useEffect(() => {
    if (selectedDistrict) {
      const selected = districts.find(d => d.id === selectedDistrict);
      setLocation(prev => ({ ...prev, district: selected?.name || "" }));
      setUpazilas([]);
      setUnions([]);
      setSelectedUpazila("");
      setSelectedUnion("");
      setLoading(l => ({ ...l, upazila: true }));
      axios.get(`https://bdapi.vercel.app/api/v.1/upazilla/${selectedDistrict}`)
        .then(res => setUpazilas(res.data.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(l => ({ ...l, upazila: false })));
    }
  }, [selectedDistrict, districts]);

  useEffect(() => {
    if (selectedUpazila) {
      const selected = upazilas.find(u => u.id === selectedUpazila);
      setLocation(prev => ({ ...prev, upazila: selected?.name || "" }));
      setUnions([]);
      setSelectedUnion("");
      setLoading(l => ({ ...l, union: true }));
      axios.get(`https://bdapi.vercel.app/api/v.1/union/${selectedUpazila}`)
        .then(res => setUnions(res.data.data))
        .catch(err => console.error(err))
        .finally(() => setLoading(l => ({ ...l, union: false })));
    }
  }, [selectedUpazila, upazilas]);

  useEffect(() => {
    if (selectedUnion) {
      const selected = unions.find(u => u.id === selectedUnion);
      setLocation(prev => ({ ...prev, union: selected?.name || "" }));
    }
  }, [selectedUnion, unions]);

  // Optional: log full location object
  useEffect(() => {
    // console.log("📍 Selected Location:", location);
  }, [location]);

  // Helper for animated dropdown arrow
  const Arrow = ({ open }) => (
    <svg
      className={`w-4 h-4 ml-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke={PRIMARY}
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // Custom Input Wrapper
  function FancySelect({ value, onChange, options, label, disabled, loading, ...rest }) {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <label className="block mb-1 font-semibold text-[#7F0B0B]">{label}</label>
        <div
          className={`
            relative w-full
            rounded-xl shadow-lg transition-all duration-300
            border-2
            ${disabled ? "border-gray-200" : "border-[#7F0B0B]/40 focus-within:border-[#7F0B0B]"}
            bg-white
          `}
          tabIndex={-1}
          onBlur={() => setOpen(false)}
        >
          <select
            value={value}
            onChange={e => {
              onChange(e);
              setOpen(false);
            }}
            disabled={disabled || loading}
            onFocus={() => setOpen(true)}
            className={`
              w-full px-4 py-3 rounded-xl text-[#7F0B0B]
              font-medium bg-transparent outline-none
              appearance-none cursor-pointer
              transition-colors duration-200
              ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white"}
            `}
            {...rest}
          >
            <option value="" disabled>
              {loading ? "Loading..." : `Select ${label}`}
            </option>
            {options.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <Arrow open={open} />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <FancySelect
        label="Division"
        value={selectedDivision}
        onChange={e => setSelectedDivision(e.target.value)}
        options={divisions}
        disabled={loading.division}
        loading={loading.division}
      />
      <FancySelect
        label="District"
        value={selectedDistrict}
        onChange={e => setSelectedDistrict(e.target.value)}
        options={districts}
        disabled={!divisions.length || !districts.length || loading.district}
        loading={loading.district}
      />
      <FancySelect
        label="Upazila"
        value={selectedUpazila}
        onChange={e => setSelectedUpazila(e.target.value)}
        options={upazilas}
        disabled={!districts.length || !upazilas.length || loading.upazila}
        loading={loading.upazila}
      />
      <FancySelect
        label="Union"
        value={selectedUnion}
        onChange={e => setSelectedUnion(e.target.value)}
        options={unions}
        disabled={!upazilas.length || !unions.length || loading.union}
        loading={loading.union}
      />

      {/* Location Preview */}
      <div className="col-span-full mt-3 flex flex-col items-center">
        <div className="flex items-center gap-2 text-lg text-[#7F0B0B] font-bold">
          <span className="text-[1.3rem]">📍</span>
          {location.division && (
            <span>
              {location.division}
              {location.district && <> → {location.district}</>}
              {location.upazila && <> → {location.upazila}</>}
              {location.union && <> → {location.union}</>}
            </span>
          )}
        </div>
        {!location.division && (
          <div className="text-gray-400 text-sm mt-1">Please select your location</div>
        )}
      </div>

      {/* Animation Styles */}
      <style>
        {`
          select::-ms-expand { display: none; }
          select::-webkit-input-placeholder { color: #7F0B0B; }
          select:focus { outline: none; }
        `}
      </style>
    </div>
  );
}