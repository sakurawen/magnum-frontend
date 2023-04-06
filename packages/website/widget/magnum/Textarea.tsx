import { Textarea, TextareaProps } from '@magnum/ui';
import { MaterialSchema } from '@/schemas/material';
import { propertyType, sizeOptions } from './consts';

const TextareaImpl = (
  props: TextareaProps & {
    label: string;
  },
) => {
  const { label, ...restProps } = props;
  console.log();
  return (
    <div className="px-3 py-2">
      <span className="text-theme-content-1/90 mb-1 inline-block text-sm">
        {label}
      </span>
      <Textarea {...restProps} />
    </div>
  );
};

export const TextareaWidgetConfig: MaterialSchema['item'] = {
  name: 'Textarea',
  text: '文本输入块',
  componentType: TextareaImpl,
  internal: {
    tabIndex: -1,
  },
  config: [
    {
      key: 'size',
      value: sizeOptions[2],
      type: propertyType.SELECT,
      text: '尺寸',
      options: sizeOptions,
    },
    {
      key: 'placeholder',
      value: '随便写点什么吧...',
      type: propertyType.TEXTAREA,
      text: '提示文本',
    },
    {
      key: 'label',
      value: 'Textarea标签',
      type: propertyType.INPUT,
      text: '标签',
    },
    {
      key: 'rows',
      value: 4,
      type: propertyType.INPUT,
      text: '行数',
    },
  ],
};

export default TextareaImpl;
