'use client';
import { DraftWidget } from '@/schemas/draft';
import { useTrackedAppStore } from '@/store';
import { getFormComponentProperties } from '@/utils/form';
import * as MagnumImpl from '@/widget/components/magnum';
import cx from 'clsx';

type MagnumImplKeys = keyof typeof MagnumImpl;
type ElementProps = {
  item: DraftWidget;
  className?: string;
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

  const ElementComponent = MagnumImpl[
    item.name as MagnumImplKeys
  ] as React.ElementType;

  return (
    <div
      data-is-draft-item={true}
      className={cx('widget')}
      onClick={() => handleSelectElementById(item.id)}
    >
      <div className=" pointer-events-none relative select-none ring-inset">
        <div
          className={cx(
            'select-ring bg-theme-400/10 ring-theme-200 absolute z-40 h-full w-full rounded ring-2 ring-inset',
            [currentDraftWidgetId === item.id ? 'block' : 'hidden'],
          )}
        ></div>
        <ElementComponent
          {...item.internal}
          {...getFormComponentProperties(item.configuration)}
          className={cx(item.internal.className, className)}
        />
      </div>
    </div>
  );
};

export default Element;
