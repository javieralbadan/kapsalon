import { GroupList } from '@/components/appointment/GroupList';
import { useisMobile } from '@/hooks/useIsMobile';
import {
  APPOINTMENT_INIT_VALUE,
  AppointmentCreationType,
  AppointmentStepperProps,
  BarbersContentProps,
  ServicesContentProps,
  SetOptionParams,
  SlotContentProps,
} from '@/types/appointments';
import { Button, Result, Steps } from 'antd';
import { useState } from 'react';
import AppointmentConfirmation from './AppointmentConfirmation';
import DaySlots from './DaySlots';

const STYLES = {
  CONTAINER:
    'max-w-[800px] mx-auto p-4 border border-gray-300 rounded-2xl flex flex-col min-h-[calc(100vh-180px)]',
  CONTENT: 'flex flex-col items-center flex-grow overflow-y-auto',
  CONTENT_INNER: 'w-full py-4',
  TITLE: 'mb-4 text-lg font-semibold',
};

const AppointmentStepper = ({
  shop,
  barbers = [],
  services = [],
  availablities = [],
}: AppointmentStepperProps) => {
  const isMobile = useisMobile();
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
        <BarbersContent
          list={barbers}
          selectedItemId={appointment.barber.id}
          shop={shop}
          setOption={setOption}
        />
      ),
    },
    {
      title: 'Servicio',
      content: (
        <ServicesContent
          list={services}
          selectedItemId={appointment.service.id}
          setOption={setOption}
        />
      ),
    },
    {
      title: 'Día y Hora',
      content: (
        <SlotsContent
          availablities={availablities}
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

const BarbersContent = ({ list, selectedItemId, shop, setOption }: BarbersContentProps) => (
  <>
    <h2 className={STYLES.TITLE}>Selecciona un barbero:</h2>
    <GroupList
      dataList={list}
      onSelectOption={(listItem) => setOption({ key: 'barber', listItem })}
      selectedItemId={selectedItemId}
    />
    {shop && list.length === 1 && <p className="mt-4">Próximamente más barberos de {shop?.name}</p>}
  </>
);

const ServicesContent = ({ list, selectedItemId, setOption }: ServicesContentProps) => (
  <>
    <h2 className={STYLES.TITLE}>Selecciona un servicio:</h2>
    <GroupList
      dataList={list}
      onSelectOption={(listItem) => setOption({ key: 'service', listItem })}
      selectedItemId={selectedItemId}
    />
  </>
);

const SlotsContent = ({ availablities, selectedItemId, setOption }: SlotContentProps) => {
  return (
    <>
      <h2 className={STYLES.TITLE}>Selecciona día y hora:</h2>
      <DaySlots
        availablities={availablities}
        selectedItemId={selectedItemId}
        setOption={setOption}
      />
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
