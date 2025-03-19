import { CustomerRow } from '@/types/customers';
import { formatDateTime } from '@/utils/formatters';
import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Card, Result, Typography } from 'antd';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

interface Props {
  customerData: CustomerRow;
  appointmentDetails: {
    id: string;
    serviceName: string;
    barberName: string;
    dateTime: string;
  };
  onClose?: () => void;
}

const AppointmentSuccess = ({ customerData, appointmentDetails, onClose }: Props) => {
  const formattedDate = formatDateTime({ dateString: appointmentDetails.dateTime });

  return (
    <Card className="m-auto max-w-[500px] text-center">
      <Result
        icon={<CheckCircleFilled style={{ color: '#52c41a' }} />}
        status="success"
        title="¡Cita confirmada con éxito!"
        subTitle={`${customerData.first_name}, tu reserva ha sido registrada correctamente.`}
      />

      <div className="mb-6 mt-0 text-left">
        <Title level={5}>Detalles de tu cita:</Title>
        <Paragraph>
          <Text strong>Servicio:</Text> {appointmentDetails.serviceName}
        </Paragraph>
        <Paragraph>
          <Text strong>Barbero:</Text> {appointmentDetails.barberName}
        </Paragraph>
        <Paragraph>
          <Text strong>Fecha y hora:</Text> {formattedDate}
        </Paragraph>
        <Paragraph>
          <Text strong>ID de reserva:</Text> {appointmentDetails.id}
        </Paragraph>
      </div>

      <div className="mt-4 flex justify-between">
        <Link href="/">
          <Button type="primary">Volver al inicio</Button>
        </Link>

        {onClose && <Button onClick={onClose}>Cerrar</Button>}
      </div>

      <Paragraph className="mt-6 text-xs text-gray-500">
        Has recibido la confirmación a tu whatsapp. También recibirás un recordatorio de tu cita
        minutos antes.
      </Paragraph>
      <Paragraph className="mt-6 text-xs text-gray-500">
        Si necesitas modificar o cancelar tu reserva, hazlo vía whatsapp con al menos 24 horas de
        anticipación.
      </Paragraph>
    </Card>
  );
};

export default AppointmentSuccess;
