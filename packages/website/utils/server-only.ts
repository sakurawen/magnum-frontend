import { cookies } from 'next/headers';
import { request } from '@/utils';
import { proxyBaseUrl } from '@/consts';
export const getFormDate = async (id: string) => {
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