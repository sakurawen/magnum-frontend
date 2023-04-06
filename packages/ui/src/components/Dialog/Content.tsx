import * as React from 'react';

export type DialogContentProps = React.PropsWithChildren<{
  className?: string;
}>;

export const DialogContent = (props: DialogContentProps) => {
  const { children } = props;
  return <div className="dialog-content">{children}</div>;
};
