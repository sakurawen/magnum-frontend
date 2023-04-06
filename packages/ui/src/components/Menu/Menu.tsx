import cx from 'clsx';
import * as React from 'react';
import { MenuContext, MenuContextValue } from './context';
import { MenuItem } from './MenuItem';
import { MenuItems } from './MenuItems';
import { MenuTrigger } from './MenuTrigger';

export type MenuProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

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
      if (menuRef.current.contains(e.target as HTMLElement)) return;
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

Menu.Item = MenuItem;
Menu.Items = MenuItems;
Menu.Trigger = MenuTrigger;
