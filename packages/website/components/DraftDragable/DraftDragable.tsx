import { PropsWithChildren, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { draftAcceptTypes } from '@/components/material';
import { useTrackedAppStore } from '@/store';

type DraftDragableProps = PropsWithChildren<{
  type: string;
  index: number;
  item: Record<string, any>;
}>;

const DraftDragable = (props: DraftDragableProps) => {
  const { children, item, type, index } = props;
  const {
    app: { swapDraftElement },
  } = useTrackedAppStore();
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: 'draft-' + type,
    item: {
      ...item,
      index,
    },
  });
  const [, drop] = useDrop(() => ({
    accept: draftAcceptTypes,
    hover(item: any, monitor) {
      if (item.index !== index) {
        swapDraftElement(item.index, index);
      }
    },
  }));
  drop(drag(ref));
  return <div ref={ref}>{children}</div>;
};

export default DraftDragable;
