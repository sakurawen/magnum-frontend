export const metadata = {
  title: 'Magnum Editor',
};

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full overflow-hidden">{children}</div>;
};

export default EditorLayout;
