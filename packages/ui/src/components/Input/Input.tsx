import { forwardRef, InputHTMLAttributes, isValidElement } from 'react';
import cx from 'clsx';
export type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'placeholder' | 'disabled' | 'onChange' | 'value' | 'type'
> & {
  size?: 'large' | 'middle' | 'small';
  fill?: boolean;
  icon?: React.ReactElement;
};

const InputSizeStyle = {
  large: 'p-3 text-sm',
  middle: 'p-2 text-sm',
  small: 'p-1.5 text-xs',
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { size, icon, className, fill, ...restProps } = props;
  const enableIcon = isValidElement(icon);
  return (
    <div
      className={cx('inline-flex bg-theme-gray-2/90 rounded', {
        'w-full': fill,
      })}
    >
      {enableIcon && <div className="flex pl-2 items-center justify-center">{icon}</div>}
      <input
        {...restProps}
        className={cx(
          'outline-none bg-transparent  transition w-full rounded',
          'placeholder:text-theme-content-1/50',
          'disabled:cursor-not-allowed disabled:!',
          InputSizeStyle[size],
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

export default Input;
