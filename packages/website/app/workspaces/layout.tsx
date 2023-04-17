import Navbar from './Navbar';

type WorkspacesLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Magnum Form - Workspaces',
  description: 'Magnum Form Workspaces',
};

const WorkspacesLayout = ({ children }: WorkspacesLayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default WorkspacesLayout;
