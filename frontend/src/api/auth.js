import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE = "http://localhost/parentup/backend/index.php/api"; // punta al router centralizzato

// --- USER AUTH ---
export const login = (email, password) =>
  axios.post(`${API_BASE}/login`, { email, password });

export const register = (email, password) =>
  axios.post(`${API_BASE}/register`, { email, password });

export const logout = () =>
  axios.post(`${API_BASE}/logout`);

// --- USER INFO ---
export const getUser = (id) =>
  axios.get(`${API_BASE}/users/${id}`);

export const updateUser = (id, { email, password }) =>
  axios.put(`${API_BASE}/users/${id}`, { email, password });

export const deleteUser = (id) =>
  axios.delete(`${API_BASE}/users/${id}`);

// --- POSTS ---
export const createPost = (title, content) =>
  axios.post(`${API_BASE}/posts`, { title, content });

export const getPosts = () =>
  axios.get(`${API_BASE}/posts`);

export const getPost = (id) =>
  axios.get(`${API_BASE}/posts/${id}`);

export const updatePost = (id, title, content) =>
  axios.put(`${API_BASE}/posts/${id}`, { title, content });

export const deletePost = (id) =>
  axios.delete(`${API_BASE}/posts/${id}`);

// --- COMMENTS ---
export const createComment = (post_id, content) =>
  axios.post(`${API_BASE}/comments`, { post_id, content });

export const getComments = (post_id) =>
  axios.get(`${API_BASE}/comments?post_id=${post_id}`);

export const updateComment = (id, content) =>
  axios.put(`${API_BASE}/comments/${id}`, { content });

export const deleteComment = (id) =>
  axios.delete(`${API_BASE}/comments/${id}`);

// --- NOTIFICATIONS ---
export const getNotifications = () =>
  axios.get(`${API_BASE}/notifications`);

export const createNotification = (user_id, message) =>
  axios.post(`${API_BASE}/notifications`, { user_id, message });

export const clearNotifications = () =>
  axios.put(`${API_BASE}/notifications`);
