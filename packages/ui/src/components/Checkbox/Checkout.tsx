import { forwardRef } from 'react';
import cx from 'clsx';
import { Icon } from '@iconify/react';

export type CheckboxProps = {
  checked: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const { checked, className, onChange } = props;
    return (
      <label
        className={cx(
          'inline-flex items-center  rounded overflow-hidden',
          className,
        )}
      >
        <span
          className={cx(
            'relative overflow-hidden cursor-pointer rounded ring-[1px] ring-inset  ring-theme-2 bg-theme-1 flex transition items-center justify-center ',
          )}
        >
          <Icon
            className={cx('w-4 h-4 text-theme-3  transition ', [
              checked
                ? 'visible opacity-100 translate-y-0'
                : 'opacity-0 invisible translate-y-1',
            ])}
            icon="radix-icons:check"
          />
          <input
            className="hidden"
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            type="checkbox"
          />
        </span>
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
