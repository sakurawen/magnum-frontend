import cx from 'clsx';
import * as React from 'react';
import { CONTENT_SIZE_CLASSNAMES, ROUNDED_SIZE_CLASSNAMES } from '../consts';
import { classed } from '@tw-classed/react';

const InternalTextarea = classed.textarea(
  'placeholder:text-theme-content-1/50 block w-full resize-none bg-transparent outline-none focus:outline-none',
);

const TextareaWrap = classed.div(
  'bg-gray-blue-50  shadow-sm ring-gray-blue-100 ring-1',
  {
    variants: {
      size: {
        large: 'p-3 text-base rounded-md',
        middle: 'p-2 text-sm rounded-md',
        small: 'p-1 text-xs rounded',
      },
    },
  },
);

export type TextareaProps = Pick<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'rows' | 'className' | 'value' | 'placeholder' | 'tabIndex'
> & {
  size?: ComponentSize;
  className?: string;
  onChange: (val: string) => void;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { className, size = 'middle', value, onChange, ...restProps } = props;
    return (
      <TextareaWrap size={size} className={className}>
        <InternalTextarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...restProps}
          ref={ref}
        />
      </TextareaWrap>
    );
  },
);

Textarea.displayName = 'Textarea';
Textarea.defaultProps = {
  rows: 4,
  placeholder: 'Textarea',
  size: 'middle',
};
