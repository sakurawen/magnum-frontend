import * as React from 'react';
import { useDialogContext } from './context';

export type DialogContentProps = React.PropsWithChildren<{
  className?: string;
}>;

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>((props, ref) => {
  const { children } = props;
  const [ctx] = useDialogContext();
  return ctx.open ? (
    <div className="dialog-content" ref={ref}>
      {children}
    </div>
  ) : null;
});
