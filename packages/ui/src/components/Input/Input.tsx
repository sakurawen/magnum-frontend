import { forwardRef, InputHTMLAttributes } from 'react';
import cx from 'classnames';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      className={cx(
        'outline-none  ring-1 text-sky-800 transition focus:ring-sky-500 focus:ring-2 ring-sky-200 w-full  rounded px-2 py-1.5  text-sm',
        'placeholder:text-gray-300',
        props.className,
      )}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';
Input.defaultProps = {
  placeholder: 'Input',
};

export default Input;
