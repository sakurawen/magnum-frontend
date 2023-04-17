import request from '@/utils/request';

type NewFormData = {
  title: string;
  description: string;
};
export const newForm = (data: NewFormData) => {
  return request.post<any,Service.Response<App.ListForm>>('/form/new', data);
};

export const listAll = () => {
  return request.post<any, Service.Response<App.ListForm[]>>('/form/list-all');
};
