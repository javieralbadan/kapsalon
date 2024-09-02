'use server';
import { ENTITIES } from 'constants/data-base';
import { ShopInsert, ShopResponseType, ShopRow, ShopsResponseType } from 'types/shops';
import { supabaseClient } from 'utils/supabase/client';
// import { createClient } from "utils/supabase/server";

export const getShopsFromDB = async (): Promise<ShopsResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SHOPS).select('*');

	return { data, error };
};

export const getShopByIdFromDB = async (cycleId: string): Promise<ShopResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SHOPS).select('*').eq('id', cycleId);

	if (data && !error) {
		return { data: data[0] as ShopRow, error };
	}

	return { data, error };
};

export const createShopInDB = async (newShop: ShopInsert): Promise<ShopsResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SHOPS).insert(newShop).select();

	return { data, error };
};
