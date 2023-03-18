import MenuItem from './MenuItem';
import MenuItems from './MenuItems';
import MenuTrigger from './MenuTrigger';
import { MenuContext, MenuContextValue } from './context';
import React, { useReducer, Reducer, useEffect, useRef } from 'react';
import cx from 'clsx';

export type MenuProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const MenuStatus = {
  CLOSE: 0,
  OPEN: 1,
};

const Menu = ({ children, className }: MenuProps) => {
  const reducer = useReducer<Reducer<MenuContextValue, 'open' | 'close' | 'toggle'>>(
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
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listenMenuOutClick = (e) => {
      if (menuRef.current.contains(e.target)) return;
      reducer[1]('close');
    };
    document.addEventListener('click', listenMenuOutClick);
    return () => {
      document.removeEventListener('click', listenMenuOutClick);
    };
  }, []);
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

export default Menu;
