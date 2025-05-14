import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE = "http://localhost/parentup/backend/";

export const login = (email, password) =>
  axios.post(`${API_BASE}api/login.php`, { email, password });

export const register = (email, password, nome, cognome, genere, dataNascita) =>
  axios.post(`${API_BASE}api/register.php`, { email, password, nome, cognome, genere, dataNascita });

export const logout = () => axios.post(`${API_BASE}api/logout.php`);

export const getUser = () => axios.get(`${API_BASE}crud/get_user.php`);

export const updateUser = ({ email, password }) =>
  axios.put(`${API_BASE}crud/update_user.php`, { email, password });

export const deleteUser = () => axios.delete(`${API_BASE}crud/delete_user.php`);

export const createPost = (title, content, user_id = 1) =>
  axios.post(`${API_BASE}crud/create_post.php`, { title, content, user_id });

export const getPosts = () =>
  axios.get(`${API_BASE}crud/get_posts.php`);

export const createComment = (post_id, content, user_id = 1) =>
  axios.post(`${API_BASE}crud/create_comment.php`, { post_id, content, user_id });

export const deletePost = (post_id, user_id) =>
  axios.post(`${API_BASE}crud/delete_post.php`, { post_id, user_id });

export const deleteComment = (comment_id, user_id) =>
  axios.post(`${API_BASE}crud/delete_comment.php`, { comment_id, user_id });

export const updatePost = (post_id, title, content, user_id) =>
  axios.post(`${API_BASE}crud/update_post.php`, { post_id, title, content, user_id });

export const updateComment = (comment_id, content, user_id) =>
  axios.post(`${API_BASE}crud/update_comment.php`, { comment_id, content, user_id });

export const getNotifications = () =>
  axios.get(`${API_BASE}crud/get_notifications.php`, { withCredentials: true });

export const clearNotifications = () =>
  axios.post(`${API_BASE}crud/clear_notifications.php`, {}, { withCredentials: true });
