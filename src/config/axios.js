import axios from 'axios';
import dotenv from 'dotenv';

dotenv.load();
console.log(process.env.REACT_APP_SERVER_BASE_URL);
const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_MONGO_LOCAL: process.env.REACT_APP_SERVER_BASE_URL
});

export default instance;