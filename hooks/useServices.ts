import { ServiceRow } from '@/types/services';
import { mapServiceList } from '@/utils/mappers/services';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useGetAllServices(options = {}) {
  const getAll = async () => {
    const response = await fetch('/api/services');
    if (!response.ok) throw new Error('Error fetching services');
    const responseData = (await response.json()) as { data: ServiceRow[] };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };

  const result = useSWR('services', getAll, config);
  const rawData = result?.data || [];
  const services = mapServiceList(rawData || []);

  return {
    ...result,
    services,
    data: services,
  };
}

export function useGetService(id: string, options = {}) {
  const getById = async (id: string) => {
    const response = await fetch(`/api/services/${id}`);
    if (!response.ok) throw new Error('Error fetching service');
    const responseData = (await response.json()) as { data: ServiceRow };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };

  return useSWR(id ? `service-${id}` : null, () => getById(id), config);
}
