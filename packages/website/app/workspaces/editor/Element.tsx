import { useTrackedAppStore } from '@/store';
import { DraftElement } from '@/schemas/draft';
import cx from 'clsx';
import { useDraggable } from '@dnd-kit/core';
import { Icon } from '@iconify/react';

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
  const { item } = props;
  const {
    app: {
      setCurrentDraftComponentId,
      editor: { currentDraftElementId },
    },
  } = useTrackedAppStore();

  const handleSelectElementById = (id: string) => {
    setCurrentDraftComponentId(id);
  };

  const { setNodeRef, transform, attributes, isDragging, listeners } =
    useDraggable({
      id: `Element-${item.id}`,
      data: item,
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
      {...attributes}
      className={cx('draft-element cursor-default', [
        isDragging ? 'z-100' : 'z-0',
      ])}
      onClick={() => handleSelectElementById(item.id)}
    >
      <div
        data-is-draft-item={true}
        className={cx('p-2 rounded relative ring-theme-2 ring-inset', {
          'bg-theme-1/50 ring-2': currentDraftElementId === item.id,
          'bg-white': isDragging,
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
        <button
          className="right-3 hover:shadow py-1 top-1/2 -translate-y-1/2 absolute rounded hover:bg-white/50 text-theme-content-1 overflow-hidden cursor-grab"
          {...listeners}
        >
          <Icon className="w-6 h-6" icon="clarity:drag-handle-line" />
        </button>
      </div>
    </div>
  );
};

export default Element;
