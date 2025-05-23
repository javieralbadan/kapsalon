import {
  AppointmentDetailsData,
  AppointmentEditionType,
  AppointmentInsert,
  AppointmentRow,
  AppointmentUI,
  AppointmentValidDetailsData,
} from '@/types/appointments';
import {
  mapAppointmentToCancel,
  mapAppointmentToUpdate,
  mapAppointmentUI,
  mapApptDetailsIntoEditionUI,
} from '@/utils/mappers/appointment';
import { message } from 'antd';
import { useState } from 'react';
import useSWR, { SWRResponse } from 'swr';
import { CACHE_TIMES } from '../constants/cache';
import { useApptCancelMessages } from './messaging/useApptCancelMessages';
import { useApptEditionMessages } from './messaging/useApptEditionMessages';

const BASE_URL = '/api/appointments';
const CONFIG = {
  dedupingInterval: CACHE_TIMES.ONE_MINUTE,
};
const HEADERS = {
  'Content-Type': 'application/json',
};

export function useGetApptsByStaff(memberId: string) {
  const fetcher = async (): Promise<AppointmentDetailsData[] | null> => {
    const response = await fetch(`${BASE_URL}/staff-member/${memberId}`);

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al obtener las citas');
    }

    const responseData = (await response.json()) as { data: AppointmentDetailsData[] };
    return responseData.data;
  };

  const swrKey = memberId ? `appointments-by-member-${memberId}` : null;
  const result: SWRResponse = useSWR(swrKey, () => fetcher(), CONFIG);
  const rawData = (result?.data as AppointmentDetailsData[]) || [];
  const staffAppts = rawData.map((item) =>
    mapApptDetailsIntoEditionUI(item as AppointmentValidDetailsData),
  );

  return {
    data: staffAppts, // staffAppts is AppointmentEditionType
    isLoading: result.isLoading,
    error: result.error as Error,
  };
}

export function useGetAppointment(id: string) {
  const getById = async (): Promise<AppointmentDetailsData | null> => {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al obtener la cita');
    }

    const responseData = (await response.json()) as { data: AppointmentDetailsData };
    return responseData.data;
  };

  const swrKey = id ? `appointment-${id}` : null;
  const result: SWRResponse = useSWR(swrKey, () => getById(), CONFIG);
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
    data: apptDetails, // apptDetails is AppointmentEditionType
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
  const { sendEditionMessages } = useApptEditionMessages();

  const updateAppointmentDateTime = async (apptEditionData: AppointmentEditionType) => {
    setIsLoading(true);
    try {
      const apptUpdateData = mapAppointmentToUpdate(apptEditionData);
      const response = await fetch(`${BASE_URL}/${apptUpdateData.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify(apptUpdateData),
      });

      if (!response.ok) {
        const errorResponse = (await response.json()) as { error: string };
        throw new Error(errorResponse.error || 'Error al actualizar la cita');
      }

      const responseData = (await response.json()) as { data: AppointmentRow };
      const apptUpdated = mapAppointmentUI(responseData.data);

      if (!apptUpdated?.id) {
        throw new Error('Error al actualizar la cita');
      }

      await sendEditionMessages(apptEditionData);
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

export function useCancelAppointment({ onSuccess, onError }: UseUpdateAppointmentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sendCancelMessages } = useApptCancelMessages();

  const cancelAppointment = async (apptEditionData: AppointmentEditionType) => {
    setIsLoading(true);
    try {
      const apptCancelData = mapAppointmentToCancel();
      const response = await fetch(`${BASE_URL}/${apptEditionData.appt.id}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify(apptCancelData),
      });

      if (!response.ok) {
        const errorResponse = (await response.json()) as { error: string };
        throw new Error(errorResponse.error || 'Error al cancelar la cita');
      }

      const responseData = (await response.json()) as { data: AppointmentRow };
      const apptUpdated = mapAppointmentUI(responseData.data);

      if (!apptUpdated?.id) {
        throw new Error('Error al cancelar la cita');
      }

      await sendCancelMessages(apptEditionData);
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
    cancelAppointment,
    isLoading,
  };
}
