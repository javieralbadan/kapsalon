import { PostgrestError } from '@supabase/supabase-js';
import { ShopInsert, ShopResponseType, ShopRow, ShopsResponseType } from 'types/shops';
import { supabaseClient } from 'utils/supabase/client';

const SHOPS = 'shops';

export const getShopsFromDB = async (): Promise<ShopsResponseType> => {
	try {
		const { data, error }: ShopsResponseType = await supabaseClient.from(SHOPS).select('*');
		if (error) {
			console.error('🔎 Error fetching shops:', error);
			return { data: [], error };
		}

		return { data, error: null };
	} catch (error) {
		console.error('🔎 Error fetching shops:', error);
		return { data: [], error: error as PostgrestError | null };
	}
};

export const getShopByIdFromDB = async (shopId: string): Promise<ShopResponseType> => {
	const { data, error } = await supabaseClient.from(SHOPS).select('*').eq('id', shopId);

	if (!data && error) {
		console.error('🔎 Error fetching shop by id:', error);
		return { data: null, error };
	}

	return { data: data[0] as ShopRow, error: null };
};

export const createShopInDB = async (newShop: ShopInsert): Promise<ShopsResponseType> => {
	const { data, error } = await supabaseClient.from(SHOPS).insert(newShop).select();

	if (!data && error) {
		console.error('🔎 Error creating shop:', error);
		return { data: null, error };
	}

	return { data, error: null };
};
