import { PropsWithChildren, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { draftAcceptTypes } from '@/components/material';
import { useTrackedAppStore } from '@/store';
import { memo, useMemo } from 'react';

type DraftMoveableItem = {
  id: string;
  rawIndex: number;
};

type DraftMoveableProps = PropsWithChildren<{
  type: string;
  id: string;
}>;

const DraftMoveable = (props: DraftMoveableProps) => {
  const { children, id, type } = props;
  const {
    app: {
      moveDraftElement,
      setCurrentDraftComponentId,
      editor: { draftElements },
    },
  } = useTrackedAppStore();

  const findIndexById = (id: string) => {
    const item = draftElements.filter((item) => item.id === id)[0];
    const ret = draftElements.indexOf(item);
    if (ret === -1) {
      console.log('item:', item, id, draftElements.length);
    }
    return ret;
  };

  const rawIndex: number = useMemo(
    () => findIndexById(id),
    [id, draftElements],
  );
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(
    () => ({
      type: 'draft-' + type,
      item: () => {
        setCurrentDraftComponentId(id);
        return {
          id,
          rawIndex,
        };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end(item: DraftMoveableItem, monitor) {
        console.log('end');
        const { id: droppedId, rawIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveDraftElement(droppedId, rawIndex);
        }
      },
    }),
    [rawIndex, id, draftElements],
  );
  const [, drop] = useDrop(
    () => ({
      accept: draftAcceptTypes,
      hover(item: DraftMoveableItem, monitor) {
        console.log('hover');
        const { id: draggedId } = item;
        if (draggedId !== id) {
          const overIndex = findIndexById(id);
          moveDraftElement(draggedId, overIndex);
        }
      },
    }),
    [rawIndex, id],
  );
  drag(drop(ref));
  return <div ref={ref}>{children}</div>;
};

export default memo(DraftMoveable);
