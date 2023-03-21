import { PropsWithChildren } from 'react';
export const Box = (props: PropsWithChildren) => {
  const { children } = props;
  return <div>{children}</div>;
};
