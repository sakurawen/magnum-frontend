import { PropsWithChildren, useContext } from 'react';
import cx from 'clsx';
import { MenuContext } from './context';

export type MenuTriggerProps = PropsWithChildren<{
  className?: string;
}>;

export const MenuTrigger = (props: MenuTriggerProps) => {
  const { children, className } = props;
  const [, dispatch] = useContext(MenuContext);
  const handleToggle = () => {
    dispatch('toggle');
  };
  return (
    <div onClick={handleToggle} className={cx('menu-trigger', className)}>
      {children}
    </div>
  );
};
