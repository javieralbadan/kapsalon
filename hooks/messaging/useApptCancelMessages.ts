import { WHATSAPP_TEMPLATES } from '@/constants/whatsappTemplates';
import { AppointmentEditionType } from '@/types/appointments';
import { getApptCancelComponents } from '@/utils/messageComponents';
import { message } from 'antd';
import { useWhatsAppMessage } from './useWhatsAppMessage';

const ERROR_MESSAGE = 'Cita actualizada pero falló el envío de confirmaciones al whatsapp';

export const useApptCancelMessages = () => {
  const { sendMessage } = useWhatsAppMessage();

  const sendCancelMessages = async (apptUpdateData: AppointmentEditionType) => {
    const { appt, customer, barber } = apptUpdateData;
    // appt.dateTime is already formatted as martes, 29 de abril, 10:00 a. m.

    try {
      const staffComponents = getApptCancelComponents.staffComponents({
        date: appt.dateTime,
        client: `${customer.firstName} ${customer.lastName}`,
      });
      const clientComponents = getApptCancelComponents.customerComponents({
        date: appt.dateTime,
      });

      const [staffMsg, customerMsg] = await Promise.all([
        sendMessage({
          templateName: WHATSAPP_TEMPLATES.cancelAppt.staff,
          to: barber.phoneNumber,
          components: staffComponents,
        }),
        sendMessage({
          templateName: WHATSAPP_TEMPLATES.cancelAppt.customer,
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

  return { sendCancelMessages };
};
