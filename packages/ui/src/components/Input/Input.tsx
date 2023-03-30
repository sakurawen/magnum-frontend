import { forwardRef, InputHTMLAttributes, isValidElement } from 'react';
import cx from 'clsx';
import { CONTENT_SIZE_CLASSNAMES, ROUNDED_SIZE_CLASSNAMES } from '../consts';

export type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'placeholder' | 'disabled' | 'value' | 'type' | 'tabIndex'
> & {
  size?: ComponentSize;
  fill?: boolean;
  icon?: React.ReactElement;
  onChange: (val: string) => void;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    size = 'middle',
    icon,
    className,
    fill,
    onChange,
    ...restProps
  } = props;
  const enableIcon = isValidElement(icon);
  return (
    <div
      className={cx(
        'inline-flex ring-1 ring-gray-200 bg-theme-gray-2',
        ROUNDED_SIZE_CLASSNAMES[size],
        {
          'w-full': fill,
        },
      )}
    >
      {enableIcon && (
        <div className="flex pl-2 items-center justify-center">{icon}</div>
      )}
      <input
        {...restProps}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          'outline-none bg-transparent block transition w-full rounded',
          'placeholder:text-theme-content-1/50',
          'disabled:cursor-not-allowed disabled:!',
          CONTENT_SIZE_CLASSNAMES[size],
          props.className,
        )}
        ref={ref}
      />
    </div>
  );
});

Input.displayName = 'Input';
Input.defaultProps = {
  placeholder: 'Input',
  size: 'middle',
};
