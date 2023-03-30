import { forwardRef, TextareaHTMLAttributes } from 'react';
import { CONTENT_SIZE_CLASSNAMES, ROUNDED_SIZE_CLASSNAMES } from '../consts';
import cx from 'clsx';

export type TextareaProps = Pick<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'rows' | 'className' | 'value' | 'placeholder' | 'tabIndex'
> & {
  size?: ComponentSize;
  className?: string;
  onChange: (val: string) => void;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      rows,
      placeholder,
      className,
      size = 'middle',
      value,
      onChange,
      ...restProps
    } = props;
    return (
      <div
        className={cx(
          'bg-theme-gray-2 ring-1 ring-gray-200',
          ROUNDED_SIZE_CLASSNAMES[size],
          CONTENT_SIZE_CLASSNAMES[size],
          className,
        )}
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          ref={ref}
          placeholder={placeholder}
          className={cx(
            'w-full block placeholder:text-theme-content-1/50 resize-none outline-none bg-transparent',
          )}
          rows={rows}
          {...restProps}
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
