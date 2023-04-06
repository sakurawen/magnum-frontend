import * as React from 'react';

export const MenuContextDefaultValue = {
  open: false,
};

export type MenuContextValue = typeof MenuContextDefaultValue;

export type MenuContextDispatcher = React.Dispatch<'open' | 'close' | 'toggle'>;

export const MenuContext = React.createContext<
  [MenuContextValue, MenuContextDispatcher] | null
>(null);

export const useMenuContext = () => React.useContext(MenuContext);
