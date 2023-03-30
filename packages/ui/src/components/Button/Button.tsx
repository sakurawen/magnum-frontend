import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import cx from 'clsx';
import { SIZE_CLASSNAMES, ROUNDED_SIZE_CLASSNAMES } from '../consts';

const ButtonVariantStyle = {
  primary: 'bg-theme-1 hover:bg-theme-2  active:bg-theme-3 text-white',
  danger: 'bg-red-500 hover:bg-red-600  active:bg-red-700 text-white',
  custom: '',
};

export type ButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onClick' | 'style'
> & {
  variant?: keyof typeof ButtonVariantStyle;
  size?: ComponentSize;
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
      size = 'middle',
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
          'relative transition select-none  min-h-[1em]',
          SIZE_CLASSNAMES[size],
          ROUNDED_SIZE_CLASSNAMES[size],
          [
            disableButton
              ? 'disabled:bg-theme-gray-2 disabled:cursor-not-allowed'
              : ButtonVariantStyle[variant || 'primary'],
          ],
          className,
        )}
        ref={ref}
      >
        {enableLoading ? (
          <Icon
            className="inline-block animate-spin w-4 h-4"
            icon="radix-icons:reload"
          />
        ) : (
          children
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
