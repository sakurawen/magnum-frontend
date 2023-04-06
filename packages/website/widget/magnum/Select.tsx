import { MaterialSchema } from '@/schemas/material';
import { Select } from '@magnum/ui';
import { propertyType, sizeOptions } from './consts';

type SelectImplProps<T = any> = {
  value: T;
  label: string;
  size: 'large' | 'middle' | 'small';
  onChange: (val: T) => any;
};
const SelectImpl = (props: SelectImplProps) => {
  const { value, onChange, label, size } = props;
  return (
    <div className="px-3 py-2">
      <span className="text-theme-content-1/90 mb-1 inline-block text-sm">
        {label}
      </span>
      <Select size={size} className="w-full" value={value} onChange={onChange}>
        <Select.Button>select</Select.Button>
        <Select.Options>
          <Select.Option value="option1">option1</Select.Option>
          <Select.Option value="option2">option2</Select.Option>
        </Select.Options>
      </Select>
    </div>
  );
};

export const SelectWidgetConfig: MaterialSchema['item'] = {
  name: 'Select',
  text: '下拉选择',
  componentType: SelectImpl,
  internal: {
    tabIndex: -1,
  },
  config: [
    {
      key: 'label',
      value: 'Select标签',
      type: propertyType.INPUT,
      text: '标签',
    },
    {
      key: 'size',
      value: sizeOptions[2],
      type: propertyType.SELECT,
      options: sizeOptions,
      text: '尺寸',
    },
    {
      key: 'options',
      value: [
        {
          label: 'option1',
          value: 'option1',
        },
        {
          label: 'option2',
          value: 'option2',
        },
      ],
      type: propertyType.OPTIONS_EDIT,
      text: '选项',
    },
  ],
};

export default SelectImpl;
