import cx from 'clsx';
import { MaterialSchema } from '@/schemas/material';
import { propertyType } from './consts';

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
    <div className='px-3 py-2'>
      <h2
        className={cx(
          'text-2xl whitespace-pre-wrap font-bold min-h-[1em]  mt-3 mb-1',
          alignClassName[align],
        )}
      >
        {text}
      </h2>
    </div>
  );
};

const alignOptions = [
  {
    text: '左对齐',
    value: 'left',
  },
  {
    text: '居中对齐',
    value: 'center',
  },
  {
    text: '右对齐',
    value: 'right',
  },
];

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
      value: 'Lorem ipsum',
      type: propertyType.INPUT,
      text: '文本',
    },
    {
      key: 'align',
      value: alignOptions[0],
      type: propertyType.SELECT,
      text: '对齐方式',
      options: alignOptions,
    },
  ],
};

export default TitleImpl;
