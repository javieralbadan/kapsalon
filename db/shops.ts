<<<<<<< Updated upstream
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
=======
'use server';
import { SUPABASE_TABLES } from '@constants/data-base';
import { PostgrestError } from '@supabase/supabase-js';
import { supabaseClient } from '@utils/supabase/client';
// import { createClient } from "@utils/supabase/server";
import type { Database } from 'types/supabase';

type ShowRow = Database['public']['Tables']['shops']['Row'];
type ShowInsert = Database['public']['Tables']['shops']['Insert'];

interface ShowResponseType {
	data: ShowRow | null;
	error: PostgrestError | null;
}

interface ShowsResponseType {
	data: ShowRow[] | null;
	error: PostgrestError | null;
}

export const getShopsFromDB = async (): Promise<ShowsResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(SUPABASE_TABLES.SHOPS).select('*');

	return { data, error };
};

export const getShopByIdFromDB = async (cycleId: string): Promise<ShowResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(SUPABASE_TABLES.SHOPS).select('*').eq('id', cycleId);

	if (data && !error) {
		return { data: data[0] as ShowRow, error };
	}

	return { data, error };
};

export const createShopInDB = async (newShop: ShowInsert): Promise<ShowsResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(SUPABASE_TABLES.SHOPS).insert(newShop).select();

	return { data, error };
>>>>>>> Stashed changes
};
