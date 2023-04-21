import Table from './Table';

export const metadata = {
  title: 'Magnum Form Dashboard - 仪表盘',
};

const Dashboard = () => {
  return (
    <div className="h-full overflow-y-auto">
      <Table />
    </div>
  );
};

export default Dashboard;
