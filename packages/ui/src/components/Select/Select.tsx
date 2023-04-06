import cx from 'clsx';
import * as React from 'react';
import { useEvent } from '../../hooks/use-event';
import { SelectButton } from './Button';
import {
  ACTIONS, SelectContext, SelectContextAction, SelectContextValue, SelectOpenCloseContext
} from './context';
import { SelectOption } from './Option';
import { SelectOptions } from './Options';

export type SelectProps<T = any> = {
  size?: ComponentSize;
  value: T;
  onChange(val: T): void;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

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

  const selectContainerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
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
          className={cx('relative z-10 inline-block text-left', className)}
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
