'use client';
import AppointmentsList from '@/components/dashboard/AppointmentsList';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetApptsByStaff } from '@/hooks/useAppointments';
import { Suspense } from 'react';

const TEMP_BARBER_ID = '2fb39ad1-c200-4011-a2ef-0616919ec80b';

const Dashboard = () => {
  const { data: appts, isLoading } = useGetApptsByStaff(TEMP_BARBER_ID);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1>Dashboard</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {isLoading || !appts ? <Loading /> : <AppointmentsList data={appts} />}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};

export default Dashboard;
