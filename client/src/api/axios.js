import axios from 'axios';

const API_BASE = 'https://dailist-1.onrender.com';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export default api;
