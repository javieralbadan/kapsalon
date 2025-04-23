import { useAppointmentCreation } from '@/hooks/useAppointmentCreation';
import { AppointmentCreationType } from '@/types/appointments';
import { FormUserInfoType } from '@/types/messages';
import { mapServiceSummaryInfo } from '@/utils/mappers/services';
import { Card } from 'antd';
import { Suspense, useState } from 'react';
import { Loading } from '../ui/Loading';
import { LegalLinksAndCancelProcess } from './ApptStepperFinalStep';
import ApptSuccessModal from './ApptSuccessModal';
import CodeOTPForm from './CodeOTPForm';
import UserInfoForm from './UserInfoForm';

interface Props {
  appt: AppointmentCreationType;
  goBack: () => void;
}

const linkEnabled = 'cursor-pointer text-blue-400 underline decoration-blue-400';
const linkDisabled = 'cursor-not-allowed text-gray-400 line-through';

const ApptCreationConfirmation = ({ appt, goBack }: Props) => {
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
      createCustomerAndAppointment(customerInfo, appt).catch((error) =>
        console.error('Error creando cita:', error),
      );
    }
  };

  return (
    <Card className="m-auto max-w-[400px]">
      <h2>Confirma tu cita</h2>
      <div className="flex flex-col items-center justify-center gap-0">
        <p>💇 Servicio: {mapServiceSummaryInfo(appt.service)}</p>
        <p>🍺 Barbero: {appt.barber.name}</p>
        <p>📅 {appt.dateTime.name}</p>

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
            <LegalLinksAndCancelProcess />
            <ApptSuccessModal
              showSuccessModal={showSuccessModal}
              serviceName={appt.service.name}
              barberName={appt.barber.name}
              dateTime={appt.dateTime.name}
            />
          </>
        )}
      </Suspense>
    </Card>
  );
};

export default ApptCreationConfirmation;
