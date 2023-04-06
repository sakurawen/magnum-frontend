import * as React from 'react';

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

export type SelectContextDispatch = React.Dispatch<SelectContextAction>;

export const SelectContext = React.createContext<
  [SelectContextValue, SelectContextDispatch] | null
>(null);

SelectContext.displayName = 'SelectContext';

export type SelectOpenCLoseContextValue = [
  boolean,
  React.Dispatch<React.SetStateAction<Boolean>>,
];

export const SelectOpenCloseContext =
  React.createContext<SelectOpenCLoseContextValue | null>(null);
