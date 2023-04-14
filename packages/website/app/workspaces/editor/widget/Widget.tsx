'use client';
import { DraftWidget } from '@/schemas/draft';
import { useTrackedAppStore } from '@/store';
import { propertyType } from '@/widget/consts';
import cx from 'clsx';
import * as MagnumImpl from '@/widget/components/magnum';
import { useEffect } from 'react';
type MagnumImplKeys = keyof typeof MagnumImpl;
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

  const ElementComponent = MagnumImpl[item.name as MagnumImplKeys] as React.ElementType;

  return (
    <div
      data-is-draft-item={true}
      className={cx('widget')}
      onClick={() => handleSelectElementById(item.id)}
    >
      <div className=" pointer-events-none relative select-none ring-inset">
        <div
          className={cx(
            'select-ring bg-theme-400/10 ring-theme-500 absolute z-40 h-full w-full rounded ring-2 ring-inset',
            [currentDraftWidgetId === item.id ? 'block' : 'hidden'],
          )}
        ></div>
        <ElementComponent
          {...item.internal}
          {...getProperties(item.configuration)}
          className={cx(item.internal.className, className)}
        />
      </div>
    </div>
  );
};

export default Element;
