import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import cx from 'clsx';

const ButtonVariantStyle = {
  primary:
    'bg-theme-1 hover:bg-theme-2 text-theme-3 text-gray-700 ring-inset ring-[1px] ring-theme-2/80',
  danger:
    'bg-red-100 hover:bg-red-200  text-red-500 ring-inset ring-[1px] ring-red-300/50',
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant,
      disabled,
      loading,
      children,
      onClick,
      size,
      ...restProps
    } = props;
    const disableButton = disabled || loading;
    const enableLoading = loading || false;
    return (
      <button
        {...restProps}
        onClick={onClick}
        disabled={disableButton}
        className={cx(
          'relative rounded transition transform  active:translate-y-[1px]',
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
          <Icon
            className="inline-block animate-spin w-4 h-4"
            icon="mdi:loading"
          />
        ) : (
          <span>{children}</span>
        )}
      </button>
    );
  },
);

Button.defaultProps = {
  variant: 'primary',
  children: 'button',
  loading: false,
  size: 'middle',
};

Button.displayName = 'Button';
