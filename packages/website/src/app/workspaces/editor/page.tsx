'use client';

import cx from 'clsx';
import Draft from '@/components/Draft';
import MaterialStore from '@/components/MaterialStore';
import MaterialConfiguration from '@/components/MaterialConfiguration';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from '@/components/Navbar';

const Editor = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full relative">
        <div className="absolute left-0 top-0 bg-white  z-20 h-full components-container w-80  border-r border-light">
          <MaterialStore />
        </div>
        <div className={cx('Draft-container h-full  relative ml-80 mr-80')}>
          <Draft />
        </div>
        <div className="absolute right-0 top-0 bg-white  z-10 h-full w-80  border-l border-light">
          <MaterialConfiguration />
        </div>
      </div>
    </DndProvider>
  );
};

export default Editor;
