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

type SnapshotForm = {
  title: string;
  description: string;
  form_id: string;
  json: string;
};

export const snapshot = (data: SnapshotForm) => {
  return request.post<any, Service.Response<string>>('/form/snapshot', data);
};

export const preview = (id: string) => {
  return request.post<any, Service.Response<App.FormSnapshot>>(
    '/form/preview',
    {
      id,
    },
  );
};

export const submit = (fid: string, data: App.Submission[]) => {
  return request.post<any, Service.Response<any>>('/form/submit', {
    form_id: fid,
    fields: data,
  });
};

export const submissions = (formID: string) => {
  return request.post<any, Service.Response<App.FormSubmissionDataModel>>(
    '/form/submissions',
    {
      form_id: formID,
    },
  );
};

export const submissionRecord = (submissionID: string) => {
  return request.post<any, Service.Response<App.FormSubmissionDataModel[]>>(
    '/form/submission-data',
    {
      submission_id: submissionID,
    },
  );
};

export const item = (id: string) => {
  return request.post<any, Service.Response<App.FormModel>>('/form/item', {
    id,
  });
};
