import * as React from 'react';
import { DialogContent } from './Content';
import { DialogContext, DialogContextState, DispatchAction } from './context';
import { DialogOverlay } from './Overlay';
import { DialogPortal } from './Portal';

export type DialogProps = React.PropsWithChildren<{}>;

export const Dialog = (props: DialogProps) => {
  const { children } = props;
  const reducer = React.useReducer<
    React.Reducer<DialogContextState, DispatchAction>
  >(
    (state, action) => {
      switch (action.type) {
        default:
          return { ...state };
      }
    },
    { open: false },
  );
  return (
    <DialogContext.Provider value={reducer}>{children}</DialogContext.Provider>
  );
};

Dialog.Overlay = DialogOverlay;
Dialog.Portal = DialogPortal;
Dialog.Content = DialogContent;
