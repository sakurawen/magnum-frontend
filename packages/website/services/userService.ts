import { request } from '@/utils';

export const register = (form: {
  username: string;
  password: string;
  passwordRepeat: string;
}) => {
  return request.post<any, Service.Response>('/user/register', form);
};

export type UserLoginResult = {
  valid: string;
  account: string;
  name: string;
  id: string;
};

export const login = (form: { username: string; password: string }) => {
  return request.post<any, Service.Response<UserLoginResult>>(
    '/user/login',
    form,
  );
};

export const validateToken = () => {
  return request.post<any, Service.Response<UserLoginResult>>(
    '/user/validate_token',
  );
};

export const logout = () => {
  return request.post('/user/logout');
};
