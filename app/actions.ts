'use server';
import { createShopInDB, getShopsFromDB } from '@db/shops';
import { PostgrestError } from '@supabase/supabase-js';
import { Database } from 'types/supabase';

type ShowRow = Database['public']['Tables']['shops']['Row'];
type ShowInsert = Database['public']['Tables']['shops']['Insert'];

interface ShowsResponseType {
	data: ShowRow[] | null;
	error: PostgrestError | null;
}

export const fetchShops = async () => {
	const { data, error }: ShowsResponseType = await getShopsFromDB();
	return { data, error };
};

export const createShop = async (newShop: ShowInsert) => {
	const { data, error }: ShowsResponseType = await createShopInDB(newShop);
	return { data, error };
};
