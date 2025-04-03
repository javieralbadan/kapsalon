'use client';
import AppointmentStepper from '@/components/appointment/AppointmentStepper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useGetAllServices } from '@/hooks/useServices';
import { useGetShop } from '@/hooks/useShops';
import { useGetAllAvails } from '@/hooks/useStaffAvailabilities';
import { useGetAllStaff } from '@/hooks/useStaffMembers';
import { Suspense } from 'react';

const INITIAL_SHOP = '6f543b29-5186-4c30-b7ef-78b74aebf4cb';

const ScheduleAppointment = () => {
  const { data: shop, isLoading: isLoadingShops } = useGetShop(INITIAL_SHOP);
  const { staffMembers, isLoading: isLoadingStaff } = useGetAllStaff();
  const { services, isLoading: isLoadingServices } = useGetAllServices();
  const { availabilities, isLoading: isLoadingAvails } = useGetAllAvails();
  const isLoading = isLoadingShops || isLoadingStaff || isLoadingServices || isLoadingAvails;

  return (
    <div className="p-4 text-center">
      <h1>Agendar cita</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {isLoading || !shop ? (
            <Loading />
          ) : (
            <AppointmentStepper
              shop={shop}
              barbers={staffMembers}
              services={services}
              availablities={availabilities}
            />
          )}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};

export default ScheduleAppointment;
