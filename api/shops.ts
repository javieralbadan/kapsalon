import { ShopInsert, ShopResponseType, ShopRow, ShopsResponseType } from '@/types/shops';
import { supabaseClient } from '@/utils/supabase/client';

const SHOPS = 'shops';

export const getShopsFromDB = async (): Promise<ShopsResponseType> => {
	const { data, error } = await supabaseClient.from(SHOPS).select('*');
	if (error) {
		console.error('🔎 Error fetching shops:', error);
		throw error;
	}
	console.log('🚀 ~ API:getShopsFromDB:', data);
	return { data, error: null };
};

export const getShopByIdFromDB = async (shopId: string): Promise<ShopResponseType> => {
	const { data, error } = await supabaseClient.from(SHOPS).select('*').eq('id', shopId);
	if (error) {
		console.error('🔎 Error fetching shop by id:', error);
		throw error;
	}
	console.log('🚀 ~ API:getShopByIdFromDB:', data[0]);
	return { data: data[0] as ShopRow, error: null };
};

export const createShopInDB = async (newShop: ShopInsert): Promise<ShopsResponseType> => {
	const { data, error } = await supabaseClient.from(SHOPS).insert(newShop).select();
	if (error) {
		console.error('🔎 Error creating shop:', error);
		throw error;
	}
	console.log('🚀 ~ API:createShopInDB:', data);
	return { data, error: null };
};
