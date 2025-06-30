import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LocationPicker() {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazilla, setSelectedUpazilla] = useState("");

  useEffect(() => {
    axios.get("https://bdapi.vercel.app/api/v.1/division")
      .then(res => setDivisions(res.data.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      setDistricts([]);
      setUpazillas([]);
      setSelectedDistrict("");
      setSelectedUpazilla("");
      axios.get(`https://bdapi.vercel.app/api/v.1/district/${selectedDivision}`)
        .then(res => setDistricts(res.data.data))
        .catch(err => console.error(err));
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      setUpazillas([]);
      setSelectedUpazilla("");
      axios.get(`https://bdapi.vercel.app/api/v.1/union/${selectedDistrict}`)
        .then(res => setUpazillas(res.data.data))
        .catch(err => console.error(err));
    }
  }, [selectedDistrict]);

  return (
    <div>
      <select value={selectedDivision} onChange={e => setSelectedDivision(e.target.value)}>
        <option value="">Select Division</option>
        {divisions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} disabled={!districts.length}>
        <option value="">Select District</option>
        {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select>

      <select value={selectedUpazilla} onChange={e => setSelectedUpazilla(e.target.value)} disabled={!upazillas.length}>
        <option value="">Select Upazilla</option>
        {upazillas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
      </select>

      <div style={{ marginTop: 16 }}>
        <strong>Selected:</strong><br />
        Division ID: {selectedDivision || "—"}<br />
        District ID: {selectedDistrict || "—"}<br />
        Upazilla ID: {selectedUpazilla || "—"}
      </div>
    </div>
  );
}
