'use client';
import { useDrop } from 'react-dnd';
import { useEffect, useRef } from 'react';
import cx from 'clsx';
import { materialAcceptTypes } from '@/components/material';
import { log } from '@/utils';
import { useTrackedAppStore } from '@/store';
import { createDraftElement } from '@/schemas/draft';
import { Material } from '@/schemas/material';
import DraftMoveable from '@/components/DraftMoveable';

const getProperties = (raw: Record<string, any>) => {
  const properties: Record<string, any> = {};
  for (let key in raw) {
    properties[key] = raw[key].value;
  }
  return properties;
};

const Draft = () => {
  const {
    app: {
      addDraftElement,
      setCurrentDraftComponentId,
      editor: { draftElements, currentDraftElementId },
    },
  } = useTrackedAppStore();

  const ref = useRef<HTMLDivElement>(null);

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
    [],
  );

  drop(ref);

  const handleSelectDraftComponentId = (id: string) => {
    setCurrentDraftComponentId(id);
  };

  const draftContainerRef = useRef<HTMLDivElement>(null);

  /**
   * 监听取消选中
   */
  useEffect(() => {
    const listenDraftItemCancelSelect = (e: MouseEvent) => {
      const isDraftItem = (e.target as any).dataset.isDraftItem;
      if (
        !isDraftItem &&
        draftContainerRef.current?.contains(e.target as HTMLElement)
      ) {
        setCurrentDraftComponentId(null);
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
            {draftElements.map((item) => {
              return (
                <DraftMoveable id={item.id} type={item.name} key={item.id}>
                  <div
                    data-is-draft-item={true}
                    onClick={() => handleSelectDraftComponentId(item.id)}
                    className={cx('p-2 ring-theme-2 ring-inset', {
                      'bg-theme-1/50 ring-2': currentDraftElementId === item.id,
                    })}
                    key={item.id}
                  >
                    <div className="pointer-events-none select-none">
                      <item.componentType
                        {...item.internal}
                        {...getProperties(item.configuration.properties)}
                        className={cx(item.internal.className)}
                      />
                    </div>
                  </div>
                </DraftMoveable>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
