import { createContext, useContext } from 'react';

export type DialogContextValue = {
  open: boolean;
};

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext() {
  return useContext(DialogContext);
}
