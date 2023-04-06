import { createContext, Dispatch, SetStateAction } from 'react';

export type SelectContextValue<T = any> = {
  size?: ComponentSize;
  value?: T;
  onChange: (val: T) => void;
};

export type SelectContextAction<T extends string = any> = {
  type: T;
  data: any;
};

export const ACTIONS = {
  OPTION_SELECT: 'OPTION_SELECT',
  UPDATE_SIZE: 'UPDATE_SIZE',
};

export type SelectContextDispatch = Dispatch<SelectContextAction>;

export const SelectContext = createContext<
  [SelectContextValue, SelectContextDispatch] | null
>(null);

SelectContext.displayName = 'SelectContext';

export type SelectOpenCLoseContextValue = [
  boolean,
  Dispatch<SetStateAction<Boolean>>,
];

export const SelectOpenCloseContext =
  createContext<SelectOpenCLoseContextValue | null>(null);
