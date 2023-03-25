'use client';
import { useTrackedAppStore } from '@/store';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import cx from 'clsx';
import { useEffect, useMemo, useRef } from 'react';
import ElementSortable from './element/Sortable';
import DraftElementComponent from './element/Element';
import { useHotKey, Control } from '@/hooks/use-hot-key';

const Draft = () => {
  const {
    app: {
      setCurrentDraftComponentId,
      editor: { draftElements, currentDragItemType },
    },
  } = useTrackedAppStore();

  const dragItemIsMaterial = currentDragItemType === 'Material';

  const { setNodeRef, isOver } = useDroppable({
    id: 'Draft',
  });
  const ref = useRef<HTMLDivElement>(null);

  const draftContainerRef = useRef<HTMLDivElement>(null);

  useHotKey(
    ['d', [Control,Control,Control,Control]],
    () => {
      console.log('测试快捷键');
    },
    [],
  );

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

  const sortItems = useMemo(
    () => draftElements.map((i) => 'Element|' + i.id),
    [draftElements],
  );
  console.log({
    isOver,
  });
  return (
    <div className="h-full w-full flex flex-col">
      <h1 className=" z-10 p-2  border-b border-theme-border text-sm select-none text-center">
        Draft
      </h1>
      <div
        ref={draftContainerRef}
        className="draft-container flex-1 flex justify-center items-center bg-theme-gray-2"
      >
        <div className="w-[50.625vh] h-[86vh]">
          {dragItemIsMaterial ? (
            <div
              ref={setNodeRef}
              className={cx(
                'draft-element-insert-layer flex justify-center items-center h-full w-full ',
                {},
                [isOver ? 'bg-green-50' : 'bg-white'],
              )}
            >
              <div className="flex  justify-center items-center">
                <div>拖动到这里</div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div
                className={cx(
                  'w-full h-full pb-20 overflow-y-auto bg-white mx-auto shadow-sm',
                )}
                ref={ref}
              >
                <SortableContext
                  strategy={verticalListSortingStrategy}
                  items={sortItems}
                >
                  {draftElements.map((item) => {
                    return (
                      <ElementSortable item={item} key={item.id}>
                        <DraftElementComponent item={item} />
                      </ElementSortable>
                    );
                  })}
                </SortableContext>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Draft;
