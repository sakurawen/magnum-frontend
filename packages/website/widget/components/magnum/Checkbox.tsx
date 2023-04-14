import { Checkbox, CheckboxProps } from '@magnum/ui';

const CheckboxImpl = (
  props: CheckboxProps & {
    description: string;
  },
) => {
  const { description, ...restProps } = props;
  return (
    <div className="px-3 py-2">
      <p className="inline-flex">
        <Checkbox {...restProps} />
        <span className="text-theme-content-1/90 ml-1 text-sm">
          {description}
        </span>
      </p>
    </div>
  );
};

export default CheckboxImpl;
