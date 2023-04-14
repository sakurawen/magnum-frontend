import { propertyType, WidgetSchema } from "../consts";

export const ParagraphSchema:WidgetSchema= {
  name: 'Paragraph',
  text: '文本段落',
  internal: {},
  config: [
    {
      key: 'text',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ut aliquid, aperiam accusamus, adipisci ab, quod veniam illo reprehenderit nulla modi corporis perspiciatis. Deleniti totam architecto laborum perferendis laboriosam voluptas.',
      text: '文本',
      type: propertyType.TEXTAREA,
    },
    {
      key: 'align',
      value: 'left',
      type: propertyType.TEXT_ALIGN_HANDLE,
      text: '对齐方式',
    },
    {
      key: 'indent',
      value: false,
      text: '首行缩进',
      type: propertyType.CHECKBOX,
    },
  ],
};
