import { useUpdateAppointment } from '@/hooks/useAppointments';
import { AppointmentEditionType } from '@/types/appointments';
import { Button, Card, message } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { LegalLinksAndCancelProcess } from './ApptStepperFinalStep';
import ApptSuccessModal from './ApptSuccessModal';

interface Props {
  appt: AppointmentEditionType;
  goBack: () => void;
}

const ApptEditionConfirmation = ({ appt, goBack }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const { updateAppointmentDateTime, isLoading } = useUpdateAppointment({
    onSuccess: () => {
      if (pathname === '/dashboard') {
        message.success('Cita reagendada exitosamente');
        router.push('/dashboard');
      } else {
        setShowSuccessModal(true);
      }
    },
    onError: () => goBack(),
  });

  return (
    <>
      <Card className="m-auto max-w-[400px]">
        <h2>Confirma el nuevo horario</h2>
        <div className="flex flex-col items-center justify-center gap-0">
          <p>💇 Servicio: {appt.service.name}</p>
          <p>🍺 Barbero: {appt.barber.name}</p>
          <p className="font-bold">📅 {appt.dateTime.name}</p>

          <p className="my-3 leading-5 text-gray-500">
            Si todo pinta bien, puedes confirmar la cita <br />
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
      </Card>

      <ApptSuccessModal
        showSuccessModal={showSuccessModal}
        serviceName={appt.service.name}
        barberName={appt.barber.name}
        dateTime={appt.dateTime.name}
      />
    </>
  );
};

export default ApptEditionConfirmation;
