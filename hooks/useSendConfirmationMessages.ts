import { AppointmentUI } from '@/types/appointments';
import { CustomerUI } from '@/types/customers';
import { formatDateTime } from '@/utils/formatters';
import {
  getCustomerConfirmationComponents,
  getStaffConfirmationComponents,
} from '@/utils/messageComponents';
import { message } from 'antd';
import { useSendWhatsAppMessage } from './useSendWhatsAppMessage';

interface Props {
  appointment: AppointmentUI;
  customer: CustomerUI;
  serviceName: string;
  barberPhone: string;
  shopAddress: string;
}

export const useSendConfirmationMessages = () => {
  const { sendMessage } = useSendWhatsAppMessage();

  const sendConfirmationMessages = async ({
    appointment,
    customer,
    serviceName,
    barberPhone,
    shopAddress,
  }: Props) => {
    try {
      const formattedDate = formatDateTime({ dateString: appointment.dateTime });

      const staffComponents = getStaffConfirmationComponents({
        date: formattedDate,
        service: serviceName,
        client: `${customer.firstName} ${customer.lastName}`,
      });
      const clientComponents = getCustomerConfirmationComponents({
        service: serviceName,
        date: formattedDate,
        address: shopAddress,
        appointmentId: appointment.id,
      });

      await Promise.all([
        sendMessage({
          templateName: 'confirm_appointment_staff',
          to: barberPhone,
          components: staffComponents,
        }),
        sendMessage({
          templateName: 'confirm_appointment_user',
          to: customer.phoneNumber,
          components: clientComponents,
        }),
      ]);
      message.success('Se ha creado la cita y se han enviado las confirmaciones');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      message.warning('Cita creada pero falló el envío de la confirmación al whatsapp');
    }
  };

  return { sendConfirmationMessages };
};
