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
import { useResize } from '@/hooks/use-resize';
import { materialList } from '@/components/magnum';

const Draft = () => {
  const {
    app: {
      setCurrentDraftElementId,
      setCanvasSize,
      editor: {
        canvas: { height, width },
        draftElements,
        currentDragItemType,
      },
    },
  } = useTrackedAppStore();

  const dragItemIsMaterial = currentDragItemType === 'Material';

  const { setNodeRef, isOver } = useDroppable({
    id: 'Draft',
  });
  const ref = useRef<HTMLDivElement>(null);

  const draftContainerRef = useRef<HTMLDivElement>(null);

  useResize(
    window,
    () => {
      const clientHeight = document.body.clientHeight;
      const height = clientHeight * 0.86;
      const width = clientHeight * 0.50625;
      setCanvasSize({
        width,
        height,
      });
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
        setCurrentDraftElementId(null);
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

  const MaterialDroppable = (
    <div
      ref={setNodeRef}
      className={cx(
        'draft-element-insert-layer flex justify-center items-center h-full w-full ',
        {},
        [
          isOver
            ? 'bg-green-50 border-2 border-dashed border-green-300'
            : 'bg-white border-2 border-dashed border-theme-gray-4',
        ],
      )}
    >
      <div className="flex text-center justify-center items-center">
        <div>
          <p>将物料拖动至此</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col">
      <h1 className=" z-10 p-2  border-b border-theme-border text-sm select-none text-center">
        草稿
      </h1>
      <div
        ref={draftContainerRef}
        className="draft-container flex-1 flex justify-center items-center bg-theme-gray-2"
      >
        <div className="w-[50.625vh] h-[86vh]">
          {dragItemIsMaterial ? (
            MaterialDroppable
          ) : (
            <div className="w-full h-full relative">
              <div
                className={cx(
                  'w-full  h-full pb-20 overflow-x-hidden overflow-y-auto bg-white mx-auto shadow-sm',
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
