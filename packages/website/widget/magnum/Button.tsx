import { MaterialSchema } from '@/schemas/material';
import { Button, ButtonProps } from '@magnum/ui';
import { propertyType, sizeOptions } from './consts';

const ButtonImpl = (props: ButtonProps) => {
  return (
    <div className="px-3 py-2">
      <Button className="p-2" {...props} />
    </div>
  );
};

export const ButtonWidgetConfig: MaterialSchema['item'] = {
  name: 'Button',
  text: '按钮',
  componentType: ButtonImpl,
  internal: {
    className: 'w-full',
    tabIndex: -1,
  },
  config: [
    {
      key: 'size',
      text: '尺寸',
      value: sizeOptions[2],
      type: propertyType.SELECT,
      options: sizeOptions,
    },
    {
      key: 'children',
      text: '文本',
      value: '提 交',
      type: propertyType.INPUT,
    },
    {
      key: 'variant',
      text: '变体',
      value: 'primary',
      type: propertyType.INPUT,
    },
  ],
};

export default ButtonImpl;
