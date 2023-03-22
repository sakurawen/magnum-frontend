import { Checkbox, CheckboxProps } from '@magnum/ui';
const CheckboxImpl = (
  props: CheckboxProps & {
    description: string;
  },
) => {
  const { description, ...restProps } = props;
  return (
    <p className="inline-flex ">
      <Checkbox {...restProps} />
      <span className="ml-1 text-sm text-theme-content-1/90">
        {description}
      </span>
    </p>
  );
};
export default CheckboxImpl;
