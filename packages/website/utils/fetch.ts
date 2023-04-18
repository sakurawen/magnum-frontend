import { serviceBaseUrl } from '@/consts';
/**
 * 自定义fetch
 * @param input
 * @param init
 * @returns
 */
export const fetchx = (input: string, init?: RequestInit) => {
  input = serviceBaseUrl + '/api' + input;
  console.log("input:",input)
  return fetch(input, init).then((res) => res.json());
};
