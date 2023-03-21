import { userService } from '@/services';
import type { UserLoginResult } from '@/services/userService';

export const validateToken = async (token: string | null) => {
  return new Promise<UserLoginResult>((resolve, reject) => {
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
