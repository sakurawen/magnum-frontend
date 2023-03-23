'use client';
import { useDrop } from 'react-dnd';
import { useCallback, useEffect, useRef } from 'react';
import cx from 'clsx';
import { materialAcceptTypes } from '@/components/material';
import { log } from '@/utils';
import { useTrackedAppStore } from '@/store';
import { createDraftElement, DraftElement, DraftItem } from '@/schemas/draft';
import { Material } from '@/schemas/material';
import DraftElementComponent from './Element';
import { useDroppable } from '@dnd-kit/core';

const Draft = () => {
  const {
    app: {
      addDraftElement,
      setCurrentDraftComponentId,
      editor: { draftElements, currentDraftElementId },
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

  const renderDraftElement = useCallback(
    (item: DraftElement, index: number) => {
      return <DraftElementComponent key={item.id} item={item} index={index} />;
    },
    [],
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
            className={cx(
              'w-[50.625vh] h-[86vh] overflow-y-auto    mx-auto shadow-sm',
              [isOver ? 'bg-green-50' : 'bg-white'],
            )}
            ref={ref}
          >
            {draftElements.map((item, index) => {
              return renderDraftElement(item, index);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Draft;
