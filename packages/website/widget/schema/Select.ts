import { propertyType, sizeOptions, WidgetSchema } from '../consts';

export const SelectSchema: WidgetSchema = {
  name: 'Select',
  text: '下拉选择',
  internal: {
    tabIndex: -1,
  },
  config: [
    {
      key: 'label',
      value: 'Select标签',
      type: propertyType.INPUT,
      text: '标签',
    },
    {
      key: 'size',
      value: sizeOptions[2],
      type: propertyType.SELECT,
      options: sizeOptions,
      text: '尺寸',
    },
    {
      key: 'options',
      value: [
        {
          text: 'option1',
          value: 'option1',
        },
        {
          text: 'option2',
          value: 'option2',
        },
      ],
      type: propertyType.OPTIONS_EDIT,
      text: '选项',
    },
  ],
};
