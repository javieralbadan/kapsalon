import { useAppointmentCreation } from '@/hooks/useCreateAppointment';
import { AppointmentCreationType } from '@/types/appointments';
import { CustomerRow } from '@/types/customers';
import { FormUserInfoType } from '@/types/messages';
import { formatDateTime } from '@/utils/formatters';
import { Button, Card, Divider, Modal, Result } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
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
  const [successData, setSuccessData] = useState<{
    customer: CustomerRow;
    appointmentId: string;
  } | null>(null);

  const isAppointmentReady: boolean =
    !!appointment.barber.id && !!appointment.service.id && !!appointment.dayTime;

  const handleSuccess = (customerData: CustomerRow, appointmentId: string) => {
    setSuccessData({
      customer: customerData,
      appointmentId,
    });
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const { createCustomerAndAppointment, isLoading } = useAppointmentCreation({
    onSuccess: handleSuccess,
    showSuccessNotification: false,
  });

  const handleConfirmAppointment = () => {
    if (customerInfo) {
      createCustomerAndAppointment(customerInfo, appointment).catch((error) =>
        console.error('Error creating appointment:', error),
      );
    }
  };

  return (
    <>
      {!isAppointmentReady ? (
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
      ) : (
        <Card className="m-auto max-w-[400px]">
          <h2>Confirma tu cita</h2>
          <SummaryInfo {...appointment} />

          <p className="my-3 leading-5 text-gray-500">
            Si todo pinta bien, porfa añade tu info. <br />
            Si no, puedes
            <span
              className={`ml-1 ${
                !codeOTP
                  ? 'cursor-pointer text-blue-400 underline decoration-blue-400'
                  : 'cursor-not-allowed text-gray-400 line-through'
              }`}
              onClick={() => !codeOTP && goBack()}
            >
              volver y editar
            </span>
          </p>

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
          <p className="my-3 text-xs text-gray-500">
            Al confirmar tu cita aceptas las{' '}
            <Link className="underline" href="/legal/condiciones-del-servicio" target="_blank">
              Condiciones del Servicio
            </Link>{' '}
            y la{' '}
            <Link className="underline" href="/legal/politica-de-privacidad" target="_blank">
              Política de Privacidad
            </Link>
          </p>

          <Divider />

          <Link href="/">
            <Button type="link" color="danger" variant="dashed">
              Cancelar proceso
            </Button>
          </Link>
        </Card>
      )}

      <Modal
        open={showSuccessModal && !!successData}
        footer={null}
        closable={false}
        width={550}
        destroyOnClose
      >
        {successData && (
          <AppointmentSuccess
            customerData={successData.customer}
            appointmentDetails={{
              id: successData.appointmentId,
              serviceName: appointment.service.name,
              barberName: appointment.barber.name,
              dateTime: appointment.dayTime.id as string,
            }}
            onClose={closeSuccessModal}
          />
        )}
      </Modal>
    </>
  );
};

export default AppointmentConfirmation;

const SummaryInfo = ({ service, barber, dayTime }: AppointmentCreationType) => {
  return (
    <div className="flex flex-col items-center justify-center gap-0">
      <p>
        💇 Servicio: {service.name} → {service.description}
      </p>
      <p>🍺 Barbero: {barber.name}</p>
      <p>📅 {formatDateTime({ dateString: dayTime.id as string })}</p>
    </div>
  );
};
