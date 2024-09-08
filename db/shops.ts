'use server';
import { ENTITIES } from 'constants/data-base';
import { ShopInsert, ShopResponseType, ShopRow, ShopsResponseType } from 'types/shops';
import { supabaseClient } from 'utils/supabase/client';
// import { createClient } from "utils/supabase/server";

export const getShopsFromDB = async (): Promise<ShopsResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SHOPS).select('*');

	if (error) {
		console.error('🔎 Error fetching shops:', error);
		return { data: [], error };
	}

	return { data, error: null };
};

export const getShopByIdFromDB = async (shopId: string): Promise<ShopResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SHOPS).select('*').eq('id', shopId);

	if (!data && error) {
		console.error('🔎 Error fetching shop by id:', error);
		return { data: null, error };
	}

	return { data: data[0] as ShopRow, error: null };
};

export const createShopInDB = async (newShop: ShopInsert): Promise<ShopsResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SHOPS).insert(newShop).select();

	if (!data && error) {
		console.error('🔎 Error creating shop:', error);
		return { data: null, error };
	}

	return { data, error: null };
};
