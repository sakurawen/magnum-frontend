import { createPortal } from 'react-dom';
import { forwardRef } from 'react';

export type DialogPortalProps = {
  container?: HTMLElement | null;
  children?: React.ReactNode;
};

export const DialogPortal = forwardRef<HTMLDivElement, DialogPortalProps>(
  (props, ref) => {
    const { container = globalThis.document.body, children } = props;
    return container
      ? createPortal(
          <div
            className="dialog-portal-container fixed left-0 top-0 z-50"
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
