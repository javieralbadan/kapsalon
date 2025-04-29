import { GroupList } from '@/components/appointment/GroupList';
import { useGetServicesByStaff } from '@/hooks/useServices';
import { useGetStaffMembersByShop } from '@/hooks/useStaffMembers';
import {
  APPOINTMENT_INIT_VALUE,
  AppointmentCreationType,
  BarbersContentProps,
  ServicesContentProps,
  SetOptionParams,
} from '@/types/appointments';
import { ShopUI } from '@/types/shops';
import { mapServicesAsList } from '@/utils/mappers/services';
import { useState } from 'react';
import { Loading } from '../ui/Loading';
import ApptCreationConfirmation from './ApptCreationConfirmation';
import ApptStepper from './ApptStepper';
import ApptStepperFinalStep from './ApptStepperFinalStep';
import SlotsContent from './SlotsContent';

const ApptCreationStepper = ({ shop }: { shop: ShopUI }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [appointment, setAppointment] = useState<AppointmentCreationType>({
    ...APPOINTMENT_INIT_VALUE,
    shop,
  });

  const prevStep = () => setCurrentStep(currentStep - 1);
  const nextStep = () => setCurrentStep(currentStep + 1);

  const setOption = ({ key, listItem }: SetOptionParams) => {
    setAppointment((prev) => ({ ...prev, [key]: listItem }));
    nextStep();
  };

  const steps = [
    {
      title: 'Barbero',
      content: (
        <BarbersContent shop={shop} selectedItemId={appointment.barber.id} setOption={setOption} />
      ),
    },
    {
      title: 'Servicio',
      content: (
        <ServicesContent
          barber={appointment.barber}
          selectedItemId={appointment.service.id}
          setOption={setOption}
        />
      ),
    },
    {
      title: 'Día y Hora',
      content: (
        <SlotsContent
          barber={appointment.barber}
          selectedItemId={appointment.dateTime.id}
          setOption={setOption}
        />
      ),
    },
    {
      title: 'Confirmación',
      content: (
        <ApptStepperFinalStep appt={appointment} goBack={prevStep}>
          <ApptCreationConfirmation appt={appointment} goBack={prevStep} />
        </ApptStepperFinalStep>
      ),
    },
  ];

  return <ApptStepper steps={steps} currentStep={currentStep} onPrev={prevStep} />;
};

const BarbersContent = ({ selectedItemId, shop, setOption }: BarbersContentProps) => {
  const { staffMembers, isLoading, error } = useGetStaffMembersByShop(shop.id);

  if (isLoading) return <Loading />;
  if (error) return <div>Error cargando barberos</div>;

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Selecciona un barbero:</h2>
      <GroupList
        dataList={staffMembers}
        onSelectOption={(listItem) => setOption({ key: 'barber', listItem })}
        selectedItemId={selectedItemId}
      />
      {shop && staffMembers.length === 1 && (
        <p className="mt-4">Próximamente más barberos de {shop?.name}</p>
      )}
    </>
  );
};

const ServicesContent = ({ barber, selectedItemId, setOption }: ServicesContentProps) => {
  const { services, isLoading, error } = useGetServicesByStaff(barber.id);

  if (isLoading) return <Loading />;
  if (error) return <div>Error cargando servicios</div>;

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Selecciona un servicio:</h2>
      <GroupList
        dataList={mapServicesAsList(services)}
        onSelectOption={(listItem) => setOption({ key: 'service', listItem })}
        selectedItemId={selectedItemId}
      />
    </>
  );
};

export default ApptCreationStepper;
