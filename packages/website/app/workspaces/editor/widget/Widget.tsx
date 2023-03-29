import { DraftWidget } from '@/schemas/draft';
import { useTrackedAppStore } from '@/store';
import cx from 'clsx';

type ElementProps = {
  item: DraftWidget;
  className?: string;
};

const getProperties = (conf: DraftWidget['configuration']) => {
  const properties: Record<string, any> = {};
  for (let idx in conf) {
    const property = conf[idx];
    properties[property.key] = property.value;
  }
  return properties;
};

const Element = (props: ElementProps) => {
  const { item, className } = props;
  const {
    app: {
      setCurrentDraftWidgetId,
      editor: { currentDraftWidgetId },
    },
  } = useTrackedAppStore();

  const handleSelectElementById = (id: string) => {
    setCurrentDraftWidgetId(id);
  };
  return (
    <div
      data-is-draft-item={true}
      className={cx('widget px-3 py-2 ring-inset ', {
        'bg-theme-1/5 ring-2': currentDraftWidgetId === item.id,
      })}
      onClick={() => handleSelectElementById(item.id)}
    >
      <div className="pointer-events-none select-none ring-theme-2 ring-inset">
        <item.componentType
          {...item.internal}
          {...getProperties(item.configuration)}
          className={cx(
            item.internal.className,
            className,
          )}
        />
      </div>
    </div>
  );
};

export default Element;
