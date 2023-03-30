import { MenuItem } from './MenuItem';
import { MenuItems } from './MenuItems';
import { MenuTrigger } from './MenuTrigger';
import { MenuContext, MenuContextValue } from './context';
import React, { useReducer, Reducer, useEffect, useRef } from 'react';
import cx from 'clsx';

export type MenuProps = {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

export const Menu = (props: MenuProps) => {
  const { children, className } = props;
  const reducer = useReducer<
    Reducer<MenuContextValue, 'open' | 'close' | 'toggle'>
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
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
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
