import axios from "axios";

// Abilita l'invio di cookie con le richieste (per la sessione PHP)
axios.defaults.withCredentials = true;

// URL base del backend PHP
const API_BASE = "http://localhost/parentup/backend/";

// LOGIN
export const login = (email, password) =>
  axios.post(`${API_BASE}api/login.php`, { email, password });

// REGISTER (ora accetta anche nome, cognome, genere e dataNascita)
export const register = (email, password, nome, cognome, genere, dataNascita) =>
  axios.post(`${API_BASE}api/register.php`, {
    email,
    password,
    nome,
    cognome,
    genere,
    dataNascita
  });

// LOGOUT
export const logout = () =>
  axios.post(`${API_BASE}api/logout.php`);

// GET USER (per dashboard o profilo)
export const getUser = () =>
  axios.get(`${API_BASE}crud/get_user.php`);

// UPDATE USER
export const updateUser = (email) =>
  axios.put(`${API_BASE}crud/update_user.php`, { email });

// DELETE USER
export const deleteUser = () =>
  axios.delete(`${API_BASE}crud/delete_user.php`);
