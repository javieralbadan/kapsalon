import { AppointmentInsert, AppointmentRow, AppointmentUI } from '@/types/appointments';
import { mapAppointmentUI } from '@/utils/mappers/appointment';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useGetAllAppointments() {
  const getAll = async () => {
    const response = await fetch('/api/appointments');
    if (!response.ok) throw new Error('Error fetching appointments');
    const responseData = (await response.json()) as { data: AppointmentRow[] };
    return responseData.data;
  };

  const config = { dedupingInterval: CACHE_TIMES.ONE_HOUR };

  return useSWR('appointments', getAll, config);
}

export function useGetAppointment(id: string) {
  const getById = async (id: string) => {
    const response = await fetch(`/api/appointments/${id}`);
    if (!response.ok) throw new Error('Error fetching appointment');
    const responseData = (await response.json()) as { data: AppointmentRow };
    return responseData.data;
  };

  const config = { dedupingInterval: CACHE_TIMES.ONE_HOUR };

  return useSWR(id ? `appointment-${id}` : null, () => getById(id), config);
}

export function useCreateAppointment() {
  return async (newAppointment: AppointmentInsert): Promise<AppointmentUI | null> => {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    });

    if (!response.ok) throw new Error('Error creating appointment');

    const responseData = (await response.json()) as { data: AppointmentRow };
    return mapAppointmentUI(responseData.data);
  };
}
