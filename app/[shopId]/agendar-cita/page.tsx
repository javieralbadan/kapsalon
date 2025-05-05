'use client';
import ApptCreationStepper from '@/components/appointment/ApptCreationStepper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetShop } from '@/hooks/useShops';
import { Suspense, use, useEffect } from 'react';

const ScheduleAppointment = ({ params }: { params: Promise<{ shopId: string }> }) => {
  const resolvedParams = use(params);
  useEffect(() => {
    document.title = 'Kapsalon · Agenda tu cita de barbería en segundos';
  }, []);
  const { data: shop, isLoading } = useGetShop(resolvedParams.shopId);

  return (
    <div className="mt-0 p-4 text-center md:mt-4">
      <h1>Agendar cita</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {isLoading || !shop ? <Loading /> : <ApptCreationStepper shop={shop} />}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};

export default ScheduleAppointment;
