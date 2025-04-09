import { GroupList } from '@/components/appointment/GroupList';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useGetServicesByStaff } from '@/hooks/useServices';
import { useGetAvailsByStaff } from '@/hooks/useStaffAvailabilities';
import { useGetStaffMembersByShop } from '@/hooks/useStaffMembers';
import {
  APPOINTMENT_INIT_VALUE,
  AppointmentCreationType,
  BarbersContentProps,
  ServicesContentProps,
  SetOptionParams,
  SlotContentProps,
} from '@/types/appointments';
import { ShopUI } from '@/types/shops';
import { mapServicesAsList } from '@/utils/mappers/services';
import { Button, Result, Steps } from 'antd';
import { useState } from 'react';
import { Loading } from '../ui/Loading';
import AppointmentConfirmation from './AppointmentConfirmation';
import DaySlots from './DaySlots';

const STYLES = {
  CONTAINER:
    'max-w-[800px] mx-auto p-4 border border-gray-300 rounded-2xl flex flex-col min-h-[calc(100vh-180px)]',
  CONTENT: 'flex flex-col items-center flex-grow overflow-y-auto',
  CONTENT_INNER: 'w-full py-4',
  TITLE: 'mb-4 text-lg font-semibold',
};

const AppointmentStepper = ({ shop }: { shop: ShopUI }) => {
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [appointment, setAppointment] = useState<AppointmentCreationType>({
    ...APPOINTMENT_INIT_VALUE,
    shop,
  });
  const isAppointmentReady: boolean =
    !!appointment.shop &&
    !!appointment.barber?.id &&
    !!appointment.service.id &&
    !!appointment.dayTime;

  const setOption = ({ key, listItem }: SetOptionParams) => {
    setAppointment({ ...appointment, [key]: listItem });
    nextStep();
  };

  const prevStep = () => setCurrentStep(currentStep - 1);
  const nextStep = () => setCurrentStep(currentStep + 1);

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
          selectedItemId={appointment.dayTime.id}
          setOption={setOption}
        />
      ),
    },
    {
      title: 'Confirmación',
      content: isAppointmentReady ? (
        <AppointmentConfirmation appointment={appointment} goBack={prevStep} />
      ) : (
        <NotCompletedInfo goBack={prevStep} />
      ),
    },
  ];

  return (
    <div className={STYLES.CONTAINER}>
      <div className="mb-4">
        <Steps
          current={currentStep}
          items={steps.map(({ title }) => ({ title }))}
          type={isMobile ? 'inline' : 'default'}
        />
      </div>

      <div className="flex justify-start">
        <Button color="blue" variant="dashed" disabled={currentStep === 0} onClick={prevStep}>
          ← Atrás
        </Button>
      </div>

      <section className={STYLES.CONTENT}>
        <div className={STYLES.CONTENT_INNER}>{steps[currentStep].content}</div>
      </section>
    </div>
  );
};

const BarbersContent = ({ selectedItemId, shop, setOption }: BarbersContentProps) => {
  const { staffMembers, isLoading, error } = useGetStaffMembersByShop(shop.id);

  if (isLoading) return <Loading />;
  if (error) return <div>Error cargando barberos</div>;

  return (
    <>
      <h2 className={STYLES.TITLE}>Selecciona un barbero:</h2>
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
      <h2 className={STYLES.TITLE}>Selecciona un servicio:</h2>
      <GroupList
        dataList={mapServicesAsList(services)}
        onSelectOption={(listItem) => setOption({ key: 'service', listItem })}
        selectedItemId={selectedItemId}
      />
    </>
  );
};

const SlotsContent = ({ barber, selectedItemId, setOption }: SlotContentProps) => {
  const { data: slots, isLoading, error } = useGetAvailsByStaff(barber.id);

  if (isLoading) return <Loading />;
  if (error) return <div>Error cargando disponibilidad</div>;

  return (
    <>
      <h2 className={STYLES.TITLE}>Selecciona día y hora:</h2>
      <DaySlots availablities={slots} selectedItemId={selectedItemId} setOption={setOption} />
    </>
  );
};

const NotCompletedInfo = ({ goBack }: { goBack: () => void }) => {
  return (
    <Result
      status="info"
      title="Cita no establecida"
      subTitle="Debes seleccionar todo lo necesario para confirmar tu cita"
      extra={
        <Button type="primary" onClick={goBack}>
          Ir atrás
        </Button>
      }
    />
  );
};

export default AppointmentStepper;
