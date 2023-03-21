import { PropsWithChildren } from 'react';

export const metadata = {
  title: 'Magnum Form - Editor',
};

const EditorLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-full overflow-hidden">{children}</div>;
};

export default EditorLayout;
