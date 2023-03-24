'use client';
import { DraftElement } from '@/schemas/draft';
import { useSortable} from '@dnd-kit/sortable';
import { Icon } from '@iconify/react';
import cx from 'clsx';
import { PropsWithChildren } from 'react';
import { CSS } from '@dnd-kit/utilities';

type ElementSortableProps = PropsWithChildren<{
  item: DraftElement;
}>;

const ElementSortable = ({ item, children }: ElementSortableProps) => {
  const {
    setNodeRef,
    attributes,
    transform,
    transition,
    isDragging,
    listeners,
  } = useSortable({
    id: `Element-${item.id}`,
    data: item,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={{ ...style }}>
      <div className="relative">
        {children}
        <div
          {...attributes}
          {...listeners}
          className="right-2 hover:shadow py-1 top-1/2 -translate-y-1/2 absolute rounded hover:bg-white/50 text-theme-content-1 overflow-hidden cursor-grab"
        >
          <Icon className="w-6 h-6" icon="clarity:drag-handle-line" />
        </div>
      </div>
    </div>
  );
};

export default ElementSortable;
