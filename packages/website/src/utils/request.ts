import axios from 'axios';

const HTTP_STATUS = {
  UN_AUTHORIZED: 401,
  OK: 200,
};

const request = axios.create({
  baseURL: '/api',
});

let token: string | null = localStorage.getItem('token');

request.interceptors.request.use((config) => {
  if (!token) {
    token = localStorage.getItem('token');
  }
  config.headers.set('Authorization', token);
  return config;
});

request.interceptors.response.use((response) => {
  if (response.status === 200) {
    if (response.data.code === HTTP_STATUS.OK) {
      return Promise.resolve(response.data);
    }
    return Promise.reject(response.data.msg);
  }
  return Promise.reject(new Error('请求失败'));
});

export default request;
