import { Icon } from '@iconify/react';
import cx from 'clsx';
type TextAlignHandlerProps = {
  value: 'left' | 'right' | 'center';
  onChange: (val: 'left' | 'center' | 'right') => void;
};
const TextAlignHandler = (props: TextAlignHandlerProps) => {
  const { value, onChange } = props;
  const isLeft = value === 'left';
  const isCenter = value === 'center';
  const isRight = value === 'right';

  return (
    <div className="flex items-center space-x-2">
      <div
        onClick={() => onChange('left')}
        className={cx(
          'p-1 hover:bg-theme-gray-2 rounded',
          isLeft && 'bg-theme-gray-2',
        )}
      >
        <Icon className="w-5 h-5" icon="radix-icons:text-align-left" />
      </div>
      <div
        onClick={() => onChange('center')}
        className={cx(
          'p-1 hover:bg-theme-gray-2 rounded',
          isCenter && 'bg-theme-gray-2',
        )}
      >
        <Icon className="w-5 h-5" icon="radix-icons:text-align-center" />
      </div>
      <div
        onClick={() => onChange('right')}
        className={cx(
          'p-1 hover:bg-theme-gray-2 rounded',
          isRight && 'bg-theme-gray-2',
        )}
      >
        <Icon className="w-5 h-5" icon="radix-icons:text-align-right" />
      </div>
    </div>
  );
};

export default TextAlignHandler;
