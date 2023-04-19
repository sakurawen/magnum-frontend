import { propertyType, WidgetSchema } from '../consts';

export const ParagraphSchema: WidgetSchema = {
  name: 'Paragraph',
  text: '文本段落',
  internal: {},
  config: [
    {
      key: 'text',
      value: `初めてのルーブルは,なんてことは ,なかったわ,私だけのモナリザ もうとっくに出会ってたから。初めてあなたを見た,あの日動き出した歯車 止められない喪失の予感, もういっぱいあるけれど もう一つ増やしましょう。`,
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
