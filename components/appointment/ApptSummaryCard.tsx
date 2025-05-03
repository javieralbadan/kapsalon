import { AppointmentEditionType } from '@/types/appointments';
import { Card } from 'antd';

interface Props {
  apptToEdit: AppointmentEditionType | null;
  actionType: 'edit' | 'cancel';
  isInTheFuture: boolean;
}

const ApptSummaryCard = ({ apptToEdit, actionType, isInTheFuture }: Props) => {
  if (!apptToEdit) {
    return;
  }

  const { appt, customer, service, barber } = apptToEdit;
  const actionMessage =
    actionType === 'edit'
      ? 'Porfa selecciona el nuevo horario...'
      : '¿Estás seguro de cancelar esta cita?';

  return (
    <Card className="m-auto max-w-[400px]">
      <div className="flex flex-col items-center justify-center gap-0">
        <p className="mb-3 font-extralight">ID: {appt.id}</p>
        <p>🍺 Cliente: {`${customer.firstName} ${customer.lastName}`}</p>
        {barber.name && <p>🍺 Barbero: {barber.name}</p>}
        <p>💇 Servicio: {service.name}</p>
        <p>📅 Fecha: {appt.dateTime}</p>

        <p className="mt-3 leading-5 text-gray-500">
          {isInTheFuture ? actionMessage : 'Ya no es posible modificar la cita'}
        </p>
      </div>
    </Card>
  );
};

export default ApptSummaryCard;
