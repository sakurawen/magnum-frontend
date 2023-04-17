import Configuration from '@/app/workspaces/editor/[id]/configuration/Configuration';
import Draft from '@/app/workspaces/editor/[id]/Draft';
import MaterialList from '@/app/workspaces/editor/[id]/material/MaterialList';
import ClientDndContext from './ClientDndContext';

const Editor = (props: {
  params: {
    id: string;
  };
}) => {
  const id = props.params.id;
  return (
    <ClientDndContext>
      <div className="relative h-full">
        <div className="components-container border-light absolute left-0  top-0 z-20 h-full w-80  border-r bg-white">
          <MaterialList />
        </div>
        <div className={'relative ml-80 mr-96 h-full'}>
          <Draft />
        </div>
        <div className="border-light absolute right-0 top-0 z-10 h-full w-96  border-l bg-white">
          <Configuration />
        </div>
      </div>
    </ClientDndContext>
  );
};

export default Editor;
