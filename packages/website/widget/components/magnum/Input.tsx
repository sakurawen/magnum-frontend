import { Input, InputProps } from '@magnum/ui';

const InputImpl = (
  props: Omit<InputProps, 'onChange'> & { label: string } & App.WidgetControl,
) => {
  const { label, onControl, ...restProps } = props;
  return (
    <div className="px-3 py-2">
      <label>
        <span className="text-theme-content-1/90 mb-1 inline-block text-sm">
          {label}
        </span>
        <Input fill {...restProps} onChange={(val) => onControl?.(val)} />
      </label>
    </div>
  );
};

export default InputImpl;
