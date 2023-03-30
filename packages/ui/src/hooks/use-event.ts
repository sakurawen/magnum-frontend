import { useCallback, useLayoutEffect, useRef } from 'react';
export function useEvent<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>,
>(cb: (...args: P) => R) {
  const ref = useRef(cb);
  useLayoutEffect(() => {
    ref.current = cb;
  }, [cb]);
  return useCallback((...args: P) => ref.current(...args), [ref.current]);
}
