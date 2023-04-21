import { cookies } from 'next/headers';
import { request } from '@/utils';
import { proxyBaseUrl } from '@/consts';

export const getFormTemplate = async (id: string) => {
  const cookie = cookies().toString();
  try {
    const result = await request.post<any, Service.Response<App.FormTemplate>>(
      proxyBaseUrl + '/form/temp',
      {
        id,
      },
      {
        headers: {
          Cookie: cookie,
        },
      },
    );
    return result;
  } catch (err) {
    console.error('获取表单信息失败:', err);
  }
};

export const getFormSnapshot = async (id: string) => {
  const cookie = cookies().toString();
  try {
    const result = await request.post<any, Service.Response<App.FormTemplate>>(
      proxyBaseUrl + '/form/preview',
      {
        snapshot_id: id,
      },
      {
        headers: {
          Cookie: cookie,
        },
      },
    );
    return result;
  } catch (err) {
    console.error('获取表单信息失败:', err);
  }
};

export const getFormItem = (id: string) => {
  const cookie = cookies().toString();
  return request.post<any, Service.Response<App.FormModel>>(
    proxyBaseUrl + '/form/item',
    {
      id,
    },
    {
      headers: {
        Cookie: cookie,
      },
    },
  );
};
