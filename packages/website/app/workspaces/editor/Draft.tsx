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
const Draft = () => {
  const {
    app: {
      setCurrentDraftComponentId,
      editor: { draftElements },
    },
  } = useTrackedAppStore();

  const { setNodeRef, isOver } = useDroppable({
    id: 'Draft',
  });
  const ref = useRef<HTMLDivElement>(null);

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

  const sortItems = useMemo(
    () => draftElements.map((i) => 'Element-' + i.id),
    [draftElements],
  );

  return (
    <div className="h-full w-full flex flex-col">
      <h1 className=" z-10 p-2  border-b border-theme-border text-sm select-none text-center">
        Draft
      </h1>
      <div
        ref={draftContainerRef}
        className="draft-container flex-1 flex justify-center items-center bg-theme-gray-2"
      >
        <div
          ref={setNodeRef}
          className={cx(' border-2 border-dashed', [
            isOver ? ' border-green-200' : 'border-transparent ',
          ])}
        >
          <div
            className={cx('w-[50.625vh] h-[86vh]    mx-auto shadow-sm', [
              isOver ? 'bg-green-50' : 'bg-white',
            ])}
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
      </div>
    </div>
  );
};

export default Draft;
