import axios from 'axios';


const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://cartrack-rosy.vercel.app' 
  : 'http://localhost:3030'; 

export const getLogins = () => axios.get(`${API_URL}/`);

export const login = (username, password) => axios.post(`${API_URL}/api/login`, { username, password });

export const updateSessionToken = (username, sessionToken) => axios.post(`${API_URL}/api/updateSessionToken`, { username, sessionToken });

export const readSessionToken = (sessionToken) => axios.post(`${API_URL}/api/readSessionToken`, { sessionToken });

export const getUserBySessionToken = (sessionToken) => axios.post(`${API_URL}/api/user`, { sessionToken });

export const getUsuarios = () => axios.get(`${API_URL}/api/getUsuarios`);