import { Icon } from '@iconify/react';
import cx from 'clsx';
type TextAlignHandlerProps = {
  value: 'left' | 'right' | 'center' | 'justify';
  onChange: (val: 'left' | 'center' | 'right' | 'justify') => void;
};
const TextAlignHandler = (props: TextAlignHandlerProps) => {
  const { value, onChange } = props;
  const isLeft = value === 'left';
  const isCenter = value === 'center';
  const isRight = value === 'right';
  const isJustify = value === 'justify';

  return (
    <div className="flex items-center space-x-2">
      <div
        onClick={() => onChange('left')}
        className={cx(
          'hover:bg-gray-blue-50   rounded p-1',
          isLeft && 'bg-gray-blue-50  ',
        )}
      >
        <Icon className="h-5 w-5" icon="radix-icons:text-align-left" />
      </div>
      <div
        onClick={() => onChange('center')}
        className={cx(
          'hover:bg-gray-blue-50   rounded p-1',
          isCenter && 'bg-gray-blue-50  ',
        )}
      >
        <Icon className="h-5 w-5" icon="radix-icons:text-align-center" />
      </div>
      <div
        onClick={() => onChange('right')}
        className={cx(
          'hover:bg-gray-blue-50   rounded p-1',
          isRight && 'bg-gray-blue-50  ',
        )}
      >
        <Icon className="h-5 w-5" icon="radix-icons:text-align-right" />
      </div>
      <div
        onClick={() => onChange('justify')}
        className={cx(
          'hover:bg-gray-blue-50   rounded p-1',
          isJustify && 'bg-gray-blue-50  ',
        )}
      >
        <Icon className="h-5 w-5" icon="radix-icons:text-align-justify" />
      </div>
    </div>
  );
};

export default TextAlignHandler;
