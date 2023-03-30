import { MaterialSchema } from '@/schemas/material';
import { propertyType } from './consts';
import cx from 'clsx';

type ParagraphProps = {
  text: string;
  indent: boolean;
};

const ParagraphImpl = ({ text, indent }: ParagraphProps) => {
  return (
    <p
      className={cx('text-sm/6 whitespace-pre-wrap min-h-[1em] px-3 py-2', [
        indent && 'indent-8',
      ])}
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
      key: 'indent',
      value: false,
      text: '首行缩进',
      type: propertyType.CHECKBOX,
    },
  ],
};
export default ParagraphImpl;