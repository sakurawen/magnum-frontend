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
  return (
    <div
      className={cx(
        'menu-items border-light absolute left-0 z-20 min-w-full origin-top transform border bg-white shadow-sm transition-all',
        [
          context.open
            ? 'visible scale-y-100 opacity-100'
            : 'invisible scale-y-95 opacity-0',
        ],
        className,
      )}
    >
      {children}
    </div>
  );
};
