// import AppointmentStepper from '@/components/appointment/AppointmentStepper';
import ClientErrorBoundary from '@/components/ui/ClientErrorBoundary';
import { Loading } from '@/components/ui/Loading';
// import { useGetAllServices } from '@/hooks/useServices';
// import { useGetShop } from '@/hooks/useShops';
// import { useGetAllAvails } from '@/hooks/useStaffAvailabilities';
// import { useGetAllStaff } from '@/hooks/useStaffMembers';
// import { GroupListItem } from '@/types/ui';
import { Suspense } from 'react';

const EditAppointment = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log('🚀 ~ id:', id);

  // const { data: shop, isLoading: isLoadingShops } = useGetShop(INITIAL_SHOP);
  // const { staffMembers, isLoading: isLoadingStaff } = useGetAllStaff();
  // const { services, isLoading: isLoadingServices } = useGetAllServices();
  // const { availabilities, isLoading: isLoadingAvails } = useGetAllAvails();
  const isLoading = false;

  return (
    <div className="p-4 text-center">
      <h1>Editar cita</h1>
      <ClientErrorBoundary>
        <Suspense fallback={<Loading />}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <p>Cita a editar: {id}</p>
              {/* <AppointmentStepper
                shop={shop as GroupListItem}
                barbers={staffMembers}
                services={services}
                availablities={availabilities}
              /> */}
            </>
          )}
        </Suspense>
      </ClientErrorBoundary>
    </div>
  );
};

export default EditAppointment;
