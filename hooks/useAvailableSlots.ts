import { CACHE_TIMES } from '@/constants/cache';
import { StaffAvailableSlotsApiResponse } from '@/types/staffAvailability';
import useSWRInfinite from 'swr/infinite';

const BASE_URL = '/api/available-slots';

const fetcher = async (url: string): Promise<StaffAvailableSlotsApiResponse> => {
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = (await response.json()) as { error: string };
    throw new Error(errorData.error || 'Error obteniendo los slots disponibles');
  }

  return response.json() as Promise<StaffAvailableSlotsApiResponse>;
};

export const useAvailableSlots = (barberId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isLoading, size, setSize } = useSWRInfinite<StaffAvailableSlotsApiResponse>(
    (pageIndex) => (barberId ? `${BASE_URL}/${barberId}?page=${pageIndex}` : null),
    fetcher,
    {
      revalidateOnMount: true,
      revalidateFirstPage: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: CACHE_TIMES.ONE_MINUTE,
      dedupingInterval: CACHE_TIMES.ONE_MINUTE,
      // parallel: true,
    },
  );

  // Aplanar los slots de todas las páginas
  const slots = data?.flatMap((page) => page.data) || [];
  // Obtener estado de paginación
  const lastPage = data?.[data.length - 1];
  const pagination = lastPage?.pagination || { hasMore: false };

  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');

  const loadMore = async () => {
    if (pagination.hasMore && !isLoadingMore) {
      await setSize(size + 1);
    }
  };

  return {
    slots,
    isLoading: isLoading && !data,
    isLoadingMore,
    error: error as Error | undefined,
    pagination,
    loadMore,
  };
};
