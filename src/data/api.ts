import axios from 'axios';
import { getStorageItem } from '../utils/storage';
import { TOKEN } from './auth/authStorageConstants';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(
  async function (config) {
    const token = await getStorageItem<string>(TOKEN);

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  function (err) {
    return Promise.reject(err);
  },
);

export default api;
