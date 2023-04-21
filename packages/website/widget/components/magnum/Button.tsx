import { Button, ButtonProps } from '@magnum/ui';

type ButtonImplProps = Omit<ButtonProps, 'onClick'> & App.WidgetControl;
export const ButtonImpl = (props: ButtonImplProps) => {
  const { onControl, ...restProps } = props;
  return (
    <div className="px-3 py-2">
      <Button className="p-2" {...restProps} onClick={(e) => onControl?.(e)} />
    </div>
  );
};

export default ButtonImpl;
