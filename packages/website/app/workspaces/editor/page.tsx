import Draft from '@/app/workspaces/editor/Draft';
import Configuration from '@/app/workspaces/editor/Configuration';
import Materials from '@/app/workspaces/editor/Materials';
import cx from 'clsx';
import ClientDndProvider from './ClientDndProvider';
import PreviewLayer from './PreviewLayer';

const Editor = () => {
  return (
    <ClientDndProvider>
      {/* <PreviewLayer /> */}
      <div className="h-full relative">
        <div className="absolute left-0 top-0 bg-white  z-20 h-full components-container w-80  border-r border-light">
          <Materials />
        </div>
        <div className={cx('Draft-container h-full  relative ml-80 mr-80')}>
          <Draft />
        </div>
        <div className="absolute right-0 top-0 bg-white  z-10 h-full w-80  border-l border-light">
          <Configuration />
        </div>
      </div>
    </ClientDndProvider>
  );
};

export default Editor;
