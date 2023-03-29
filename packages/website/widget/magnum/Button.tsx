import { Button, ButtonProps } from '@magnum/ui';
import { MaterialSchema } from '@/schemas/material';

const ButtonImpl = (props: ButtonProps) => {
  return <Button className="p-2" {...props} />;
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
      value: 'large',
      type: 'string',
    },
    {
      key: 'children',
      text: '文本',
      value: '提 交',
      type: 'string',
    },
    {
      key: 'variant',
      text: '变体',
      value: 'primary',
      type: 'string',
    },
  ],
};

export default ButtonImpl;
