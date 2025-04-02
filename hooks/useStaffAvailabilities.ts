import { StaffAvailabilityInsert, StaffAvailabilityRow } from '@/types/staffAvailability';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useGetAllAvails(options = {}) {
  const getAll = async () => {
    const response = await fetch('/api/staff-availabilities');

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al obtener las disponibilidades');
    }

    const responseData = (await response.json()) as { data: StaffAvailabilityRow[] };
    return responseData.data;
  };

  const config = {
    // TODO: Change to 1 hour
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };

  const result = useSWR('staff-availabilties', getAll, config);
  const availabilities = result?.data || [];

  return {
    ...result,
    availabilities,
    data: availabilities,
  };
}

export function useCreateAvailability() {
  return async (newRange: StaffAvailabilityInsert) => {
    const response = await fetch('/api/staff-availabilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRange),
    });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al crear la disponibilidad');
    }

    return response.json() as Promise<StaffAvailabilityRow>;
  };
}
