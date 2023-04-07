export const getDocument = () =>
  typeof document !== 'undefined' ? document : null;
export const getWindow = () => (typeof window !== 'undefined' ? window : null);
