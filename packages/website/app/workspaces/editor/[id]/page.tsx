import Configuration from '@/app/workspaces/editor/[id]/Configurations/Configuration';
import Draft from '@/app/workspaces/editor/[id]/Draft';
import MaterialList from '@/app/workspaces/editor/[id]/Materials/MaterialList';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ClientDndContext from './ClientDndContext';
import { getFormTemplate } from '@/utils/server-only';

const Editor = async (props: {
  params: {
    id: string;
  };
}) => {
  const id = props.params.id;
  const editForm = await getFormTemplate(id);
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
