import cx from 'clsx';
import { MaterialSchema } from '@/schemas/material';

type TitleProps = {
  text: string;
  align: 'left' | 'right' | 'center';
};

const alignClassName = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const TitleImpl = ({ text, align }: TitleProps) => {
  return (
    <h2
      className={cx(
        'text-2xl font-bold min-h-[1em]  mt-3 mb-1',
        alignClassName[align],
      )}
    >
      {text}
    </h2>
  );
};

export const TitleWidgetConfig: MaterialSchema['item'] = {
  name: 'Title',
  text: '文本标题',
  componentType: TitleImpl,
  internal: {
    tabIndex: -1,
  },
  config: [
    {
      key: 'text',
      value: '肉食者鄙，未能远谋。',
      type: 'string',
      text: '文本',
    },
    {
      key: 'align',
      value: 'left',
      type: 'string',
      text: '对齐方式',
    },
  ],
};

export default TitleImpl;
