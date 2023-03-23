import { PropsWithChildren, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { draftAcceptTypes } from '@/components/material';
import { useTrackedAppStore } from '@/store';
import { memo, useMemo } from 'react';

type DraftMoveableItem = {
  id: string;
  idx: number;
};

type DraftMoveableProps = PropsWithChildren<{
  type: string;
  id: string;
  idx: number;
}>;

const DraftMoveable = (props: DraftMoveableProps) => {
  const { children, id, type, idx } = props;
  const {
    app: {
      moveDraftElementByIndex,
      setCurrentDraftComponentId,
      updateDraftElementIdx,
    },
  } = useTrackedAppStore();

  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(() => ({
    type: 'draft-' + type,
    item: () => {
      setCurrentDraftComponentId(id);
      return {
        id,
        idx,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const [, drop] = useDrop({
    accept: draftAcceptTypes,
    hover(dragItem: DraftMoveableItem, monitor) {
      const dragIdx = dragItem.idx;
      const hoverIdx = idx;
      if (!ref.current) return;
      if (dragIdx === hoverIdx) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset() as XYCoord;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Dragging downwards
      if (dragIdx < hoverIdx && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIdx > hoverIdx && hoverClientY > hoverMiddleY) {
        return;
      }
      moveDraftElementByIndex(dragIdx, hoverIdx);
      updateDraftElementIdx(dragItem.id, hoverIdx);
    },
  });
  drag(drop(ref));
  return <div ref={ref}>{children}</div>;
};

export default memo(DraftMoveable);
