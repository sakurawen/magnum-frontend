import { userService } from '@/services';
import type { UserLoginResult } from '@/services/userService';

export const validateToken = async () => {
  return new Promise<UserLoginResult>((resolve, reject) => {
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
