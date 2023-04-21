import { Icon } from '@iconify/react';
import cx from 'clsx';
import * as React from 'react';
import { CONTENT_SIZE_CLASSNAMES, ROUNDED_SIZE_CLASSNAMES } from '../consts';
import { createContext } from '../../utils/context';

export type SelectProps<T = any> = React.PropsWithChildren<{
  size?: ComponentSize;
  disabled?: boolean;
  value: T;
  onChange(val: T): void;
  className?: string;
}>;
const [SelectOpenCloseProvider, useSelectOpenCloseContext] = createContext<{
  open: boolean;
  onOpenChange: (val: boolean | ((val: boolean) => boolean)) => void;
}>('SelectOpenCloseContext');
const [SelectValueProvider, useSelectContext] = createContext<{
  size: ComponentSize;
  value: any;
  disabled?: boolean;
  onChange: (val: any) => void;
}>('SelectValueContext');

/**
 * Select Root
 * @param props
 * @returns
 */
export const Select = (props: SelectProps) => {
  const {
    children,
    size = 'middle',
    disabled,
    value,
    className,
    onChange,
  } = props;

  const [open, setOpen] = React.useState(false);

  const selectContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleCloseSelectOption = (e: MouseEvent) => {
      if (selectContainerRef.current!.contains(e.target as HTMLElement)) return;
      setOpen(false);
    };
    document.addEventListener('click', handleCloseSelectOption);
    return () => {
      document.removeEventListener('click', handleCloseSelectOption);
    };
  }, []);

  return (
    <SelectOpenCloseProvider open={open} onOpenChange={setOpen}>
      <SelectValueProvider
        size={size}
        disabled={disabled}
        onChange={onChange}
        value={value}
      >
        <div
          ref={selectContainerRef}
          role="listbox"
          className={cx('relative z-10 inline-block text-left', className)}
        >
          {children}
        </div>
      </SelectValueProvider>
    </SelectOpenCloseProvider>
  );
};

export type SelectButtonProps = React.PropsWithChildren<{
  className?: string;
}>;

/**
 * Select Button
 * @param props
 * @returns
 */
export const SelectButton = (props: SelectButtonProps) => {
  const { onOpenChange, open } = useSelectOpenCloseContext();
  const { size = 'middle', disabled } = useSelectContext();
  const { children, className } = props;
  const handleToggleListOpen = () => {
    if (!open && disabled) return;
    onOpenChange((open) => !open);
  };
  return (
    <button
      className={cx(
        'bg-gray-blue-50 ring-gray-blue-100 flex w-full items-center justify-between shadow-sm ring-1',
        CONTENT_SIZE_CLASSNAMES[size],
        ROUNDED_SIZE_CLASSNAMES[size],
        className,
      )}
      onClick={handleToggleListOpen}
    >
      <span>{children}</span>
      <Icon className="h-5 w-5" icon="radix-icons:caret-sort" />
    </button>
  );
};

export type SelectOptionProps<T = any> = React.PropsWithChildren<{
  value: T;
}>;

const OPTION_SIZE = {
  small: 'p-1',
  middle: 'p-2',
  large: 'p-3',
};

/**
 * Select Option
 * @param props
 * @returns
 */
export const SelectOption = (props: SelectOptionProps) => {
  const { children, value } = props;
  const { onOpenChange } = useSelectOpenCloseContext();

  const { size = 'middle', value: current, onChange } = useSelectContext();

  const handleSelect = () => {
    onChange(value);
    onOpenChange(false);
  };

  const isActive = value === current;

  return (
    <div
      role="listitem"
      onClick={handleSelect}
      className={cx(
        ' hover:bg-gray-blue-50',
        [isActive ? 'bg-gray-blue-50' : ''],
        OPTION_SIZE[size],
      )}
    >
      {children}
    </div>
  );
};

export type SelectOptionsProps = React.PropsWithChildren<{}>;

/**
 * Select Options
 * @param props
 * @returns
 */
export const SelectOptions = (props: SelectOptionsProps) => {
  const { children } = props;
  const { open } = useSelectOpenCloseContext();
  return (
    <div
      className={cx(
        'ring-gray-blue-100 absolute z-40 mt-2 min-w-full origin-top transform rounded bg-white shadow-md ring-1 transition-all',
        [
          open
            ? 'visible scale-y-100 opacity-100'
            : 'invisible scale-y-95 opacity-0',
        ],
      )}
    >
      {children}
    </div>
  );
};

Select.Options = SelectOptions;
Select.Option = SelectOption;
Select.Button = SelectButton;

export default Select;
