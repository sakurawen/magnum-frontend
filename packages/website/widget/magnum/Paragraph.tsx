import { MaterialSchema } from '@/schemas/material';
import { propertyType } from './consts';
import cx from 'clsx';
import { alignClassName } from './consts';

type ParagraphProps = {
  text: string;
  indent: boolean;
  align: 'left' | 'right' | 'center';
};

const ParagraphImpl = ({ text, indent, align }: ParagraphProps) => {
  return (
    <p
      className={cx(
        'text-sm/6 whitespace-pre-wrap min-h-[1em] px-3 py-2',
        alignClassName[align],
        [indent && 'indent-8'],
      )}
    >
      {text}
    </p>
  );
};

export const ParagraphWidgetConfig: MaterialSchema['item'] = {
  name: 'Paragraph',
  text: '文本段落',
  componentType: ParagraphImpl,
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
export default ParagraphImpl;
