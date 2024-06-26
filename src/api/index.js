import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

// Add a request interceptor
API.interceptors.request.use(function (req) {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).data.token}`
    }
    return req;
});

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)
export const getCategory = () => API.get('/menus/getCategory')
export const getMenuCategory = () => API.get('/menus/getMenuCategory')
export const getPlayer = () => API.get('/players')
export const getPlayers = (searchQuery) => API.get(`/players/search?searchQuery=${searchQuery.name || 'none'}`);
export const getPlayerById = (id) => API.get(`/players/${id}`)
export const addCategory = (newCategory) => API.post('/menus/addCategory', newCategory)
export const deleteCategory = (id) => API.delete(`/menus/${id}`)
export const addSubCategory = (newSubCategory) => API.post('/menus/addSubCategory', newSubCategory)
export const deleteSubCategory = (subCategory) => API.delete('/menus/deleteSubCategory', subCategory)
export const addPlayer = (formData) => API.post('/players', formData)
export const updatePlayer = (id, formData) => API.patch(`/players/${id}`, formData)
export const deletePlayer = (formData) => API.delete(`players/${formData}`)