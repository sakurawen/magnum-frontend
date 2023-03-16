'use client';
import { useDrop } from 'react-dnd';
import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Components } from '@/components/material';
import { log } from '@/utils';
import { Button } from '@magnum/ui';

const acceptTypes = Object.keys(Components);

const Canvas = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setItem] = useState({
    left: 0,
    top: 0,
  });
  const [offset, setOffset] = useState({
    top: 0,
    left: 0,
  });
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: acceptTypes,
      drop(item, monitor) {
        const result = monitor.getClientOffset();
        setItem((i) => ({
          left: (result?.x || 0) - offset.left,
          top: (result?.y || 0) - offset.top,
        }));
        log.info('drop over', { item, result, offset });
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        };
      },
    }),
    [offset],
  );

  useEffect(() => {
    const watchSizeChange = () => {
      const rect = ref.current?.getBoundingClientRect();
      setOffset({
        left: rect?.left || 0,
        top: rect?.top || 0,
      });
    };
    watchSizeChange();
    window.addEventListener('resize', watchSizeChange);
    return () => {
      window.removeEventListener('resize', watchSizeChange);
    };
  }, []);

  drop(ref);

  return (
    <div className="h-full w-full flex flex-col">
      <h1 className="relative z-10 p-2  border-b border-gray-100 font-bold select-none">Canvas</h1>
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className={cx(' border-2 border-dashed', [isOver ? ' border-green-200' : 'border-transparent '])}>
          <div
            className={cx('w-[50.625vh] h-[90vh]  relative  mx-auto shadow-sm', [isOver ? 'bg-green-50' : 'bg-white'])}
            ref={ref}
          >
            <Button
              size="small"
              className="absolute bg-red-200 shadow-sm rounded"
              style={{
                left: i.left,
                top: i.top,
              }}
            >
              tag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
