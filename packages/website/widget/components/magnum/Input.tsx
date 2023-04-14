import { Input, InputProps } from '@magnum/ui';

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



export default InputImpl;
