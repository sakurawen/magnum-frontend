import { createPrompt } from '@/utils/aigc';
import axios from 'axios';
const instance = axios.create({
  timeout: 2 * 60 * 1000,
});
export const completions = (prompt: string) => {
  return new Promise((resolve, reject) => {
    instance
      .post('http://localhost:3670/chat/completions', {
        prompt: prompt,
      })
      .then((res: any) => {
        console.log(res);
        if (res.data.json) {
          resolve(res.data);
        } else {
          reject(new Error('openai系统繁忙,请稍后再试'));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
