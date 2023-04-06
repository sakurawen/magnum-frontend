import { CONTENT_SIZE_CLASSNAMES, ROUNDED_SIZE_CLASSNAMES } from '../consts';
import cx from 'clsx';
import { PropsWithChildren, useContext } from 'react';
import { SelectContext, SelectOpenCloseContext } from './context';
import { Icon } from '@iconify/react';

type SelectButtonProps = PropsWithChildren<{
  className?: string;
}>;

export const SelectButton = (props: SelectButtonProps) => {
  const [value] = useContext(SelectContext);
  const { size } = value;
  const [, setOpen] = useContext(SelectOpenCloseContext);
  const { children, className } = props;
  return (
    <div
      className={cx(
        'bg-theme-gray-2 flex items-center justify-between ring-1 ring-gray-200',
        CONTENT_SIZE_CLASSNAMES[size],
        ROUNDED_SIZE_CLASSNAMES[size],
        {},
        className,
      )}
      onClick={() => setOpen((open) => !open)}
    >
      <span>{children}</span>
      <Icon className="h-5 w-5" icon="radix-icons:caret-sort" />
    </div>
  );
};

export default SelectButton;
