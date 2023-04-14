import { propertyType, WidgetSchema } from '../consts';

export const ImageSchema: WidgetSchema = {
  name: 'Image',
  text: '图片',
  internal: {},
  config: [
    {
      key: 'source',
      value: '',
      type: propertyType.INPUT,
      text: '资源路径',
    },
    {
      key: 'fill',
      value: false,
      type: propertyType.CHECKBOX,
      text: '填充间隙',
    },
  ],
};

export default ImageSchema;
