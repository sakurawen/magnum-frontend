import { PropsWithChildren } from 'react';
import cx from 'clsx';

export type BoxProps = PropsWithChildren<{
  className?: string;
}>;
export const Box = (props: BoxProps) => {
  const { children, className } = props;
  return (
    <div className={cx(className, 'rounded p-2 shadow-md')}>{children}</div>
  );
};
