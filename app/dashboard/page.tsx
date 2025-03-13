import { Button } from 'antd';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1>Dashboard</h1>
      <Link href="/dashboard/editar-disponibilidad">
        <Button type="primary">Editar disponibilidad</Button>
      </Link>
    </div>
  );
};

export default Dashboard;
