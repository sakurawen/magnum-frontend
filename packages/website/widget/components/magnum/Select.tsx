import { Select } from '@magnum/ui';

type SelectImplProps<T = any> = {
  value: T;
  options: T[];
  label: string;
  size: 'large' | 'middle' | 'small';
  onChange: (val: T) => any;
};
const SelectImpl = (
  props: SelectImplProps<{
    text: string;
    value: any;
  }>,
) => {
  const { value, options, onChange, label, size } = props;
  return (
    <div className="px-3 py-2">
      <span className="text-theme-content-1/90 mb-1 inline-block text-sm">
        {label}
      </span>
      <Select size={size} className="w-full" value={value} onChange={onChange}>
        <Select.Button>select</Select.Button>
        <Select.Options>
          {options.map((option) => {
            return (
              <Select.Option key={option.value} value={option.value}>
                {option.text}
              </Select.Option>
            );
          })}
        </Select.Options>
      </Select>
    </div>
  );
};

export default SelectImpl;
