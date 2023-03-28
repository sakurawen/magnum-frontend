'use client';
import { useTrackedAppStore } from '@/store';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import cx from 'clsx';
import { useEffect, useMemo, useRef } from 'react';
import WidgetSortable from './widget/Sortable';
import DraftWidget from './widget/Widget';
import { useResize } from '@/hooks/use-resize';

const Draft = () => {
  const {
    app: {
      setCurrentDraftWidgetId,
      setCanvasSize,
      editor: {
        canvas: { height, width },
        draftWidgets,
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
        setCurrentDraftWidgetId(null);
      }
    };
    document.addEventListener('click', listenDraftItemCancelSelect);
    return () => {
      document.removeEventListener('click', listenDraftItemCancelSelect);
    };
  }, []);

  const sortItems = useMemo(
    () => draftWidgets.map((i) => 'Element|' + i.id),
    [draftWidgets],
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
                  {draftWidgets.map((item) => {
                    return (
                      <WidgetSortable item={item} key={item.id}>
                        <DraftWidget item={item} />
                      </WidgetSortable>
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
