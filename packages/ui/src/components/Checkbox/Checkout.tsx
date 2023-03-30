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
          'inline-flex items-center  rounded overflow-hidden',
          className,
        )}
      >
        <span
          className={cx(
            'relative overflow-hidden cursor-pointer rounded ring-1 ring-inset   flex transition items-center justify-center ',
            [value ? 'ring-theme-1 bg-theme-1/10' : 'ring-gray-400'],
          )}
        >
          <Icon
            className={cx('w-4 h-4 text-theme-1  transition ', [
              value
                ? 'visible opacity-100 translate-y-0'
                : 'opacity-0 invisible translate-y-1',
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
