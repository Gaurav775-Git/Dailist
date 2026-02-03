import axios from 'axios';

const API_BASE = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const getCurrentUser = () => api.get('/auth/me');
export const getChats = () => api.get('/chat');
export const getUsersForChat = () => api.get('/chat/users');
export const createChat = (receiverId) => api.post('/chat/create', { receiverId });
export const getMessages = (chatId) => api.get(`/message/${chatId}`);
export const createMessage = (chatId, text) => api.post('/message/create', { chatId, text });
