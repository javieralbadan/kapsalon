import { WHATSAPP_TEMPLATES } from '@/constants/whatsappTemplates';
import { AppointmentUI } from '@/types/appointments';
import { CustomerUI } from '@/types/customers';
import { getApptEditionComponents } from '@/utils/messageComponents';
import { message } from 'antd';
import { useWhatsAppMessage } from './useWhatsAppMessage';

const ERROR_MESSAGE = 'Cita actualizada pero falló el envío de confirmaciones al whatsapp';

interface Props {
  appointment: AppointmentUI;
  customer: CustomerUI;
  barberPhone: string;
}

export const useApptEditionMessages = () => {
  const { sendMessage } = useWhatsAppMessage();

  const sendConfirmationMessages = async ({ appointment, customer, barberPhone }: Props) => {
    try {
      const staffComponents = getApptEditionComponents.staffComponents({
        date: appointment.dateTime,
        client: `${customer.firstName} ${customer.lastName}`,
        original_date: appointment.dateTimeISO || '',
        appointmentId: appointment.id,
      });
      const clientComponents = getApptEditionComponents.customerComponents({
        date: appointment.dateTime,
        appointmentId: appointment.id,
      });

      const [staffMsg, customerMsg] = await Promise.all([
        sendMessage({
          templateName: WHATSAPP_TEMPLATES.updateAppt.staff,
          to: barberPhone,
          components: staffComponents,
        }),
        sendMessage({
          templateName: WHATSAPP_TEMPLATES.updateAppt.customer,
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
