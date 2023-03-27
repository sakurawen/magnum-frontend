import { useTrackedAppStore } from '@/store';
import { DraftElement } from '@/schemas/draft';
import cx from 'clsx';

type ElementProps = {
  item: DraftElement;
  className?: string;
};

const getProperties = (conf: DraftElement['configuration']) => {
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
      setCurrentDraftElementId,
      editor: { currentDraftElementId },
    },
  } = useTrackedAppStore();

  const handleSelectElementById = (id: string) => {
    setCurrentDraftElementId(id);
  };
  return (
    <div
      data-is-draft-item={true}
      className={cx('element px-2.5 py-2 ring-inset rounded', {
        'bg-theme-1/50 ring-2': currentDraftElementId === item.id,
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
