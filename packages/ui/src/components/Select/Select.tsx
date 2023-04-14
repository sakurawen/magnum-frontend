import { Icon } from '@iconify/react';
import cx from 'clsx';
import * as React from 'react';
import { useEvent } from '../../hooks/use-event';
import { CONTENT_SIZE_CLASSNAMES, ROUNDED_SIZE_CLASSNAMES } from '../consts';
import {
  ACTIONS,
  SelectContext,
  SelectContextAction,
  SelectContextValue,
  SelectOpenCloseContext,
} from './context';

export type SelectProps<T = any> = React.PropsWithChildren<{
  size?: ComponentSize;
  value: T;
  onChange(val: T): void;
  className?: string;
}>;

/**
 * Select Root
 * @param props
 * @returns
 */
export const Select = (props: SelectProps) => {
  const { children, size = 'middle', className, onChange } = props;

  const openClose = React.useState(false);

  const optionChange = useEvent((val) => onChange(val));

  const reducer = React.useReducer<
    React.Reducer<SelectContextValue, SelectContextAction>
  >(
    (state, action) => {
      switch (action.type) {
        case ACTIONS.UPDATE_SIZE:
          return {
            ...state,
            size: action.data,
          };
        case ACTIONS.OPTION_SELECT:
          return {
            ...state,
            value: action.data,
          };
        default:
          return { ...state };
      }
    },
    {
      size,
      onChange: optionChange,
    },
  );

  React.useEffect(() => {
    reducer[1]({
      type: ACTIONS.UPDATE_SIZE,
      data: size,
    });
  }, [size]);

  const selectContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleCloseSelectOption = (e: MouseEvent) => {
      if (selectContainerRef.current!.contains(e.target as HTMLElement)) return;
      openClose[1](false);
    };
    document.addEventListener('click', handleCloseSelectOption);
    return () => {
      document.removeEventListener('click', handleCloseSelectOption);
    };
  }, []);

  return (
    <SelectOpenCloseContext.Provider value={openClose}>
      <SelectContext.Provider value={reducer}>
        <div
          ref={selectContainerRef}
          role="listbox"
          className={cx('relative z-10 inline-block text-left', className)}
        >
          {children}
        </div>
      </SelectContext.Provider>
    </SelectOpenCloseContext.Provider>
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
  const [value] = React.useContext(SelectContext)!;
  const { size = 'middle' } = value;
  const [, setOpen] = React.useContext(SelectOpenCloseContext)!;
  const { children, className } = props;
  return (
    <button
      className={cx(
        'bg-gray-blue-50 w-full shadow-sm ring-gray-blue-100 flex items-center justify-between ring-1',
        CONTENT_SIZE_CLASSNAMES[size],
        ROUNDED_SIZE_CLASSNAMES[size],
        className,
      )}
      onClick={() => setOpen((open) => !open)}
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
  const [, setOpen] = React.useContext(SelectOpenCloseContext)!;
  const [{ size = 'middle', value: current, onChange }, dispatch] =
    React.useContext(SelectContext)!;

  const handleSelect = () => {
    onChange(value);
    dispatch({
      type: ACTIONS.OPTION_SELECT,
      data: value,
    });
    setOpen(false);
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
  const [open] = React.useContext(SelectOpenCloseContext)!;
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
