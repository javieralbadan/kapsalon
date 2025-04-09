import { ServiceRow } from '@/types/services';
import { mapServiceList } from '@/utils/mappers/services';
import useSWR, { SWRResponse } from 'swr';
import { CACHE_TIMES } from '../constants/cache';

type ResponseData<T extends boolean> = T extends true
  ? { data: ServiceRow[] }
  : { data: ServiceRow };

const BASE_URL = '/api/services';
const CONFIG = {
  dedupingInterval: CACHE_TIMES.ONE_DAY,
};

const fetchServices = async (endpoint: string): Promise<ServiceRow | ServiceRow[]> => {
  // endpoint should start with slash '/staff-member' || '/${id}'
  const response = await fetch(`${BASE_URL}${endpoint}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const returnsMultiple = !endpoint || endpoint.split('/').length > 1;

  if (!response.ok) {
    const errorResponse = (await response.json()) as { error: string };
    throw new Error(errorResponse.error || 'Error al obtener los servicios');
  }

  const responseData = (await response.json()) as ResponseData<typeof returnsMultiple>;
  return responseData.data;
};

export function useGetAllServices() {
  const result = useSWR('services', fetchServices, CONFIG);
  const rawData = (result?.data as ServiceRow[]) || [];
  const services = mapServiceList(rawData || []);

  return {
    ...result,
    services,
    data: services,
  };
}

export function useGetServicesByStaff(staffId: string) {
  const result: SWRResponse = useSWR(
    staffId ? `services-by-member-${staffId}` : null,
    () => fetchServices(`/staff-member/${staffId}`),
    CONFIG,
  );
  const rawData = (result?.data as ServiceRow[]) || [];
  const services = mapServiceList(rawData || []);

  return {
    services,
    data: services,
    isLoading: result.isLoading,
    error: result.error as Error,
  };
}

export function useGetService(id: string) {
  const result: SWRResponse = useSWR(
    id ? `service-${id}` : null,
    () => fetchServices(`/${id}`),
    CONFIG,
  );
  const rawData = result?.data as ServiceRow;
  const [service] = mapServiceList([rawData]);

  return {
    service,
    data: service,
    isLoading: result.isLoading,
    error: result.error as Error,
  };
}
