import { propertyType, sizeOptions, WidgetSchema } from '../consts';

export const SpaceSchema: WidgetSchema = {
  name: 'Space',
  text: '间隙',
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
