import { Select } from '@magnum/ui';

type SelectImplProps<T = any> = {
  value: T;
  options: T[];
  label: string;
  size: 'large' | 'middle' | 'small';
  disabled?: boolean;
} & App.WidgetControl;
const SelectImpl = (
  props: SelectImplProps<{
    text: string;
    value: any;
  }>,
) => {
  const { value, options, disabled, onControl, label, size } = props;
  return (
    <div className="px-3 py-2">
      <span className="text-theme-content-1/90 mb-1 inline-block text-sm">
        {label}
      </span>
      <Select
        disabled={disabled}
        size={size}
        className="w-full"
        value={value}
        onChange={(val) => {
          onControl?.(val);
        }}
      >
        <Select.Button>{value?.text}</Select.Button>
        <Select.Options>
          {options.map((option) => {
            return (
              <Select.Option key={option.value} value={option}>
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
