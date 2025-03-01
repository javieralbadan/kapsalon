import { getShopByIdFromDB, getShopsFromDB } from '@/api/shops';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useShops(options = {}) {
	const config = {
		dedupingInterval: CACHE_TIMES.ONE_WEEK,
		...options,
	};
	return useSWR('shops', getShopsFromDB, config);
}

export function useShop(id: string, options = {}) {
	const config = {
		dedupingInterval: CACHE_TIMES.ONE_WEEK,
		...options,
	};
	return useSWR(id ? `shop-${id}` : null, () => getShopByIdFromDB(id), config);
}
