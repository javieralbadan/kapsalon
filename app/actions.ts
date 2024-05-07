'use server';
import { createShopInDB, getShopsFromDB } from 'db/shops';
import { ShopInsert, ShopsResponseType } from 'types/shops';

export const fetchShops = async () => {
	const { data, error }: ShopsResponseType = await getShopsFromDB();
	return { data, error };
};

export const createShop = async (newShop: ShopInsert) => {
	const { data, error }: ShopsResponseType = await createShopInDB(newShop);
	return { data, error };
};
