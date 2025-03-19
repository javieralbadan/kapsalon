import { createAppointmentInDB } from '@/api/appointments';
import { createCustomerInDB } from '@/api/customers';
import { AppointmentCreationType } from '@/types/appointments';
import { CustomerRow } from '@/types/customers';
import { FormUserInfoType } from '@/types/messages';
import { mapAppointmentToInsert, mapCustomerToInsert } from '@/utils/mappers/appointment';
import { message, notification } from 'antd';
import { useState } from 'react';

interface Props {
  onSuccess?: (customerData: CustomerRow, appointmentId: string) => void;
  onError?: (error: Error) => void;
  showSuccessNotification?: boolean;
}

export const useAppointmentCreation = ({
  onSuccess,
  onError,
  showSuccessNotification = true,
}: Props = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createdCustomer, setCreatedCustomer] = useState<CustomerRow | null>(null);
  const [createdAppointmentId, setCreatedAppointmentId] = useState<string | null>(null);

  const createCustomerAndAppointment = async (
    customerInfo: FormUserInfoType,
    appointmentData: AppointmentCreationType,
  ) => {
    if (!customerInfo) {
      message.error('Por favor completa tu información personal');
      return false;
    }

    setIsLoading(true);

    try {
      // 1. Map and create customer
      const customerInsertData = mapCustomerToInsert(customerInfo);
      const customerResponse = await createCustomerInDB(customerInsertData);

      if (!customerResponse.data || !customerResponse.data[0]?.id) {
        throw new Error('Error al crear el cliente');
      }

      const customerId = customerResponse.data[0].id;
      const customerData = customerResponse.data[0];
      setCreatedCustomer(customerData);

      // 2. Map and create appointment
      const appointmentInsertData = mapAppointmentToInsert(appointmentData, customerId);
      const appointmentResponse = await createAppointmentInDB(appointmentInsertData);

      if (!appointmentResponse.data || !appointmentResponse.data[0]?.id) {
        throw new Error('Error al crear la cita');
      }

      const appointmentId = appointmentResponse.data[0].id;
      setCreatedAppointmentId(appointmentId);

      console.log('✅ Cliente y cita creados exitosamente:', {
        customer: customerData,
        appointment: appointmentResponse.data[0],
      });

      // Show success notification if needed
      if (showSuccessNotification) {
        notification.success({
          message: '¡Cita confirmada!',
          description: `${customerData.first_name}, tu cita para ${appointmentData.service.name} con ${appointmentData.barber.name} ha sido confirmada para el ${appointmentData.dayTime.name}.`,
          duration: 6,
        });
      }

      // Call success callback
      if (onSuccess) {
        onSuccess(customerData, appointmentId);
      }
    } catch (error) {
      console.error('❌ Error en la creación de cliente y cita:', error);
      message.error('Ha ocurrido un error al confirmar tu cita. Por favor intenta nuevamente.');
      if (onError) {
        onError(error as Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCustomerAndAppointment,
    isLoading,
    createdCustomer,
    createdAppointmentId,
  };
};
