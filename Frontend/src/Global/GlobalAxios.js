import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const GlobalAxios = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
GlobalAxios.interceptors.request.use(
  (config) => {
    // Automatically set the Authorization header with the token from cookies
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
GlobalAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration or other errors
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      // Optional: Redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default GlobalAxios;
