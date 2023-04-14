import { Select } from '@magnum/ui';

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



export default SelectImpl;
