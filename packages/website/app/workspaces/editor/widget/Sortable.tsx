'use client';
import { DraftWidget } from '@/schemas/draft';
import { useTrackedAppStore } from '@/store';
import { useSortable } from '@dnd-kit/sortable';
import { Icon } from '@iconify/react';
import { PropsWithChildren } from 'react';

type ElementSortableProps = PropsWithChildren<{
  item: DraftWidget;
}>;

const defaultRect = {
  height: 0,
  width: 0,
  left: 0,
  top: 0,
  x: 0,
  y: 0,
};
const ElementSortable = ({ item, children }: ElementSortableProps) => {
  const {
    app: {
      editor: {
        currentDragItemType,
      },
    },
  } = useTrackedAppStore();

  const dragItemIsMaterial = currentDragItemType === 'Material';

  const {
    setNodeRef,
    attributes,
    transform,
    transition,
    isDragging,
    listeners,
    node,
  } = useSortable({
    id: `Element|${item.id}`,
    data: item,
    disabled: dragItemIsMaterial,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
        opacity: isDragging ? 0 : 1,
      }
    : null;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        pointerEvents: dragItemIsMaterial ? 'none' : undefined,
      }}
    >
      <div className="sortable relative overflow-hidden group">
        {children}
        <div className="group-hover:right-0 -right-20 h-full transition-all top-0 flex flex-col justify-center items-center  absolute  z-50  overflow-hidden ">
          <div
            className="shadow bg-white  rounded cursor-grab"
            {...attributes}
            {...listeners}
            tabIndex={-1}
          >
            <Icon
              className="w-6 h-6  text-gray-800"
              icon="radix-icons:drag-handle-dots-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementSortable;
