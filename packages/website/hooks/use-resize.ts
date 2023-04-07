import { useEffect, useRef, DependencyList } from 'react';

export const useResize = (
  target: Window | Document | HTMLElement | undefined | null,
  cb: (e?: Event) => void,
  deps?: DependencyList,
) => {
  const timer = useRef<NodeJS.Timeout>();
  const fn: EventListener = (e) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      cb(e);
    }, 250);
  };
  useEffect(() => {
    cb();
    target?.addEventListener('resize', fn);
    return () => {
      target?.removeEventListener('resize', fn);
    };
  }, deps);
};

export default useResize;
