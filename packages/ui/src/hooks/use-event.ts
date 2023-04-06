import { useCallback } from 'react';
import { useLatest } from './use-latest';

export function useEvent<
  F extends (...args: any[]) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>,
>(cb: (...args: P) => R) {
  const ref = useLatest(cb);
  return useCallback((...args: P) => ref.current(...args), [ref.current]);
}

export default useEvent;
