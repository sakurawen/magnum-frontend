import { forwardRef, HTMLAttributes } from 'react';
import cx from 'classnames';

const ButtonVariantStyle = {
  primary: 'bg-sky-500 hover:bg-sky-600 active:bg-sky-800 text-white',
  danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white',
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof ButtonVariantStyle;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant } = props;
  return (
    <button
      {...props}
      className={cx('px-1.5 py-2 transition rounded  text-sm', ButtonVariantStyle[variant || 'primary'], className)}
      ref={ref}
    />
  );
});

Button.defaultProps = {
  variant: 'primary',
  children: 'button',
};

Button.displayName = 'Button';
export default Button;
