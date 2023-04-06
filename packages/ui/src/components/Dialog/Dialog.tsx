import * as React from 'react';
import { DialogOverlay } from './Overlay';
import { DialogPortal } from './Portal';
import { DialogContextState, DispatchAction } from './context';
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
  return <div className="dialog">{children}</div>;
};
Dialog.Overlay = DialogOverlay;
Dialog.Portal = DialogPortal;
