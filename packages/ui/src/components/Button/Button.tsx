import * as React from 'react';
import { Icon } from '@iconify/react';
import { classed, VariantProps } from '@tw-classed/react';

const InternalButton = classed.button(
  'relative min-h-[1em] select-none transition',
  'disabled:bg-gray-blue-200 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        large: 'px-6 py-3 text-base rounded-md',
        middle: 'px-4 py-2 text-sm rounded-md',
        small: 'px-3 py-1 text-xs rounded',
      },
      variant: {
        primary:
          'bg-theme-500 hover:bg-theme-600  active:bg-theme-800 text-white',
        danger: 'bg-red-500 hover:bg-red-600  active:bg-red-700 text-white',
        gray: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-blue-200 text-black',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'middle',
    },
  },
);

type InternalButtonVariantProps = VariantProps<typeof InternalButton>;

export type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'className' | 'disabled' | 'onClick' | 'style'
> &
  InternalButtonVariantProps & {
    loading?: boolean;
  };

/**
 * Button
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { disabled, loading, children, onClick, ...restProps } = props;
    const disableButton = disabled || loading;
    const enableLoading = loading || false;
    return (
      <div>
        <InternalButton
          {...restProps}
          ref={ref}
          onClick={onClick}
          disabled={disableButton}
        >
          {enableLoading ? (
            <Icon
              className="inline-block h-4 w-4 animate-spin"
              icon="radix-icons:reload"
            />
          ) : (
            children
          )}
        </InternalButton>
      </div>
    );
  },
);

Button.defaultProps = {
  children: 'button',
  loading: false,
};

Button.displayName = 'Button';
