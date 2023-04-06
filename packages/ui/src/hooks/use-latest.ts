import * as React from 'react';

export function useLatest<T = any>(val: T) {
  const ref = React.useRef<T>(val);
  ref.current = val;
  return ref;
}

export default useLatest;
