import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Funktion för att hämta värdet av en cookie med ett visst namn
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Lägg till en request interceptor för att sätta Authorization-header med token från cookien
API.interceptors.request.use((req) => {
  const token = getCookie('jwtToken'); // Byt ut 'yourCookieNameHere' med namnet på din cookie
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Dina API-anrop nedan kan förbli oförändrade
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
export const updatePlayer = (id, formData) => API.patch(`/players/${id}`, formData);
export const deletePlayer = (formData) => API.delete(`players/${formData}`);
