import api from "../api/axios";

export const getCurrentUser = () => api.get("/auth/me");
export const getChats = () => api.get("/chat");
export const getUsersForChat = () => api.get("/chat/users");
export const createChat = (receiverId) => api.post("/chat/create", { receiverId });
export const getMessages = (chatId) => api.get(`/message/${chatId}`);
export const createMessage = (chatId, text) => api.post("/message/create", { chatId, text });
export const sendrequest = (user_id) => api.post("/send-request", { to: user_id });

export default api;
