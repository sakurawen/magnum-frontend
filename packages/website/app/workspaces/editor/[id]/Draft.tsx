'use client';
import { useResize } from '@/hooks/use-resize';
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

type DraftProps = {
  data: App.FormTemplate;
};
const Draft = (props: DraftProps) => {
  const {
    app: {
      setCurrentDraftWidgetId,
      setCanvasSize,
      setEditorFormTemplate,
      editor: { draftWidgets, currentDragItemType, form },
    },
  } = useTrackedAppStore();

  const { data } = props;
  useEffect(() => {
    console.log('edit data:', data);
    setEditorFormTemplate(data);
  }, [data]);

  const dragItemIsMaterial = currentDragItemType === 'Material';

  const { setNodeRef, isOver } = useDroppable({
    id: 'Draft',
  });

  const ref = useRef<HTMLDivElement>(null);

  const draftContainerRef = useRef<HTMLDivElement>(null);

  useResize(
    typeof window !== 'undefined' ? window : undefined,
    () => {
      const clientHeight = document.body.clientHeight;
      if (!clientHeight) return;
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
        'draft-element-insert-layer relative z-10 flex h-full w-full items-center justify-center ',
        {},
        [
          isOver
            ? 'border-2 border-dashed border-green-300 bg-green-50'
            : 'border-theme-gray-4 border-2 border-dashed bg-white',
        ],
      )}
    >
      <div className="flex items-center justify-center text-center">
        <div>
          <p>将物料拖动至此</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col">
      <h1 className=" border-theme-border z-10  select-none border-b p-2 text-center text-sm">
        草稿 / {form?.title}
      </h1>
      <div
        ref={draftContainerRef}
        className="draft-container bg-gray-blue-50 relative flex flex-1 items-center justify-center"
      >
        <div className="bg-grid absolute z-0 h-full w-full opacity-10"></div>
        <div className="ring-gray-blue-100 h-[86vh] w-[50.625vh] overflow-hidden rounded shadow ring-1">
          {dragItemIsMaterial ? (
            MaterialDroppable
          ) : (
            <div className="h-full w-full overflow-y-auto overflow-x-hidden">
              <div
                className={cx(
                  'relative mx-auto min-h-full w-full  bg-white pb-20 shadow',
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
                <span className="absolute bottom-0 left-0 right-0 mx-auto select-none py-2 text-center text-xs text-gray-400">
                  Power by Magnum Form
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Draft;
