import { Textarea, TextareaProps } from '@magnum/ui';
import { MaterialSchema } from '@/schemas/material';

const TextareaImpl = (
  props: TextareaProps & {
    label: string;
  },
) => {
  const { label, ...restProps } = props;
  return (
    <div>
      <span className="mb-1 inline-block text-sm text-theme-content-1/90">
        {label}
      </span>
      <Textarea {...restProps} />
    </div>
  );
};

export const TextareaWidgetConfig: MaterialSchema['item'] = {
  name: 'Textarea',
  text: '多行文本输入',
  componentType: TextareaImpl,
  internal: {
    tabIndex: -1,
  },
  config: [
    {
      key: 'size',
      value: 'large',
      type: 'string',
      text: '尺寸',
    },
    {
      key: 'placeholder',
      value: '随便写点什么吧...',
      type: 'string',
      text: '提示文本',
    },
    {
      key: 'label',
      value: '标签',
      type: 'string',
      text: '标签',
    },
    {
      key: 'rows',
      value: 4,
      type: 'number',
      text: '行数',
    },
  ],
};

export default TextareaImpl;
