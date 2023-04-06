import { Input, InputProps } from '@magnum/ui';
import { MaterialSchema } from '@/schemas/material';
import { propertyType, sizeOptions } from './consts';

const InputImpl = (props: InputProps & { label: string }) => {
  const { label, ...restProps } = props;
  return (
    <div className="px-3 py-2">
      <label>
        <span className="text-theme-content-1/90 mb-1 inline-block text-sm">
          {label}
        </span>
        <Input {...restProps} />
      </label>
    </div>
  );
};

export const InputWidgetConfig: MaterialSchema['item'] = {
  name: 'Input',
  text: '文本输入框',
  componentType: InputImpl,
  internal: {
    fill: true,
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
      type: propertyType.INPUT,
      text: '提示文本',
    },
    {
      key: 'label',
      value: 'Input标签',
      type: propertyType.INPUT,
      text: '标签',
    },
  ],
};

export default InputImpl;
