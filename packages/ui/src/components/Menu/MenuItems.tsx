import { MenuContext } from './context';
import { useContext } from 'react';
import cx from 'clsx';

export type MenuItemsProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

export const MenuItems = (props: MenuItemsProps) => {
  const { children, className } = props;
  const [context] = useContext(MenuContext);
  return context.open ? (
    <div
      className={cx(
        'menu-items border border-light bg-white w-full absolute  z-20 left-0',
        className,
      )}
    >
      {children}
    </div>
  ) : null;
};
