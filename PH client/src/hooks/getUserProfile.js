// hooks/useProfile.js
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";

const useProfile = () => {
  // ১. হুক কল হওয়ার সময় লোকাল স্টোরেজ থেকে টোকেন নেওয়া
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      // যদি কোনো কারণে টোকেন না থাকে, তাহলে রিকোয়েস্ট পাঠানো হবে না
      if (!token) return null;
      
      const res = await axiosSecure.get("/profile");
      return res.data;
    },
    refetchOnWindowFocus: true,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    
    // ২. টোকেন না থাকলে ইন্টারভাল রি-ফেচও বন্ধ থাকবে
    refetchInterval: token ? 1000000000 : false, 
    
    // ৩. মেইন লজিক: টোকেন থাকলেই কেবল কুয়েরি 'Active' হবে
    enabled: !!token, 
  });
};

export default useProfile;