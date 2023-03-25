'use client';
import React, { PropsWithChildren } from 'react';
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
  const { attributes, isDragging, transform, listeners, setNodeRef } =
    useDraggable({
      id: `Material|${id}`,
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
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cx(
        ['cursor-default'],
        {
          // 'opacity-0': isDragging,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaterialDragable;
