import { PropsWithChildren } from 'react';
import { DialogOverlay } from './Overlay';
import { DialogPortal } from './Portal';
export type DialogProps = PropsWithChildren<{}>;

export const Dialog = (props: DialogProps) => {
  const { children } = props;
  return <div>{children}</div>;
};
Dialog.Overlay = DialogOverlay;
Dialog.Portal = DialogPortal;
