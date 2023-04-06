import { useRef } from 'react';

export function useLatest<T = any>(val: T) {
  const ref = useRef<T>(val);
  ref.current = val;
  return ref;
}

export default useLatest;
