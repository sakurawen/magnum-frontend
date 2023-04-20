import axios from 'axios';

export const test = (prompt: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/openai/completions', {
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
