import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import cx from 'classnames';

const ButtonVariantStyle = {
  primary: 'bg-theme hover:bg-theme-deep active:bg-theme-black text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white',
  custom:""
};

const ButtonSizeStyle = {
  large: 'px-3 py-3 text-sm',
  middle: 'px-3 py-2 text-sm',
  small: 'px-2 py-1 text-xs',
};

interface ButtonProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'disabled' | 'onClick' | 'style'> {
  variant?: keyof typeof ButtonVariantStyle;
  size?: 'large' | 'middle' | 'small';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, disabled, loading, children, onClick, size, ...restProps } = props;
  const disableButton = disabled || loading;
  const enableLoading = loading || false;
  return (
    <button
      {...restProps}
      onClick={onClick}
      disabled={disableButton}
      className={cx(
        'relative transition rounded',
        [disableButton ? 'disabled:bg-gray-300 disabled:cursor-not-allowed' : ButtonVariantStyle[variant || 'primary']],
        ButtonSizeStyle[size],
        className,
      )}
      ref={ref}
    >
      {enableLoading ? (
        <Icon className="inline-block animate-spin w-4 h-4" icon="mdi:loading" />
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
});

Button.defaultProps = {
  variant: 'primary',
  children: 'button',
  loading: false,
  size: 'middle',
};

Button.displayName = 'Button';
export default Button;
