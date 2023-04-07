import { useDialogContext } from './context';
import * as React from 'react';

export const DialogOverlay = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [ctx] = useDialogContext();
  return ctx.open ? (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-50 h-full w-full bg-black/60"
    ></div>
  ) : null;
});
