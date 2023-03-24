import { useTrackedAppStore } from '@/store';
import { DraftElement } from '@/schemas/draft';
import cx from 'clsx';

type ElementProps = {
  item: DraftElement;
  className?: string;
};

const getProperties = (raw: Record<string, any>) => {
  const properties: Record<string, any> = {};
  for (let key in raw) {
    properties[key] = raw[key].value;
  }
  return properties;
};

const Element = (props: ElementProps) => {
  const { item, className } = props;
  const {
    app: {
      setCurrentDraftComponentId,
      editor: { currentDraftElementId },
    },
  } = useTrackedAppStore();

  const handleSelectElementById = (id: string) => {
    setCurrentDraftComponentId(id);
  };

  return (
    <div
      data-is-draft-item={true}
      className={cx('element p-2 ring-inset rounded', {
        'bg-theme-1/50 ring-2': currentDraftElementId === item.id,
      })}
      onClick={() => handleSelectElementById(item.id)}
    >
      <div className="pointer-events-none select-none ring-theme-2 ring-inset">
        <item.componentType
          {...item.internal}
          {...getProperties(item.configuration.properties)}
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
