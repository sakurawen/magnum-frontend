import { forwardRef, InputHTMLAttributes, isValidElement } from 'react';
import cx from 'clsx';
import { SIZE_CLASSNAMES } from '../consts';

export type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'placeholder' | 'disabled' | 'onChange' | 'value' | 'type'|"tabIndex"
> & {
  size?: ComponentSize;
  fill?: boolean;
  icon?: React.ReactElement;
};


export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { size, icon, className, fill, ...restProps } = props;
  const enableIcon = isValidElement(icon);
  return (
    <div
      className={cx('inline-flex  bg-theme-gray-2 rounded-md', {
        'w-full': fill,
      })}
    >
      {enableIcon && (
        <div className="flex pl-2 items-center justify-center">{icon}</div>
      )}
      <input
        {...restProps}
        className={cx(
          'outline-none bg-transparent  transition w-full rounded',
          'placeholder:text-theme-content-1/50',
          'disabled:cursor-not-allowed disabled:!',
          SIZE_CLASSNAMES[size],
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
