import * as React from 'react';
import cx from 'clsx';

export type BoxProps = React.PropsWithChildren<{
  className?: string;
}>;
export const Box = (props: BoxProps) => {
  const { children, className } = props;
  return (
    <div className={cx('relative rounded-lg shadow', className)}>
      {children}
    </div>
  );
};
