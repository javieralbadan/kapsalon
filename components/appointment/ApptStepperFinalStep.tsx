import { AppointmentCreationType } from '@/types/appointments';
import { Button, Divider, Result } from 'antd';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  appt: Pick<AppointmentCreationType, 'shop' | 'barber' | 'service' | 'dateTime'>;
  goBack: () => void;
}

const ApptStepperFinalStep = ({ children, appt, goBack }: Props) => {
  // children is ApptCreationConfirmation or ApptEditionConfirmation
  const isApptReady = Boolean(appt.shop && appt.barber?.id && appt.service.id && appt.dateTime);
  if (isApptReady) return children;

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

export default ApptStepperFinalStep;

export const LegalLinksAndCancelProcess = () => {
  return (
    <>
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
      <Divider />
      <Link href="/">
        <Button type="link" color="danger" variant="dashed">
          Cancelar proceso
        </Button>
      </Link>
    </>
  );
};
