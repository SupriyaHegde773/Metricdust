// lib/api.ts
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://your-api-url.com', // ⛳ Replace with your actual backend API URL
  timeout: 10000,
});

// Add an interceptor to attach token to every request
api.interceptors.request.use(
  async (config) => {
    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
      }
    } catch (err) {
      console.warn('⚠️ Could not fetch ID token:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
