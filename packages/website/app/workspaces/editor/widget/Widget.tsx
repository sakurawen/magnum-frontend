import { DraftWidget } from '@/schemas/draft';
import { useTrackedAppStore } from '@/store';
import { propertyType } from '@/widget/magnum/consts';
import cx from 'clsx';

type ElementProps = {
  item: DraftWidget;
  className?: string;
};

const getProperties = (conf: DraftWidget['configuration']) => {
  const properties: Record<string, any> = {};
  for (let idx in conf) {
    const property = conf[idx];
    if (property.type === propertyType.SELECT) {
      const option = property.value;
      properties[property.key] = option.value;
      continue;
    }
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
      className={cx('widget')}
      onClick={() => handleSelectElementById(item.id)}
    >
      <div className="pointer-events-none select-none relative ring-theme-2 ring-inset">
        <div
          className={cx(
            'select-ring absolute z-10 h-full w-full ring-2 ring-inset bg-theme-1/5',
            [currentDraftWidgetId === item.id ? 'block' : 'hidden'],
          )}
        ></div>
        <item.componentType
          {...item.internal}
          {...getProperties(item.configuration)}
          className={cx(item.internal.className, className)}
        />
      </div>
    </div>
  );
};

export default Element;
