import { useAppointmentCreation } from '@/hooks/useAppointmentCreation';
import { AppointmentCreationType } from '@/types/appointments';
import { FormUserInfoType } from '@/types/messages';
import { formatDateTime } from '@/utils/formatters';
import { Button, Card, Divider, Modal } from 'antd';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import { Loading } from '../ui/Loading';
import AppointmentSuccess from './AppointmentSuccess';
import CodeOTPForm from './CodeOTPForm';
import UserInfoForm from './UserInfoForm';

interface Props {
  appointment: AppointmentCreationType;
  goBack: () => void;
}

const AppointmentConfirmation = ({ appointment, goBack }: Props) => {
  const [codeOTP, setCodeOTP] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState<FormUserInfoType | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const { createCustomerAndAppointment, isLoading } = useAppointmentCreation({
    onSuccess: () => setShowSuccessModal(true),
    onError: () => goBack(),
  });

  const handleConfirmAppointment = () => {
    if (customerInfo) {
      // createCustomerAndAppointment is an async fn. So, we need to handle the promise
      // handleConfirmAppointment shouldn't be async to meet the onFinish type (AntDesign Form)
      createCustomerAndAppointment(customerInfo, appointment).catch((error) =>
        console.error('Error creating appointment:', error),
      );
    }
  };

  return (
    <Card className="m-auto max-w-[400px]">
      <h2>Confirma tu cita</h2>
      <SummaryInfo {...appointment} codeOTP={codeOTP} goBack={goBack} />

      <Suspense fallback={<Loading />}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <UserInfoForm
              codeOTP={codeOTP}
              setCodeOTP={setCodeOTP}
              setCustomerInfo={setCustomerInfo}
            />
            <CodeOTPForm
              codeOTP={codeOTP}
              confirmAppointment={handleConfirmAppointment}
              isSending={isLoading}
            />
            <LegalLinks />
            <Divider />
            <Link href="/">
              <Button type="link" color="danger" variant="dashed">
                Cancelar proceso
              </Button>
            </Link>

            <Modal
              open={showSuccessModal}
              footer={null}
              closable={false}
              width={550}
              destroyOnClose
            >
              <AppointmentSuccess
                serviceName={appointment.service.name}
                barberName={appointment.barber.name}
                dateTime={appointment.dayTime.id as string}
              />
            </Modal>
          </>
        )}
      </Suspense>
    </Card>
  );
};

export default AppointmentConfirmation;

const SummaryInfo = ({ service, barber, dayTime, codeOTP, goBack }: AppointmentCreationType) => {
  const linkEnabled = 'cursor-pointer text-blue-400 underline decoration-blue-400';
  const linkDisabled = 'cursor-not-allowed text-gray-400 line-through';

  return (
    <div className="flex flex-col items-center justify-center gap-0">
      <p>💇 Servicio: {`${service.name} → ${service.description}`}</p>
      <p>🍺 Barbero: {barber.name}</p>
      <p>📅 {formatDateTime({ dateString: dayTime.id as string })}</p>

      <p className="my-3 leading-5 text-gray-500">
        Si todo pinta bien, porfa añade tu info. <br />
        Si no, puedes
        <span
          className={`ml-1 ${!codeOTP ? linkEnabled : linkDisabled}`}
          onClick={() => !codeOTP && goBack()}
        >
          volver y editar
        </span>
      </p>
    </div>
  );
};

const LegalLinks = () => {
  return (
    <p className="my-3 text-xs text-gray-500">
      Pagas directamente al barbero. Al confirmar tu cita aceptas las{' '}
      <Link className="underline" href="/legal/condiciones-del-servicio" target="_blank">
        Condiciones del Servicio
      </Link>{' '}
      y la{' '}
      <Link className="underline" href="/legal/politica-de-privacidad" target="_blank">
        Política de Privacidad
      </Link>
    </p>
  );
};
