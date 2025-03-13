'use client';
import AppointmentStepper from '@/components/appointment/AppointmentStepper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
import { useServices } from '@/hooks/useServices';
import { useShops } from '@/hooks/useShops';
import { useStaffAvailabilities } from '@/hooks/useStaffAvailability';
import { useStaffMembers } from '@/hooks/useStaffMembers';
import { mapServiceList } from '@/utils/mappers/services';
import { mapStaffList } from '@/utils/mappers/staffMembers';
import { Suspense } from 'react';

const ScheduleAppointment = () => {
  const { data: shopsResponse, isLoading: isLoadingShops } = useShops();
  const { data: staffResponse, isLoading: isLoadingStaff } = useStaffMembers();
  const { data: servicesResponse, isLoading: isLoadingServices } = useServices();
  const { data: availsResponse, isLoading: isLoadingAvails } = useStaffAvailabilities();

  const shops = shopsResponse?.data || [];
  const barbers = staffResponse?.data ? mapStaffList(staffResponse.data) : [];
  const services = servicesResponse?.data ? mapServiceList(servicesResponse.data) : [];
  const availabilities = availsResponse?.data || [];

  const isLoading = isLoadingShops || isLoadingStaff || isLoadingServices || isLoadingAvails;

  return (
    <div className="p-4 text-center">
      <h1>Agendar cita</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {/*  */}
          {isLoading ? (
            <Loading />
          ) : (
            <AppointmentStepper
              shops={shops}
              barbers={barbers}
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
