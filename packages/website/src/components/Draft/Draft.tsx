'use client';
import { useDrop } from 'react-dnd';
import { useEffect, useRef, useState } from 'react';
import cx from 'clsx';
import { acceptTypes } from '@/consts/material';
import { log } from '@/utils';
import { useTrackedAppStore } from '@/store';
import { createDraftElement, DraftElement, DraftProperty } from '@/utils/draft';
import { nanoid } from 'nanoid';
const Draft = () => {
  const {
    app: {
      addDraftElement,
      setCurrentDraftComponent,
      editor: { draft, currentDraftElement },
    },
  } = useTrackedAppStore();

  const ref = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState({
    top: 0,
    left: 0,
  });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: acceptTypes,
      drop(item: DraftProperty, monitor) {
        addDraftElement(
          createDraftElement({
            ...item,
            id: nanoid(),
          }),
        );
        log.info('drop over', { item });
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

  const handleSelectDraftComponent = (item: DraftElement) => {
    setCurrentDraftComponent(item);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <h1 className="relative z-10 p-2  border-b border-theme-border text-sm select-none text-center">Draft</h1>
      <div className="flex-1 flex justify-center items-center bg-theme-gray-2">
        <div className={cx(' border-2 border-dashed', [isOver ? ' border-green-200' : 'border-transparent '])}>
          <div
            className={cx('w-[50.625vh] h-[86vh]  relative  mx-auto shadow-sm', [isOver ? 'bg-green-50' : 'bg-white'])}
            ref={ref}
          >
            {draft.map((item) => {
              return (
                <div
                  onClick={() => handleSelectDraftComponent(item)}
                  className={cx('p-2 hover:ring-2  ring-theme-1/40 ring-inset', {
                    'bg-theme-1/10 ring-2': currentDraftElement?.id === item.id,
                  })}
                  key={item.id}
                >
                  <div className="pointer-events-none select-none">
                    <item.componentType
                      {...item.configuration.raw}
                      className={cx([currentDraftElement?.id === item.id && 'shadow'], item.defaultClassName)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
