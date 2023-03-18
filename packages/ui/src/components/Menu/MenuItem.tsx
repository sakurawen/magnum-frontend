import cx from 'clsx';
import { useContext } from 'react';
import { MenuContext } from './context';
export type MenuItemProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  onClick?: React.MouseEventHandler;
};
const MenuItem = ({ children, className, onClick }: MenuItemProps) => {
  const [, dispatch] = useContext(MenuContext);
  const handleClick: React.MouseEventHandler = (e) => {
    onClick?.(e);
    dispatch('close');
  };
  return (
    <div
      onClick={handleClick}
      role="menuitem"
      className={cx('menu-item select-none py-2 px-4 hover:bg-theme-gray-2', className)}
    >
      {children}
    </div>
  );
};

export default MenuItem;
