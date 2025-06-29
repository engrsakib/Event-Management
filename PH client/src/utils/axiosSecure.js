import axios from 'axios';

// আপনার সার্ভারের লাইভ URL
const baseURL = import.meta.env.VITE_ADMIN_URL; 

const axiosSecure = axios.create({
  baseURL: baseURL,
});


axiosSecure.interceptors.request.use(
  (config) => {
   
    const token = localStorage.getItem('token');
    

    if (token) {
     
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

export default axiosSecure;
