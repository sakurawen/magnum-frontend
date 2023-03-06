import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

interface DragableProps {
  className?: string;
  type: string;
  children: React.ReactNode;
  item: Record<string, any>;
}

const Dragable = ({ children, type, className, item }: DragableProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag(
    () => ({
      type,
      item,
    }),
    [item, type],
  );
  drag(ref);
  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default Dragable;
