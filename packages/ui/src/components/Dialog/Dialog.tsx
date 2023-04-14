import * as React from 'react';
import { createContext } from '../../utils/context';
import { createPortal } from 'react-dom';
import cx from 'clsx';

export type DialogProps = React.PropsWithChildren<{
  open: boolean;
  onOpenChange: (val: boolean) => void;
}>;

export const [DialogProvider, useDialogContext] = createContext<{
  open: boolean;
  onOpenChange: (val: boolean) => void;
}>('Dialog');

export const Dialog = (props: DialogProps) => {
  const { children, open: propOpen, onOpenChange } = props;
  return (
    <DialogProvider open={propOpen} onOpenChange={onOpenChange}>
      {children}
    </DialogProvider>
  );
};

export const DialogOverlay = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { open, onOpenChange } = useDialogContext();
  const handleClose = () => {
    onOpenChange(false);
  };
  return open ? (
    <div
      onClick={handleClose}
      ref={ref}
      className="animate-fade-in fixed left-0 top-0 z-40 h-full w-full bg-black/60"
    ></div>
  ) : null;
});

export type DialogPortalProps = {
  container?: HTMLElement | null;
  children?: React.ReactNode;
};

export const DialogPortal = React.forwardRef<HTMLDivElement, DialogPortalProps>(
  (props, ref) => {
    const { container = globalThis.document.body, children } = props;
    const { open } = useDialogContext();
    return container
      ? createPortal(
          <div
            className={cx('dialog-portal-container fixed left-0 top-0 z-50', {
              'h-full w-full': open,
            })}
            ref={ref}
          >
            {children}
          </div>,
          container,
        )
      : null;
  },
);
DialogPortal.displayName = 'DialogPortal';

export type DialogContentProps = React.PropsWithChildren<{
  className?: string;
}>;

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>((props, ref) => {
  const { children } = props;
  const { open } = useDialogContext();
  return open ? (
    <div
      className="dialog-content absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform"
      ref={ref}
    >
      <div className="relative rounded-lg shadow ring-1 ring-gray-blue-100">{children}</div>
    </div>
  ) : null;
});

Dialog.Overlay = DialogOverlay;
Dialog.Portal = DialogPortal;
Dialog.Content = DialogContent;
