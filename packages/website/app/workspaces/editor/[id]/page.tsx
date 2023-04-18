import Configuration from '@/app/workspaces/editor/[id]/configuration/Configuration';
import Draft from '@/app/workspaces/editor/[id]/Draft';
import MaterialList from '@/app/workspaces/editor/[id]/material/MaterialList';
import ClientDndContext from './ClientDndContext';
import { cookies } from 'next/headers';
import { request } from '@/utils/request';
import { Suspense } from 'react';
import { proxyBaseUrl } from '@/consts';
import { redirect } from 'next/navigation';

const getFormDate = async (id: string) => {
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

const Editor = async (props: {
  params: {
    id: string;
  };
}) => {
  const id = props.params.id;
  const editForm = await getFormDate(id);
  if (!editForm?.data) {
    return redirect('/workspaces');
  }
  return (
    <Suspense fallback={<div>loading...</div>}>
      <ClientDndContext>
        <div className="relative h-full">
          <div className="components-container border-light absolute left-0  top-0 z-20 h-full w-80  border-r bg-white">
            <MaterialList />
          </div>
          <div className={'relative ml-80 mr-96 h-full'}>
            <Draft data={editForm.data} />
          </div>
          <div className="border-light absolute right-0 top-0 z-10 h-full w-96  border-l bg-white">
            <Configuration />
          </div>
        </div>
      </ClientDndContext>
    </Suspense>
  );
};

export default Editor;
