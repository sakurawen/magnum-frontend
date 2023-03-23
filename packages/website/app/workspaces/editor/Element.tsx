import { PropsWithChildren, useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { draftAcceptTypes } from '@/components/material';
import { useTrackedAppStore } from '@/store';
import { DraftElement } from '@/schemas/draft';
import cx from 'clsx';

type ElementItem = {
  id: string;
  index: number;
};

type ElementProps = {
  index: number;
  item: DraftElement;
};

const getProperties = (raw: Record<string, any>) => {
  const properties: Record<string, any> = {};
  for (let key in raw) {
    properties[key] = raw[key].value;
  }
  return properties;
};

const Element = (props: ElementProps) => {
  const { item, index } = props;
  const {
    app: {
      setCurrentDraftComponentId,
      moveDraftElementByIndex,
      editor: { currentDraftElementId },
    },
  } = useTrackedAppStore();

  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId, isDragging }, drag] = useDrag(() => ({
    type: 'draft-' + item.name,
    item: () => {
      return {
        id: item.id,
        index,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const [, drop] = useDrop({
    accept: draftAcceptTypes,
    hover(dragItem: ElementItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = dragItem.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveDraftElementByIndex(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    },
  });
  const handleSelectDraftComponentId = (id: string) => {
    setCurrentDraftComponentId(id);
  };
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className="my-2"
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      data-handle-id={handlerId}
    >
      <div
        data-is-draft-item={true}
        onClick={() => handleSelectDraftComponentId(item.id)}
        className={cx('p-2 ring-theme-2 ring-inset', {
          'bg-theme-1/50 ring-2': currentDraftElementId === item.id,
        })}
        key={item.id}
      >
        <div className="pointer-events-none select-none">
          <item.componentType
            {...item.internal}
            {...getProperties(item.configuration.properties)}
            className={cx(item.internal.className)}
          />
        </div>
      </div>
    </div>
  );
};

export default Element;
