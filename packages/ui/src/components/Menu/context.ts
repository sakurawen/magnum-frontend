import { createContext, Dispatch, useContext } from 'react';

export const MenuContextDefaultValue = {
  open: false,
};

export type MenuContextValue = typeof MenuContextDefaultValue;

export type MenuContextDispatcher = Dispatch<'open' | 'close' | 'toggle'>;

export const MenuContext = createContext<[MenuContextValue, MenuContextDispatcher] | null>(null);

export const useMenuContext = () => useContext(MenuContext);
