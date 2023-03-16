import { userService } from '@/services';
import type { UserLoginResult } from '@/services/userService';

export const validateToken = async () => {
  return new Promise<UserLoginResult>((resolve, reject) => {
    const token = localStorage.getItem('token');
    if (!token) {
      reject();
      return;
    }
    return userService
      .validateToken()
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
