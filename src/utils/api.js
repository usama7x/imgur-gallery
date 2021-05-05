import axios from 'axios';
import {CONSTANT_VARIABLES} from '../utils/constants';

const instance = axios.create();

instance.interceptors.request.use(config => {
    return new Promise((resolve, reject) => {
    config.headers.Authorization = `Client-ID ${CONSTANT_VARIABLES.CLIENT_ID}`;
    resolve(config);
    })
}, error => Promise.reject(error));

export default instance;