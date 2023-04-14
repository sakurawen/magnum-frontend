import * as React from 'react';
import { classed } from '@tw-classed/react';

const InternalInput = classed.input(
  'block w-full rounded shadow-sm bg-transparent outline-none transition focus:outline-none',
  'placeholder:text-theme-content-1/50',
  'disabled:! disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        large: 'p-3 text-base',
        middle: 'p-2 text-sm',
        small: 'p-1 text-xs',
      },
    },
  },
);

const InputWrap = classed.div(
  'bg-gray-blue-50 ring-gray-blue-100 inline-flex ring-1',
  {
    variants: {
      size: {
        large: 'rounded-md',
        middle: 'rounded-md',
        small: 'rounded',
      },
      fill: {
        true: 'w-full',
      },
    },
  },
);

export type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className' | 'placeholder' | 'disabled' | 'value' | 'type' | 'tabIndex'
> & {
  size?: ComponentSize;
  fill?: boolean;
  icon?: React.ReactElement;
  onChange: (val: string) => void;
};

/**
 * Input
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const {
      size = 'middle',
      icon,
      className,
      fill,
      onChange,
      ...restProps
    } = props;
    const enableIcon = React.isValidElement(icon);
    return (
      <InputWrap fill={fill} size={size}>
        {enableIcon && (
          <div className="flex items-center justify-center pl-2">{icon}</div>
        )}
        <InternalInput
          {...restProps}
          size={size}
          onChange={(e) => onChange(e.target.value)}
          className={props.className}
          ref={ref}
        />
      </InputWrap>
    );
  },
);

Input.displayName = 'Input';
Input.defaultProps = {
  placeholder: 'Input',
  size: 'middle',
};
