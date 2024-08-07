import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  const token = Cookies.get('jwtToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

export const validateToken = () => API.get('/users/validateToken');
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const getCategory = () => API.get('/menus/getCategory');
export const getMenuCategory = () => API.get('/menus/getMenuCategory');
export const getPlayer = () => API.get('/players');
export const getPlayers = (searchQuery) => API.get(`/players/search?searchQuery=${searchQuery.name || 'none'}`);
export const getPlayerById = (id) => API.get(`/players/${id}`);
export const addCategory = (newCategory) => API.post('/menus/addCategory', newCategory);
export const deleteCategory = (id) => API.delete(`/menus/${id}`);
export const addSubCategory = (newSubCategory) => API.post('/menus/addSubCategory', newSubCategory);
export const deleteSubCategory = (subCategory) => API.delete('/menus/deleteSubCategory', subCategory);
export const addPlayer = (formData) => API.post('/players', formData);
export const updatePlayer = (id, formData) => API.post(`/players/${id}`, formData);
export const deletePlayer = (formData) => API.delete(`players/${formData}`);
