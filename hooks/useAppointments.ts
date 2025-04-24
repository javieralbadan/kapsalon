import {
  AppointmentDetailsData,
  AppointmentEditionType,
  AppointmentInsert,
  AppointmentRow,
  AppointmentUI,
  AppointmentValidDetailsData,
} from '@/types/appointments';
import {
  mapAppointmentToUpdate,
  mapAppointmentUI,
  mapApptDetailsIntoEditionUI,
} from '@/utils/mappers/appointment';
import { message } from 'antd';
import { useState } from 'react';
import useSWR, { SWRResponse } from 'swr';
import { CACHE_TIMES } from '../constants/cache';
import { useSendConfirmationMessages } from './useSendConfirmationMessages';

const BASE_URL = '/api/appointments';
const CONFIG = {
  dedupingInterval: CACHE_TIMES.ONE_DAY,
};
const HEADERS = {
  'Content-Type': 'application/json',
};

export function useGetAllAppointments() {
  const getAll = async () => {
    const response = await fetch('/api/appointments');

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al obtener las citas');
    }

    const responseData = (await response.json()) as { data: AppointmentRow[] };
    return responseData.data;
  };

  const config = { dedupingInterval: CACHE_TIMES.ONE_HOUR };

  return useSWR('appointments', getAll, config);
}

export function useGetAppointment(id: string) {
  const getById = async (id: string): Promise<AppointmentDetailsData | null> => {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al obtener la cita');
    }

    const responseData = (await response.json()) as { data: AppointmentDetailsData };
    return responseData.data;
  };

  const result: SWRResponse = useSWR(id ? `appointment-${id}` : null, () => getById(id), CONFIG);
  const rawData = (result?.data as AppointmentDetailsData) || {};
  const isInvalidData = !rawData.id || !rawData.customers || !rawData.services || !rawData.staff;

  if (isInvalidData) {
    return {
      data: null,
      isLoading: result.isLoading,
      error: new Error('Cita no encontrada'),
    };
  }

  const apptDetails = mapApptDetailsIntoEditionUI(rawData as AppointmentValidDetailsData);
  return {
    data: apptDetails,
    isLoading: result.isLoading,
    error: result.error as Error,
  };
}

export function useCreateAppointment() {
  return async (newAppointment: AppointmentInsert): Promise<AppointmentUI | null> => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(newAppointment),
    });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al crear la cita');
    }

    const responseData = (await response.json()) as { data: AppointmentRow };
    return mapAppointmentUI(responseData.data);
  };
}

interface UseUpdateAppointmentProps {
  onSuccess: () => void;
  onError: () => void;
}

export function useUpdateAppointment({ onSuccess, onError }: UseUpdateAppointmentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sendConfirmationMessages } = useSendConfirmationMessages();

  const updateAppointmentDateTime = async (apptEditionData: AppointmentEditionType) => {
    try {
      const apptUpdateData = mapAppointmentToUpdate(apptEditionData);
      const response = await fetch(`${BASE_URL}/${apptUpdateData.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify(apptUpdateData),
      });

      if (!response.ok) {
        const errorResponse = (await response.json()) as { error: string };
        throw new Error(errorResponse.error || 'Error al crear la cita');
      }

      const responseData = (await response.json()) as { data: AppointmentRow };
      const apptUpdated = mapAppointmentUI(responseData.data);

      if (!apptUpdated?.id) {
        throw new Error('Error al crear la cita');
      }

      await sendConfirmationMessages({
        appointment: apptUpdated,
        customer: apptEditionData.customer,
        serviceName: apptEditionData.service.name,
        servicePrice: apptEditionData.service.description || '', // Since service is GroupListItem -> description = price
        barberPhone: apptEditionData.barber.phoneNumber,
        shopAddress: apptEditionData.shop.address,
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
    updateAppointmentDateTime,
    isLoading,
  };
}
