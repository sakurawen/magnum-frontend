import { Option } from './Option';
import cx from 'clsx';
import { SIZE_CLASSNAMES } from '../consts';
import { ReactNode, FC } from 'react';

export type SelectProps = {
  size?: ComponentSize;
  className?: string;
  children?: React.ReactNode | ReactNode[];
};

export const Select = (props: SelectProps) => {
  const { children, size, className } = props;
  return (
    <button
      role="listbox"
      className={cx('bg-white', SIZE_CLASSNAMES[size], className)}
    >
      {children}
    </button>
  );
};

Select.defaultProps = {
  size: 'middle',
};
Select.Option = Option;
