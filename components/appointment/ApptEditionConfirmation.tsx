import { useUpdateAppointment } from '@/hooks/useAppointments';
import { AppointmentEditionType } from '@/types/appointments';
import { Button, Card } from 'antd';
import { Suspense, useState } from 'react';
import { Loading } from '../ui/Loading';
import { LegalLinksAndCancelProcess } from './ApptStepperFinalStep';
import ApptSuccessModal from './ApptSuccessModal';

interface Props {
  appt: AppointmentEditionType;
  goBack: () => void;
}

const ApptEditionConfirmation = ({ appt, goBack }: Props) => {
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const { updateAppointmentDateTime, isLoading } = useUpdateAppointment({
    onSuccess: () => setShowSuccessModal(true),
    onError: () => goBack(),
  });

  return (
    <Card className="m-auto max-w-[400px]">
      <h2>Confirma tu nuevo horario</h2>
      <div className="flex flex-col items-center justify-center gap-0">
        <p>💇 Servicio: {appt.service.name}</p>
        <p>🍺 Barbero: {appt.barber.name}</p>
        <p className="font-bold">📅 {appt.dateTime.name}</p>

        <p className="my-3 leading-5 text-gray-500">
          Si todo pinta bien, puedes confirmar tu cita <br />
          Si no, puedes
          <span
            className="ml-1 cursor-pointer text-blue-400 underline decoration-blue-400"
            onClick={() => goBack()}
          >
            volver y editar
          </span>
        </p>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        loading={isLoading}
        onClick={() => void updateAppointmentDateTime(appt)}
      >
        {!isLoading && 'Confirmar cita'}
      </Button>
      <LegalLinksAndCancelProcess />

      <Suspense fallback={<Loading />}>
        {isLoading ? (
          <Loading />
        ) : (
          <ApptSuccessModal
            showSuccessModal={showSuccessModal}
            serviceName={appt.service.name}
            barberName={appt.barber.name}
            dateTime={appt.dateTime.name}
          />
        )}
      </Suspense>
    </Card>
  );
};

export default ApptEditionConfirmation;
