import { propertyType, sizeOptions, WidgetSchema } from '../consts';

export const InputSchema: WidgetSchema = {
  name: 'Input',
  text: '文本输入框',
  internal: {
    fill: true,
    tabIndex: -1,
  },
  config: [
    {
      key: 'size',
      value: sizeOptions[2],
      type: propertyType.SELECT,
      text: '尺寸',
      options: sizeOptions,
    },
    {
      key: 'placeholder',
      value: '随便写点什么吧...',
      type: propertyType.INPUT,
      text: '提示文本',
    },
    {
      key: 'label',
      value: 'Input标签',
      type: propertyType.INPUT,
      text: '标签',
    },
  ],
};
