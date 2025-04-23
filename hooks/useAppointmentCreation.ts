import { AppointmentCreationType } from '@/types/appointments';
import { CustomerUI } from '@/types/customers';
import { FormUserInfoType } from '@/types/messages';
import { mapAppointmentToInsert } from '@/utils/mappers/appointment';
import { mapCustomerToInsert, mapCustomerUI } from '@/utils/mappers/customer';
import { message } from 'antd';
import { useState } from 'react';
import { useCreateAppointment } from './useAppointments';
import { fetchCustomer, useCreateCustomer } from './useCustomers';
import { useSendConfirmationMessages } from './useSendConfirmationMessages';

interface Props {
  onSuccess: () => void;
  onError: () => void;
}

export const useAppointmentCreation = ({ onSuccess, onError }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createdCustomer, setCreatedCustomer] = useState<CustomerUI | null>(null);

  const createCustomer = useCreateCustomer();
  const createAppointment = useCreateAppointment();
  const { sendConfirmationMessages } = useSendConfirmationMessages();

  const createCustomerAndAppointment = async (
    customerParam: FormUserInfoType,
    appointmentData: AppointmentCreationType,
  ) => {
    if (!customerParam) {
      message.error('Por favor completa tu información personal');
      return false;
    }

    setIsLoading(true);

    try {
      const data = await fetchCustomer({ endpoint: 'phone', id: customerParam.phone });
      let finalCustomer: CustomerUI | null;

      if (data) {
        finalCustomer = mapCustomerUI(data);
        message.success('Usuario ya existente');
      } else {
        const customerInsertData = mapCustomerToInsert(customerParam);
        finalCustomer = await createCustomer(customerInsertData);
      }

      if (!finalCustomer?.id) {
        throw new Error('Error al crear o recuperar el cliente');
      }

      setCreatedCustomer(finalCustomer);
      const appointmentInsertData = mapAppointmentToInsert(appointmentData, finalCustomer.id);
      const appointmentResponse = await createAppointment(appointmentInsertData);

      if (!appointmentResponse?.id) {
        throw new Error('Error al crear la cita');
      }

      await sendConfirmationMessages({
        appointment: appointmentResponse,
        customer: finalCustomer,
        serviceName: appointmentData.service.name,
        servicePrice: appointmentData.service.description || '', // Since service is GroupListItem -> description = price
        barberPhone: appointmentData.barber.phoneNumber,
        shopAddress: appointmentData.shop.address,
      });
      onSuccess();

      return true;
    } catch (error) {
      message.error(`${error as string}`, 8);
      onError();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCustomerAndAppointment,
    isLoading,
    createdCustomer,
  };
};
