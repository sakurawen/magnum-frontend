import cx from 'clsx';
import { useContext, PropsWithChildren } from 'react';
import { MenuContext } from './context';
export type MenuItemProps = PropsWithChildren<{
  className?: string;
  onClick?: React.MouseEventHandler;
}>;
export const MenuItem = (props: MenuItemProps) => {
  const { children, className, onClick } = props;
  const [, dispatch] = useContext(MenuContext);
  const handleClick: React.MouseEventHandler = (e) => {
    onClick?.(e);
    dispatch('close');
  };
  return (
    <div
      onClick={handleClick}
      role="menuitem"
      className={cx(
        'menu-item select-none py-2 px-4 hover:bg-theme-gray-2',
        className,
      )}
    >
      {children}
    </div>
  );
};
