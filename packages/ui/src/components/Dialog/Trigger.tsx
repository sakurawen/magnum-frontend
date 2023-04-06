import * as React from 'react';

export type DialogTriggerProps = React.PropsWithChildren<{}>;
export const DialogTrigger = (props: DialogTriggerProps) => {
  const { children } = props;
  return <div>{children}</div>;
};
