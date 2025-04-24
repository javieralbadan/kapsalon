import { WHATSAPP_TEMPLATES } from '@/constants/whatsappTemplates';
import { AppointmentUI } from '@/types/appointments';
import { CustomerUI } from '@/types/customers';
import { getApptCreationComponents } from '@/utils/messageComponents';
import { message } from 'antd';
import { useWhatsAppMessage } from './useWhatsAppMessage';

const ERROR_MESSAGE = 'Cita creada pero falló el envío de confirmaciones al whatsapp';

interface Props {
  appointment: AppointmentUI;
  customer: CustomerUI;
  serviceName: string;
  servicePrice: string;
  barberPhone: string;
  shopAddress: string;
}

export const useApptCreationMessages = () => {
  const { sendMessage } = useWhatsAppMessage();

  const sendConfirmationMessages = async ({
    appointment,
    customer,
    serviceName,
    servicePrice,
    barberPhone,
    shopAddress,
  }: Props) => {
    try {
      const staffComponents = getApptCreationComponents.staffComponents({
        date: appointment.dateTime,
        service: serviceName,
        price: servicePrice,
        client: `${customer.firstName} ${customer.lastName}`,
        appointmentId: appointment.id,
      });
      const clientComponents = getApptCreationComponents.customerComponents({
        service: serviceName,
        price: servicePrice,
        date: appointment.dateTime,
        address: shopAddress,
        appointmentId: appointment.id,
      });

      const [staffMsg, customerMsg] = await Promise.all([
        sendMessage({
          templateName: WHATSAPP_TEMPLATES.confirmAppt.staff.main,
          to: barberPhone,
          components: staffComponents,
        }),
        sendMessage({
          templateName: WHATSAPP_TEMPLATES.confirmAppt.customer.main,
          to: customer.phoneNumber,
          components: clientComponents,
        }),
      ]);

      if (!staffMsg.success || !customerMsg.success) {
        message.warning(ERROR_MESSAGE);
      }
    } catch {
      message.warning(ERROR_MESSAGE);
    }
  };

  return { sendConfirmationMessages };
};
