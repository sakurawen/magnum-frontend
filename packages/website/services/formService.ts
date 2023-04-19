import request from '@/utils/request';

type NewFormData = {
  title: string;
  description: string;
};
export const newForm = (data: NewFormData) => {
  return request.post<any, Service.Response<App.ListForm>>('/form/new', data);
};

export const listAll = () => {
  return request.post<any, Service.Response<App.ListForm[]>>('/form/list-all');
};

type ReleaseFormData = {
  form_id: string;
  fields: Array<{
    field_type: string;
    field_name: string;
    order_index: number;
    config: Array<{
      field_id: string;
      key: string;
      text: string;
      value: string;
      json_string_value: string;
      order_index: number;
    }>;
  }>;
};
export const releaseForm = (form: ReleaseFormData) => {
  return request.post<any, Service.Response<App.FormTemplate['template']>>(
    '/form/release',
    form,
  );
};
