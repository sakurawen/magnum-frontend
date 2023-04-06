import cx from 'clsx';
import { MaterialSchema } from '@/schemas/material';
import { propertyType } from './consts';
import { alignClassName } from './consts';

type TitleProps = {
  text: string;
  align: 'left' | 'right' | 'center' | 'justify';
};

const TitleImpl = ({ text, align }: TitleProps) => {
  return (
    <div className="px-3 py-2">
      <h2
        className={cx(
          'mb-1 mt-3 min-h-[1em] whitespace-pre-wrap  text-2xl font-bold',
          alignClassName[align],
        )}
      >
        {text}
      </h2>
    </div>
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
      value: 'Lorem ipsum',
      type: propertyType.INPUT,
      text: '文本',
    },
    {
      key: 'align',
      value: 'left',
      type: propertyType.TEXT_ALIGN_HANDLE,
      text: '对齐方式',
    },
  ],
};

export default TitleImpl;
