import Navbar from '@/components/Navbar';

type WorkspacesLayoutProps = {
  children: React.ReactNode;
};
export const metadata = {
  title: 'Magnum Workspaces',
};

const WorkspacesLayout = ({ children }: WorkspacesLayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default WorkspacesLayout;
