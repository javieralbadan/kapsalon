import { formatDateTime } from '@/utils/formatters';
import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Card, Result, Typography } from 'antd';
import Link from 'next/link';

const { Paragraph, Text } = Typography;

interface Props {
  appointmentDetails: {
    serviceName: string;
    barberName: string;
    dateTime: string;
  };
}

const AppointmentSuccess = ({ appointmentDetails }: Props) => {
  const formattedDate = formatDateTime({ dateString: appointmentDetails.dateTime });

  return (
    <Card className="m-auto max-w-[500px] text-center">
      <Result
        icon={<CheckCircleFilled style={{ color: '#52c41a' }} />}
        status="success"
        title="¡Cita confirmada!"
        subTitle="Los detalles han sido enviados a tu whatsapp"
        style={{ padding: '0 0 24px 0' }}
      />

      <Paragraph>
        <Text strong>Servicio:</Text> {appointmentDetails.serviceName}
      </Paragraph>
      <Paragraph>
        <Text strong>Barbero:</Text> {appointmentDetails.barberName}
      </Paragraph>
      <Paragraph>
        <Text strong>Fecha:</Text> {formattedDate}
      </Paragraph>

      <div className="mt-6 flex justify-center">
        <Link href="/">
          <Button type="primary">Volver al inicio</Button>
        </Link>
        {/* TODO: Add share button or add to calendar */}
      </div>

      <Paragraph className="mt-6 text-xs text-gray-500">
        Vía whatsapp puedes modificar o cancelar tu cita, con al menos 24 horas de anticipación.
      </Paragraph>
      <Paragraph className="text-xs text-gray-500">
        También recibirás un recordatorio de tu cita minutos antes.
      </Paragraph>
    </Card>
  );
};

export default AppointmentSuccess;
