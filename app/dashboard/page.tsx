'use client';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetApptsByStaff } from '@/hooks/useAppointments';
import { Suspense } from 'react';

const Dashboard = () => {
  const { data: appts, isLoading } = useGetApptsByStaff('2fb39ad1-c200-4011-a2ef-0616919ec80b');

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1>Dashboard</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {isLoading || !appts ? (
            <Loading />
          ) : (
            appts.map((appt) => (
              <div key={appt.id} className="mb-4">
                <h2 className="text-lg font-bold">{appt.date_time}</h2>
                <p>{appt.status}</p>
                <p>{appt.id}</p>
                <p>{appt.staff_member_id}</p>
                <p>{appt.service_id}</p>
                <p>{appt.customer_id}</p>
              </div>
            ))
          )}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};

export default Dashboard;
