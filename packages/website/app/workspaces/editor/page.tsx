import Configuration from '@/app/workspaces/editor/configuration/Configuration';
import Draft from '@/app/workspaces/editor/Draft';
import MaterialList from '@/app/workspaces/editor/material/MaterialList';
import ClientDndContext from './ClientDndContext';

const Editor = () => {
  return (
    <ClientDndContext>
      <div className="h-full relative">
        <div className="absolute left-0 top-0 bg-white  z-20 h-full components-container w-80  border-r border-light">
          <MaterialList />
        </div>
        <div className={'h-full relative ml-80 mr-96'}>
          <Draft />
        </div>
        <div className="absolute right-0 top-0 bg-white z-10 h-full w-96  border-l border-light">
          <Configuration />
        </div>
      </div>
    </ClientDndContext>
  );
};

export default Editor;
