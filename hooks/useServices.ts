import { getServiceByIdFromDB, getServicesFromDB } from '@/api/services';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useServices(options = {}) {
  const config = {
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };
  return useSWR('services', getServicesFromDB, config);
}

export function useService(id: string, options = {}) {
  const config = {
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };
  return useSWR(id ? `service-${id}` : null, () => getServiceByIdFromDB(id), config);
}
