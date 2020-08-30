import axios from 'axios';
import { TIMEZONE } from '../constants/timezone';
import { getStorageItem } from '../utils/storage';
import EventPublisher from '../utils/eventPublisher';
import { TOKEN } from './auth/authStorageConstants';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use(
  async function onFulfilled(config) {
    const token = await getStorageItem<string>(TOKEN);

    config.headers.timezone = TIMEZONE;
    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  function onRejected(err) {
    return Promise.reject(err);
  },
);

const emitTokenExpiredEvent = (): void => {
  EventPublisher.instance.publish('TOKEN_EXPIRED');
};

api.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  function onRejected(error) {
    if (error.response?.status === 401) {
      emitTokenExpiredEvent();
    }
    return Promise.reject(error);
  },
);

export default api;
