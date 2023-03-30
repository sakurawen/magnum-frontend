import { useContext } from 'react';
import { SelectOpenCloseContext } from './context';
import cx from 'clsx';

type SelectOptions = {
  children?: React.ReactNode | React.ReactNode[];
};
export const SelectOptions = (props: SelectOptions) => {
  const { children } = props;
  const [open] = useContext(SelectOpenCloseContext);
  return (
    <div
      className={cx(
        'absolute mt-2 ring-1 ring-gray-200 shadow transition-all rounded bg-white z-40 min-w-full',
        [open ? 'visible opacity-100' : 'invisible opacity-0'],
      )}
    >
      {children}
    </div>
  );
};

export default SelectOptions;
