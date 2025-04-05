import { AppointmentUI } from '@/types/appointments';
import { CustomerUI } from '@/types/customers';
import { formatDateTime } from '@/utils/formatters';
import {
  getCustomerConfirmationComponents,
  getStaffConfirmationComponents,
} from '@/utils/messageComponents';
import { message } from 'antd';
import { useSendWhatsAppMessage } from './useSendWhatsAppMessage';

const ERROR_MESSAGE = 'Cita creada pero falló el envío de la confirmación al whatsapp';

interface Props {
  appointment: AppointmentUI;
  customer: CustomerUI;
  serviceName: string;
  servicePrice: string;
  barberPhone: string;
  shopAddress: string;
}

export const useSendConfirmationMessages = () => {
  const { sendMessage } = useSendWhatsAppMessage();

  const sendConfirmationMessages = async ({
    appointment,
    customer,
    serviceName,
    servicePrice,
    barberPhone,
    shopAddress,
  }: Props) => {
    try {
      const formattedDate = formatDateTime({ dateString: appointment.dateTime });

      const staffComponents = getStaffConfirmationComponents({
        date: formattedDate,
        service: serviceName,
        price: servicePrice,
        client: `${customer.firstName} ${customer.lastName}`,
      });
      const clientComponents = getCustomerConfirmationComponents({
        service: serviceName,
        price: servicePrice,
        date: formattedDate,
        address: shopAddress,
        appointmentId: appointment.id,
      });

      const [staffMsg, customerMsg] = await Promise.all([
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

      if (!staffMsg.success || !customerMsg.success) {
        message.warning(ERROR_MESSAGE);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      message.warning(ERROR_MESSAGE);
    }
  };

  return { sendConfirmationMessages };
};
