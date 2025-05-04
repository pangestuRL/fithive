import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
