import { StaffAvailabilityInsert, StaffAvailabilityRow } from '@/types/staffAvailability';
import useSWR, { SWRResponse } from 'swr';
import { CACHE_TIMES } from '../constants/cache';

type ResponseData<T extends boolean> = T extends true
  ? { data: StaffAvailabilityRow[] }
  : { data: StaffAvailabilityRow };

const BASE_URL = '/api/staff-availabilities';
const CONFIG = {
  dedupingInterval: CACHE_TIMES.ONE_HOUR,
};

const fetchStaffAvails = async (
  endpoint: string,
): Promise<StaffAvailabilityRow | StaffAvailabilityRow[]> => {
  // endpoint should start with slash '/staff-member/<member-id>'
  const response = await fetch(`${BASE_URL}${endpoint}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const returnsMultiple = !endpoint || endpoint.split('/').length > 1;

  if (!response.ok) {
    const errorResponse = (await response.json()) as { error: string };
    throw new Error(errorResponse.error || 'Error al obtener las disponibilidades');
  }

  const responseData = (await response.json()) as ResponseData<typeof returnsMultiple>;
  return responseData.data;
};

export function useGetAllAvails() {
  const result = useSWR('staff-availabilities', fetchStaffAvails, CONFIG);
  const availabilities = (result?.data as StaffAvailabilityRow[]) || [];

  return {
    ...result,
    availabilities,
    data: availabilities,
  };
}

export function useGetAvailsByStaff(memberId: string) {
  const result: SWRResponse = useSWR(
    memberId ? `staff-avails-by-member-${memberId}` : null,
    () => fetchStaffAvails(`/staff-member/${memberId}`),
    CONFIG,
  );
  const staffAvails = (result?.data as StaffAvailabilityRow[]) || [];

  return {
    staffAvails,
    data: staffAvails,
    isLoading: result.isLoading,
    error: result.error as Error,
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
