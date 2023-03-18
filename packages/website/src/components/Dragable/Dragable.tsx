import React, { useRef, isValidElement } from 'react';
import { useDrag } from 'react-dnd';
import cx from 'clsx';

interface DragableProps {
  className?: string;
  type: string;
  children: React.ReactNode;
  item: Record<string, any>;
}

const Dragable = ({ children, type, className, item }: DragableProps) => {
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

export default Dragable;
