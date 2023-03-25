'use client';
import { DraftElement } from '@/schemas/draft';
import { useSortable } from '@dnd-kit/sortable';
import { Icon } from '@iconify/react';
import { PropsWithChildren } from 'react';
import { useTrackedAppStore } from '@/store';

type ElementSortableProps = PropsWithChildren<{
  item: DraftElement;
}>;

const ElementSortable = ({ item, children }: ElementSortableProps) => {
  const {
    app: {
      editor: { currentDragItemType },
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
      <div className="relative group">
        {children}
        <div
          {...attributes}
          {...listeners}
          className="right-2 hover:shadow group-hover:opacity-100 opacity-0 py-1 top-1/2 -translate-y-1/2 absolute rounded hover:bg-white/50 text-theme-content-1 overflow-hidden cursor-grab"
        >
          <Icon
            className="w-4 h-4 text-theme-3"
            icon="radix-icons:drag-handle-dots-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ElementSortable;
