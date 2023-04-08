import cx from 'clsx';
import * as React from 'react';
import { MenuContext, MenuContextValue } from './context';

export type MenuProps = {
  children?: React.ReactNode;
  className?: string;
};

/**
 * Menu Root
 * @param props
 * @returns
 */
export const Menu = (props: MenuProps) => {
  const { children, className } = props;
  const reducer = React.useReducer<
    React.Reducer<MenuContextValue, 'open' | 'close' | 'toggle'>
  >(
    (state, action) => {
      switch (action) {
        case 'close':
          state.open = false;
          return { ...state };
        case 'open':
          state.open = true;
          return { ...state };
        case 'toggle':
          state.open = !state.open;
          return { ...state };
        default:
          return state;
      }
    },
    {
      open: false,
    },
  );
  const menuRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const listenMenuOutClick = (e: MouseEvent) => {
      if (menuRef.current!.contains(e.target as HTMLElement)) return;
      reducer[1]('close');
    };
    document.addEventListener('click', listenMenuOutClick);
    return () => {
      document.removeEventListener('click', listenMenuOutClick);
    };
  }, [reducer]);
  return (
    <MenuContext.Provider value={reducer}>
      <div role="menu" ref={menuRef} className={cx('menu relative', className)}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

export type MenuItemsProps = React.PropsWithChildren<{
  className?: string;
}>;

/**
 * Menu Items
 * @param props
 * @returns
 */
export const MenuItems = (props: MenuItemsProps) => {
  const { children, className } = props;
  const [context] = React.useContext(MenuContext)!;
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

export type MenuItemProps = React.PropsWithChildren<{
  className?: string;
  onClick?: React.MouseEventHandler;
}>;

/**
 * Menu Item
 * @param props
 * @returns
 */
export const MenuItem = (props: MenuItemProps) => {
  const { children, className, onClick } = props;
  const [, dispatch] = React.useContext(MenuContext)!;
  const handleClick: React.MouseEventHandler = (e) => {
    onClick?.(e);
    dispatch('close');
  };
  return (
    <div
      onClick={handleClick}
      role="menuitem"
      className={cx(
        'menu-item hover:bg-gray-blue-50   select-none px-4 py-2',
        className,
      )}
    >
      {children}
    </div>
  );
};

export type MenuTriggerProps = React.PropsWithChildren<{
  className?: string;
}>;

export const MenuTrigger = (props: MenuTriggerProps) => {
  const { children, className } = props;
  const [, dispatch] = React.useContext(MenuContext)!;
  const handleToggle = () => {
    dispatch('toggle');
  };
  return (
    <div onClick={handleToggle} className={cx('menu-trigger', className)}>
      {children}
    </div>
  );
};

Menu.Item = MenuItem;
Menu.Items = MenuItems;
Menu.Trigger = MenuTrigger;

export default Menu;
