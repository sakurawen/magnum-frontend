'use client';
import { useDrop } from 'react-dnd';
import { useEffect, useRef, useState } from 'react';
import cx from 'clsx';
import { materialAcceptTypes } from '@/components/material';
import { log } from '@/utils';
import { useTrackedAppStore } from '@/store';
import { createDraftElement, DraftElement } from '@/schemas/draft';
import { Material } from '@/schemas/material';
import DraftDragable from '@/components/DraftDragable';

const Draft = () => {
  const {
    app: {
      addDraftElement,
      setCurrentDraftComponent,
      editor: { draftElements, currentDraftElement },
    },
  } = useTrackedAppStore();

  const ref = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState({
    top: 0,
    left: 0,
  });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: materialAcceptTypes,
      drop(item: Material['item'], monitor) {
        log.info('drop over', item);
        addDraftElement(createDraftElement(item));
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

  const draftContainerRef = useRef<HTMLDivElement>(null);

  /**
   * 取消选中
   */
  useEffect(() => {
    const listenDraftItemCancelSelect = (e: MouseEvent) => {
      const isDraftItem = (e.target as any).dataset.isDraftItem;
      if (
        !isDraftItem &&
        draftContainerRef.current?.contains(e.target as HTMLElement)
      ) {
        console.log('cancel select');
        setCurrentDraftComponent(null);
      }
    };
    document.addEventListener('click', listenDraftItemCancelSelect);
    return () => {
      document.removeEventListener('click', listenDraftItemCancelSelect);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <h1 className="relative z-10 p-2  border-b border-theme-border text-sm select-none text-center">
        Draft
      </h1>
      <div
        ref={draftContainerRef}
        className="draft-container flex-1 flex justify-center items-center bg-theme-gray-2"
      >
        <div
          className={cx(' border-2 border-dashed', [
            isOver ? ' border-green-200' : 'border-transparent ',
          ])}
        >
          <div
            className={cx(
              'w-[50.625vh] h-[86vh] overflow-y-auto  relative  mx-auto shadow-sm',
              [isOver ? 'bg-green-50' : 'bg-white'],
            )}
            ref={ref}
          >
            {draftElements.map((item, index) => {
              return (
                <DraftDragable
                  item={item}
                  index={index}
                  type={item.name}
                  key={item.id}
                >
                  <div
                    data-is-draft-item={true}
                    onClick={() => handleSelectDraftComponent(item)}
                    className={cx('p-2 hover:ring-2  ring-theme-2 ring-inset', {
                      'bg-theme-1/50 ring-2':
                        currentDraftElement?.id === item.id,
                    })}
                    key={item.id}
                  >
                    <div className="pointer-events-none select-none">
                      <item.componentType
                        {...item.internal}
                        {...item.configuration.raw}
                        className={cx(
                          [currentDraftElement?.id === item.id && 'shadow'],
                          item.internal.className,
                        )}
                      />
                    </div>
                  </div>
                </DraftDragable>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
