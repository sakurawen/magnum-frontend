import { PropsWithChildren, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { draftAcceptTypes } from '@/components/material';
import { useTrackedAppStore } from '@/store';
import { memo } from 'react';

type DraftDragableProps = PropsWithChildren<{
  type: string;
  id: string;
}>;
type DraftDragableItem = {
  id: string;
  originIndex: number;
};
const DraftDragable = (props: DraftDragableProps) => {
  const { children, id, type } = props;
  const {
    app: {
      moveDraftElement,
      setCurrentDraftComponentId,
      editor: { draftElements },
    },
  } = useTrackedAppStore();

  const findIndex = (id: string) => {
    const item = draftElements.filter((item) => item.id === id)[0];
    const ret = draftElements.indexOf(item);
    if (ret === -1) {
      console.log('item:', item, id, draftElements.length);
    }
    return ret;
  };

  const originIndex: number = findIndex(id);
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(
    () => ({
      type: 'draft-' + type,
      item: () => {
        setCurrentDraftComponentId(id);
        return {
          id,
          originIndex,
        };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end(item: DraftDragableItem, monitor) {
        console.log('end')
        const { id: droppedId, originIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveDraftElement(droppedId, originIndex);
        }
      },
    }),
    [originIndex, id, draftElements],
  );
  const [, drop] = useDrop(
    () => ({
      accept: draftAcceptTypes,
      hover(item: DraftDragableItem, monitor) {
        console.log('hover')
        const { id: draggedId } = item;
        if (draggedId !== id) {
          const overIndex = findIndex(id);
          moveDraftElement(draggedId, overIndex);
        }
      },
    }),
    [originIndex, id],
  );
  drag(drop(ref));
  return <div ref={ref}>{children}</div>;
};

export default memo(DraftDragable);
