import * as React from 'react';
import { useDialogContext } from './context';

export type DialogTriggerProps = React.PropsWithChildren<{}>;
export const DialogTrigger = React.forwardRef<
  HTMLDivElement,
  DialogTriggerProps
>((props, ref) => {
  const { children } = props;
  const [ctx] = useDialogContext();
  return <div ref={ref}>{children}</div>;
});
