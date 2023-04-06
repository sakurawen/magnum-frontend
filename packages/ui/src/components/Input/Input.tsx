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
        'bg-theme-gray-2 inline-flex ring-1 ring-gray-200',
        ROUNDED_SIZE_CLASSNAMES[size],
        {
          'w-full': fill,
        },
      )}
    >
      {enableIcon && (
        <div className="flex items-center justify-center pl-2">{icon}</div>
      )}
      <input
        {...restProps}
        onChange={(e) => onChange(e.target.value)}
        className={cx(
          'block w-full rounded bg-transparent outline-none transition focus:outline-none',
          'placeholder:text-theme-content-1/50',
          'disabled:! disabled:cursor-not-allowed',
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
