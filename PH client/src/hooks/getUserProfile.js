// hooks/useProfile.js
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";

const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/profile");
      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!localStorage.getItem("token"),
  });
};

export default useProfile;
