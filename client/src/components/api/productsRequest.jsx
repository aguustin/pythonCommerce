import axios from 'axios';

export const addToCartRequest = (data) => axios.post('http://127.0.0.1:8000/updateCartInfo/', data) 