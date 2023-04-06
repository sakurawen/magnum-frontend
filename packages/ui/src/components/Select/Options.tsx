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
        'absolute z-40 mt-2 min-w-full origin-top transform rounded bg-white shadow-sm ring-1 ring-gray-200 transition-all',
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

export default SelectOptions;
