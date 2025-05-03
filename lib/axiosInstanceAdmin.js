import axios from 'axios';

const axiosInstanceAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Menambahkan interceptor untuk menambahkan Authorization header
axiosInstanceAdmin.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_API_TOKEN || '';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstanceAdmin;
