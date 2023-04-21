import { Checkbox, CheckboxProps } from '@magnum/ui';

const CheckboxImpl = (
  props: Omit<CheckboxProps, 'onChange'> &
    App.WidgetControl & {
      description: string;
    },
) => {
  const { description, onControl, ...restProps } = props;
  const handleControl = (value: boolean) => {
    onControl?.(value);
  };
  return (
    <div className="px-3 py-2">
      <p className="inline-flex">
        <Checkbox {...restProps} onChange={handleControl} />
        <span className="text-theme-content-1/90 ml-1 text-sm">
          {description}
        </span>
      </p>
    </div>
  );
};

export default CheckboxImpl;
