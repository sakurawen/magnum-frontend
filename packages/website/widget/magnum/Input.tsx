import { Input, InputProps } from '@magnum/ui';

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

export default InputImpl;
