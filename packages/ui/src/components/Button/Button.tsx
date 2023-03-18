import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import cx from 'clsx';

const ButtonVariantStyle = {
  primary: 'bg-theme-main hover:bg-theme-deep text-white text-gray-700',
  danger: 'bg-red-500 hover:bg-red-600  text-red-200',
  custom: '',
};

const ButtonSizeStyle = {
  large: 'px-3 py-3 text-sm',
  middle: 'px-3 py-2 text-sm',
  small: 'px-2 py-1 text-xs',
};

export type ButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onClick' | 'style'
> & {
  variant?: keyof typeof ButtonVariantStyle;
  size?: 'large' | 'middle' | 'small';
  loading?: boolean;
};

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
        'relative rounded transform active:translate-y-[1px]',
        [
          disableButton
            ? 'disabled:bg-theme-gray-2 disabled:cursor-not-allowed'
            : ButtonVariantStyle[variant || 'primary'],
        ],
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
