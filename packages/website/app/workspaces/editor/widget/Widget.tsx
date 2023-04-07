'use client';
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
      <div className="ring-theme-2 pointer-events-none relative select-none ring-inset">
        <div
          className={cx(
            'select-ring bg-theme-1/5 absolute z-10 h-full w-full ring-2 ring-inset',
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
