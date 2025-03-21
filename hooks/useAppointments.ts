import { AppointmentInsert, AppointmentRow } from '@/types/appointments';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useGetAllAppointments(options = {}) {
  const getAll = async () => {
    const response = await fetch('/api/appointments');
    if (!response.ok) throw new Error('Error fetching appointments');
    const responseData = (await response.json()) as { data: AppointmentRow[] };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_HOUR,
    ...options,
  };

  return useSWR('appointments', getAll, config);
}

export function useGetAppointment(id: string, options = {}) {
  const getById = async (id: string) => {
    const response = await fetch(`/api/appointments/${id}`);
    if (!response.ok) throw new Error('Error fetching appointment');
    const responseData = (await response.json()) as { data: AppointmentRow };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_HOUR,
    ...options,
  };

  return useSWR(id ? `appointment-${id}` : null, () => getById(id), config);
}

export function useCreateAppointment() {
  return async (newAppointment: AppointmentInsert) => {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAppointment),
    });

    if (!response.ok) throw new Error('Error creating appointment');

    return response.json() as Promise<AppointmentRow>;
  };
}
