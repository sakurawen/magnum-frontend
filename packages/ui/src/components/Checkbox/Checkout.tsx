import { forwardRef } from 'react';
import cx from 'clsx';
import { Icon } from '@iconify/react';

export type CheckboxProps = {
  checked: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { checked, className, onChange } = props;
  return (
    <label className={cx('inline-flex items-center rounded overflow-hidden', className)}>
      <span
        className={cx(
          'relative overflow-hidden cursor-pointer rounded bg-white/90 flex transition items-center justify-center  border',
          [checked ? 'border-theme-main' : 'border-light'],
        )}
      >
        <Icon
          className={cx('w-4 h-4 text-theme-deep  transition ', [
            checked ? 'visible opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-1',
          ])}
          icon="material-symbols:done"
        />
        <input className="hidden" checked={checked} onChange={(e) => onChange?.(e.target.checked)} type="checkbox" />
      </span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
