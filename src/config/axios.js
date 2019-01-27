import axios from 'axios';

console.log('NODE_ENV: ', process.env.NODE_ENV)

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_MONGO_LOCAL: process.env.REACT_APP_BASE_URL
});

export default instance;