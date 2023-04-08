import * as React from 'react';
export const createContext = <ContextValueType extends object | null>(
  contextName: string,
  defaultContext?: ContextValueType,
) => {
  const Context = React.createContext<ContextValueType | undefined>(
    defaultContext,
  );

  const Provider = (
    props: ContextValueType & { children: React.ReactNode },
  ) => {
    const { children, ...context } = props;

    const value = React.useMemo(
      () => context,
      Object.values(context),
    ) as ContextValueType;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  Provider.displayName = `${contextName}Provider`;

  const useContext = () => {
    const ctx = React.useContext(Context);
    if (ctx) return ctx;
    if (defaultContext !== undefined) return defaultContext;
    throw new Error('context error');
  };

  return [Provider, useContext] as const;
};
