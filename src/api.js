import axios from 'axios';

const API_URL = 'http://localhost:3030' || 'https://cartrack-rosy.vercel.app';
export const getLogins = () => axios.get(`${API_URL}/`);

export const login = (username, password) => axios.post(`${API_URL}/login`, { username, password });

export const updateSessionToken = (username, sessionToken) => axios.post(`${API_URL}/updateSessionToken`, { username, sessionToken });

export const readSessionToken = (sessionToken) => axios.post(`${API_URL}/readSessionToken`, { sessionToken });

export const getUserBySessionToken = (sessionToken) => axios.post(`${API_URL}/user`, { sessionToken });

export const getUsuarios = () => axios.get(`${API_URL}/getUsuarios`);