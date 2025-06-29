// hooks/useProfile.js
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";

const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/profile");
      return res.data;
    }
  });
};

export default useProfile;
