import { propertyType, WidgetSchema } from "../consts";

export const VideoSchema: WidgetSchema = {
  name: 'Video',
  text: '视频',
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
