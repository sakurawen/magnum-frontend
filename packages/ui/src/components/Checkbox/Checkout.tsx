import { forwardRef } from 'react';
import cx from 'classnames';
import { Icon } from '@iconify/react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { checked, onChange } = props;
  return (
    <label className="inline-flex items-center justify-center">
      <span
        className={cx(
          'relative overflow-hidden cursor-pointer rounded flex transition items-center justify-center  w-4 h-4 border border-gray-300 mr-1',
          [checked ? 'border-theme-black' : 'border-gray-300'],
        )}
      >
        <Icon
          className={cx('w-4 h-4 text-theme-black   transition ', [
            checked ? 'visible opacity-100 translate-y-0' : 'opacity-0 invisible translate-y-1',
          ])}
          icon="mdi:check"
        />
        <input className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} type="checkbox" />
      </span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
