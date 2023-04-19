import axios from 'axios';

const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

export const test = (prompt: string) => {
  return axios.post(
    url,
    {
      prompt: prompt,
      max_tokens: 1000,
      n: 1,
      stop: null,
      temperature: 0.5,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer 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`,
      },
    },
  );
};
