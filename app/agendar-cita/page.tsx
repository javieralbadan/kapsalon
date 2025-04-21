'use client';
import AppointmentStepper from '@/components/appointment/AppointmentStepper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetShop } from '@/hooks/useShops';
import { Suspense } from 'react';

const INITIAL_SHOP = '6f543b29-5186-4c30-b7ef-78b74aebf4cb';

const ScheduleAppointment = () => {
  const { data: shop, isLoading } = useGetShop(INITIAL_SHOP);

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
