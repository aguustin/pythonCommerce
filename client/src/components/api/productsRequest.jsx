import axios from 'axios';

export const getAllProductsRequest = () => axios.get('http://127.0.0.1:8000/getAllProducts/');

export const addToCartRequest = (data) => axios.post('http://127.0.0.1:8000/updateCartInfo/', data);

export const getUserCartByIdRequest = (userId) => axios.get(`http://127.0.0.1:8000/getUserCartById/${userId}`);

export const orderRequest = (serializeCartProducts) => axios.post('http://127.0.0.1:8000/order/', serializeCartProducts);

export const fillDatabaseRequest = (product) => axios.post('http://127.0.0.1:8000/fillDatabase/', product);