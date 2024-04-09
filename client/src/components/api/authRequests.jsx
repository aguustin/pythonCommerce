import axios from 'axios';

export const signInRequest = (data) => axios.post('http://127.0.0.1:8000/createUser/', data);

export const loginRequest = (data) => axios.post('http://127.0.0.1:8000/getUserInfo/', data);  