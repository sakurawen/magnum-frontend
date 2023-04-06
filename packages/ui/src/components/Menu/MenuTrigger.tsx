import * as React from 'react';
import cx from 'clsx';
import { MenuContext } from './context';

export type MenuTriggerProps = React.PropsWithChildren<{
  className?: string;
}>;

export const MenuTrigger = (props: MenuTriggerProps) => {
  const { children, className } = props;
  const [, dispatch] = React.useContext(MenuContext);
  const handleToggle = () => {
    dispatch('toggle');
  };
  return (
    <div onClick={handleToggle} className={cx('menu-trigger', className)}>
      {children}
    </div>
  );
};
