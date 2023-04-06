import { MaterialSchema } from '@/schemas/material';
import { propertyType, sizeOptions } from './consts';
import cx from 'clsx';

type SpaceImplProps = {
  size: 'large' | 'middle' | 'small';
};
const SpaceImpl = ({ size }: SpaceImplProps) => {
  return (
    <div
      className={cx('border-b border-t border-dashed border-gray-200 px-2', {
        'py-2': size === 'small',
        'py-6': size === 'middle',
        'py-12': size === 'large',
      })}
    ></div>
  );
};

export const SpaceWidgetConfig: MaterialSchema['item'] = {
  name: 'Space',
  text: '间隙',
  componentType: SpaceImpl,
  internal: {},
  config: [
    {
      key: 'size',
      value: sizeOptions[1],
      type: propertyType.SELECT,
      options: sizeOptions,
      text: '尺寸',
    },
  ],
};

export default SpaceImpl;
