import { Icon } from '@iconify/react';
import cx from 'clsx';
import * as React from 'react';

export type CheckboxProps = {
  value: boolean;
  className?: string;
  id?: string;
  onChange?: (value: boolean) => void;
};

/**
 * Checkbox
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { value, id, className, onChange } = props;
    return (
      <label
        className={cx(
          'inline-flex items-center  overflow-hidden rounded',
          className,
        )}
      >
        <span
          className={cx(
            'relative flex cursor-pointer items-center justify-center overflow-hidden rounded ring-1 ring-inset transition ',
            [value ? 'ring-theme-200 bg-theme-500/10' : 'ring-gray-blue-400'],
          )}
        >
          <Icon
            className={cx('h-4 w-4 text-gray-800  transition-all ', [
              value
                ? 'visible translate-y-0 opacity-100'
                : 'invisible translate-y-1 opacity-0',
            ])}
            icon="radix-icons:check"
          />
          <input
            id={id}
            className="hidden"
            checked={value}
            onChange={(e) => onChange?.(e.target.checked)}
            type="checkbox"
          />
        </span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
