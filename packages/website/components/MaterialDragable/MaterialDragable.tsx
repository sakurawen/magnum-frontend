import React, { useRef, PropsWithChildren, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import cx from 'clsx';

type MaterialDragableProps = PropsWithChildren<{
  className?: string;
  type: string;
  item: Record<string, any>;
}>;

const MaterialDragable = ({
  children,
  type,
  className,
  item,
}: MaterialDragableProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type,
      item,
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      options: {
        dropEffect: 'copy',
      },
    }),
    [item, type],
  );
  drag(ref);
  return (
    <div className={cx([isDragging && 'opacity-50'], className)} ref={ref}>
      {children}
    </div>
  );
};

export default MaterialDragable;
