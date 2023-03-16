'use client';
import cx from 'classnames';
import Canvas from '@/components/Canvas';
import MaterialStore from '@/components/MaterialStore';
import MaterialConfiguration from '@/components/MaterialConfiguration';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './Navbar';


const Editor = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex justify-center flex-1">
          <div className="components-container w-80  border-r border-gray-100">
            <MaterialStore />
          </div>
          <div className={cx('canvas-container relative flex-1')}>
            <Canvas />
          </div>
          <div className="settings-container w-80  border-l border-gray-100">
            <MaterialConfiguration />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Editor;
