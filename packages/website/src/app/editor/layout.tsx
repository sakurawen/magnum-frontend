export const metadata = {
  title: 'Magnum engine editor',
};


const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="overflow-hidden">{children}</div>;
};

export default EditorLayout;
