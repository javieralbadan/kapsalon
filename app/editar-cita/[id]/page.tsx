'use client';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetAppointment } from '@/hooks/useAppointments';
import { Card } from 'antd';
import { Suspense, use } from 'react';

const EditAppointment = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params);
  console.log('🚀 ~ id:', resolvedParams.id);
  const { data: appt, isLoading } = useGetAppointment(resolvedParams.id);

  return (
    <div className="mt-0 p-4 text-center md:mt-4">
      <h1>Reagendar cita</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {isLoading || !appt ? (
            <Loading />
          ) : (
            <Card className="m-auto max-w-[400px]">
              <div className="flex flex-col items-center justify-center gap-0">
                <p>💇 Servicio: {`${appt.service_id} → ${appt.status}`}</p>
                <p>🍺 Barbero: {appt.staff_member_id}</p>
                <p>📅 {appt.date_time}</p>
                <p>📅 {appt.customer_id}</p>
                <p>📅 {appt.id}</p>

                <p className="my-3 leading-5 text-gray-500">
                  Si todo pinta bien, porfa confirma el nuevo horario
                </p>
              </div>
            </Card>
          )}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};

export default EditAppointment;
