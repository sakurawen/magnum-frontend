import React, { useRef, PropsWithChildren } from 'react';
import cx from 'clsx';
import { useDraggable } from '@dnd-kit/core';

type MaterialDragableProps = PropsWithChildren<{
  className?: string;
  id: string;
  item: Record<string, any>;
}>;

const MaterialDragable = ({
  children,
  id,
  className,
  item,
}: MaterialDragableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `Material-${id}`,
    data: {
      ...item,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cx(['cursor-default'], className)}
    >
      {children}
    </div>
  );
};

export default MaterialDragable;
