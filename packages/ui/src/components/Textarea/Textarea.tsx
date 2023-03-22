import { forwardRef, TextareaHTMLAttributes } from 'react';
import { SIZE_CLASSNAMES } from '../size';
import cx from 'clsx';

export type TextareaProps = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'rows' | 'className' | 'value' | 'onChange' | 'placeholder'
> & {
  size?: ComponentSize;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { rows, placeholder, size, value, onChange } = props;
    return (
      <div className={cx('bg-theme-gray-2/90 rounded', SIZE_CLASSNAMES[size])}>
        <textarea
          value={value}
          onChange={onChange}
          ref={ref}
          placeholder={placeholder}
          className={cx(
            'w-full  placeholder:text-theme-content-1/50 resize-none outline-none bg-transparent',
          )}
          rows={rows}
        />
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
Textarea.defaultProps = {
  rows: 4,
  placeholder: 'Textarea',
  size: 'middle',
};
