import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);
export const sortByRating = () => API.get('/products/sortByRatings');
export const sortByCategory = (category) => API.get(`/products/filterByCategory/${category}`);
export const sortByName = (productName) => API.get(`/products/getProductsByName/${productName}`);
// export const createReview = (id, review) => API.patch(`/products/createReview/${id}`, review);