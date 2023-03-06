'use client';
import cx from 'classnames';
import Canvas from '@/components/Canvas';
import MaterialStore from '@/components/MaterialStore';
import MaterialConfiguration from '@/components/MaterialConfiguration';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

/**
 * 编辑页面
 * @returns
 */
const Editor = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex justify-center">
        <div className="conponents-container w-72 bg-sky-50/20 border-r border-gray-100">
          <MaterialStore />
        </div>
        <div className={cx('canvas-container relative flex-1')}>
          <Canvas />
        </div>
        <div className="settings-container w-72 bg-sky-50/20 border-l border-gray-100">
          <MaterialConfiguration />
        </div>
      </div>
    </DndProvider>
  );
};

export default Editor;
