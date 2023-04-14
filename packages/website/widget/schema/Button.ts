import { WidgetSchema, propertyType, sizeOptions } from '../consts';

export const ButtonSchema: WidgetSchema = {
  name: 'Button',
  text: '按钮',
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
