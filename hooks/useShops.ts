import { ShopRow } from '@/types/shops';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useGetAllShops(options = {}) {
  const getAll = async () => {
    const response = await fetch('/api/shops');

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al obtener las barberías');
    }

    const responseData = (await response.json()) as { data: ShopRow[] };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_WEEK,
    ...options,
  };

  return useSWR('shops', getAll, config);
}

export function useGetShop(id: string, options = {}) {
  const getById = async (id: string) => {
    const response = await fetch(`/api/shops/${id}`);

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al obtener la barbería');
    }

    const responseData = (await response.json()) as { data: ShopRow };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_WEEK,
    ...options,
  };

  return useSWR(id ? `shop-${id}` : null, () => getById(id), config);
}
