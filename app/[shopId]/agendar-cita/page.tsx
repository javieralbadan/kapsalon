'use client';
import AppointmentStepper from '@/components/appointment/AppointmentStepper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetShop } from '@/hooks/useShops';
import { Suspense, use } from 'react';

const ScheduleAppointment = ({ params }: { params: Promise<{ shopId: string }> }) => {
  const resolvedParams = use(params);
  const { data: shop, isLoading } = useGetShop(resolvedParams.shopId);

  return (
    <div className="mt-0 p-4 text-center md:mt-4">
      <h1>Agendar cita</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {isLoading || !shop ? <Loading /> : <AppointmentStepper shop={shop} />}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};

export default ScheduleAppointment;
