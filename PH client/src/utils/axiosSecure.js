// utils/axiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // আপনার সার্ভার URL
  withCredentials: true             // কুকি স্বয়ংক্রিয়ভাবে যাবে
});

export default axiosSecure;
