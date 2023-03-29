import { Input, InputProps } from '@magnum/ui';
import { MaterialSchema } from '@/schemas/material';

const InputImpl = (
  props: InputProps & { label: string; sortHandler?: React.ReactElement },
) => {
  const { label, ...restProps } = props;
  return (
    <div>
      <label>
        <span className="mb-1 inline-block text-sm text-theme-content-1/90">
          {label}
        </span>
        <Input {...restProps} />
      </label>
    </div>
  );
};

export const InputWidgetConfig: MaterialSchema['item'] = {
  name: 'Input',
  text: '文本输入',
  componentType: InputImpl,
  internal: {
    fill: true,
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
  ],
};

export default InputImpl;
