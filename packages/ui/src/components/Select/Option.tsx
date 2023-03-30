import { PropsWithChildren, useContext, useEffect } from 'react';
import { SelectContext, ACTIONS, SelectOpenCloseContext } from './context';
import cx from 'clsx';

type SelectOptionProps<T = any> = PropsWithChildren<{
  value: T;
}>;

const OPTION_SIZE = {
  small: 'p-1',
  middle: 'p-2',
  large: 'p-3',
};

export const SelectOption = (props: SelectOptionProps) => {
  const { children, value } = props;
  const [, setOpen] = useContext(SelectOpenCloseContext);
  const [{ size, value: current, onChange }, dispatch] =
    useContext(SelectContext);

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
        ' hover:bg-theme-gray-2',
        [isActive ? 'bg-theme-gray-2' : ''],
        OPTION_SIZE[size],
      )}
    >
      {children}
    </div>
  );
};

export default SelectOption;
