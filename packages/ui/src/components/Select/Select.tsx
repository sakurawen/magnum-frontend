import { SelectOption } from './Option';
import { SelectButton } from './Button';
import { SelectOptions } from './Options';
import cx from 'clsx';
import {
  ReactNode,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  SelectContext,
  SelectContextValue,
  SelectContextAction,
  SelectOpenCloseContext,
  ACTIONS,
} from './context';
import { useEvent } from '../../hooks/use-event';

export type SelectProps<T = any> = {
  size?: ComponentSize;
  value: T;
  onChange(val: T): void;
  className?: string;
  children?: React.ReactNode | ReactNode[];
};

export const Select = (props: SelectProps) => {
  const { children, size = 'middle', className, onChange } = props;

  const openClose = useState(false);

  const optionChange = useEvent((val) => onChange(val));

  const reducer = useReducer<Reducer<SelectContextValue, SelectContextAction>>(
    (state, action) => {
      switch (action.type) {
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

  const selectContainerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleCloseSelectOption = (e: MouseEvent) => {
      if (selectContainerRef.current.contains(e.target as HTMLElement)) return;
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
        <button
          ref={selectContainerRef}
          role="listbox"
          className={cx('text-left inline-block z-10 relative', className)}
        >
          {children}
        </button>
      </SelectContext.Provider>
    </SelectOpenCloseContext.Provider>
  );
};

Select.Options = SelectOptions;
Select.Option = SelectOption;
Select.Button = SelectButton;
