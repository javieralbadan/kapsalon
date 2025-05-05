import { useCancelAppointment } from '@/hooks/useAppointments';
import { AppointmentEditionType } from '@/types/appointments';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';

interface Props {
  appt: AppointmentEditionType | null;
}

const ApptCancelButton = ({ appt }: Props) => {
  const router = useRouter();
  const { cancelAppointment, isLoading } = useCancelAppointment({
    onSuccess: () => {
      message.success('Cita cancelada exitosamente');
      router.push('/');
    },
    onError: () => void message.error('Error al cancelar la cita'),
  });

  if (!appt) {
    return null;
  }

  return (
    <Button
      type="primary"
      danger
      loading={isLoading}
      onClick={() => void cancelAppointment(appt)}
      className="mt-4"
    >
      {!isLoading && 'Confirmar cancelación'}
    </Button>
  );
};

export default ApptCancelButton;
