import { WHATSAPP_TEMPLATES } from '@/constants/whatsappTemplates';
import { AppointmentEditionType } from '@/types/appointments';
import { formatDateTime } from '@/utils/formatters';
import { getApptEditionComponents } from '@/utils/messageComponents';
import { message } from 'antd';
import { useWhatsAppMessage } from './useWhatsAppMessage';

const ERROR_MESSAGE = 'Cita actualizada pero falló el envío de confirmaciones al whatsapp';

export const useApptEditionMessages = () => {
  const { sendMessage } = useWhatsAppMessage();

  const sendEditionMessages = async (apptUpdateData: AppointmentEditionType) => {
    const { appt, dateTime, customer, barber } = apptUpdateData;
    const newDateTime = dateTime.name; // formatted as martes, 29 de abril, 10:00 a. m.
    const originalDate = formatDateTime({ dateString: appt.dateTimeISO || '' });

    try {
      const staffComponents = getApptEditionComponents.staffComponents({
        date: newDateTime,
        client: `${customer.firstName} ${customer.lastName}`,
        original_date: originalDate,
        appointmentId: appt.id,
      });
      const clientComponents = getApptEditionComponents.customerComponents({
        date: newDateTime,
        appointmentId: appt.id,
      });

      const [staffMsg, customerMsg] = await Promise.all([
        sendMessage({
          templateName: WHATSAPP_TEMPLATES.updateAppt.staff,
          to: barber.phoneNumber,
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

  return { sendEditionMessages };
};
