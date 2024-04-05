import axios from 'axios';
import { toast } from 'react-toastify';
import { handleAuthError } from '../shared/auth';

function chooseMessage(status) {
  switch (status) {
    case 500:
      return 'Внутренняя ошибка сервера';
    case 404:
      return 'Ресурс не найден';
    case 401:
      handleAuthError();
      break;
    default:
      return '';
  }
  return '';
}

const httpClient = axios.create({
  baseURL: '/api/v1',
});

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = chooseMessage(error.request.status);
    if (message) {
      toast.error(message);
    }
    return Promise.reject(error);
  },
);

export default httpClient;
