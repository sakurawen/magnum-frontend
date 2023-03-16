import { forwardRef, InputHTMLAttributes } from 'react';
import cx from 'classnames';
interface InputProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'className' | 'placeholder' | 'disabled' | 'onChange' | 'value' | 'type'
  > {
  size?: 'large' | 'middle' | 'small';
}

const InputSizeStyle = {
  large: 'p-3 text-sm',
  middle: 'p-2 text-sm',
  small: 'p-1.5 text-xs',
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { size, className, ...restProps } = props;
  return (
    <input
      {...restProps}
      className={cx(
        'outline-none  bg-gray-100  transition w-full rounded',
        'placeholder:text-gray-400',
        'disabled:cursor-not-allowed disabled:!bg-gray-200',
        InputSizeStyle[size],
        props.className,
      )}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';
Input.defaultProps = {
  placeholder: 'Input',
  size: 'middle',
};

export default Input;
