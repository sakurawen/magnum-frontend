import { propertyType, WidgetSchema } from '../consts';

export const TitleSchema: WidgetSchema = {
  name: 'Title',
  text: '文本标题',
  internal: {
    tabIndex: -1,
  },
  config: [
    {
      key: 'text',
      value: 'Lorem ipsum',
      type: propertyType.INPUT,
      text: '文本',
    },
    {
      key: 'align',
      value: 'left',
      type: propertyType.TEXT_ALIGN_HANDLE,
      text: '对齐方式',
    },
  ],
};
