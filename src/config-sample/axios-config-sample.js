import axios from 'axios';
import dotenv from 'dotenv';

dotenv.load();

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_MONGO_LOCAL: process.env.PRODUCTION_URL
});

export default instance;