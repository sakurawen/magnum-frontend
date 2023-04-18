import { propertyType, sizeOptions, WidgetSchema } from '../consts';

export const TextareaSchema: WidgetSchema = {
  name: 'Textarea',
  text: '文本输入块',
  internal: {
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
      value: 'Textarea Placeholder',
      type: propertyType.TEXTAREA,
      text: '提示文本',
    },
    {
      key: 'label',
      value: 'Textarea标签',
      type: propertyType.INPUT,
      text: '标签',
    },
    {
      key: 'rows',
      value: 4,
      type: propertyType.INPUT,
      text: '行数',
    },
  ],
};
