import * as React from 'react';

export type DispatchAction = {
  type: string;
  data: any;
};

export type DialogContextState = {
  open: boolean;
};

export type DialogContextValue = [
  DialogContextState,
  React.Dispatch<DispatchAction>,
];

export const DialogContext = React.createContext<DialogContextValue | null>(
  null,
);

export function useDialogContext() {
  return React.useContext(DialogContext);
}
