import axios from 'axios';

const HTTP_STATUS = {
  UN_AUTHORIZED: 401,
  OK: 200,
};

export const request = axios.create({
  baseURL: '/api',
  withCredentials:true
});

request.interceptors.request.use((config) => {
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
