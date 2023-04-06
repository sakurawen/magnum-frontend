import { forwardRef } from 'react';
import cx from 'clsx';
import { Icon } from '@iconify/react';

export type CheckboxProps = {
  value: boolean;
  className?: string;
  id?: string;
  onChange?: (value: boolean) => void;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
            'relative flex cursor-pointer items-center justify-center overflow-hidden   rounded ring-1 ring-inset transition ',
            [value ? 'ring-theme-1 bg-theme-1/10' : 'ring-gray-400'],
          )}
        >
          <Icon
            className={cx('text-theme-1 h-4 w-4  transition-all ', [
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
