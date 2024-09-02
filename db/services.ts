'use server';
import { ENTITIES } from 'constants/data-base';
import {
	ServiceInsert,
	ServiceResponseType,
	ServiceRow,
	ServicesResponseType,
} from 'types/services';
import { supabaseClient } from 'utils/supabase/client';
// import { createClient } from "utils/supabase/server";

export const getServicesFromDB = async (): Promise<ServicesResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SERVICES).select('*');

	return { data, error };
};

export const getServiceByIdFromDB = async (cycleId: string): Promise<ServiceResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SERVICES).select('*').eq('id', cycleId);

	if (data && !error) {
		return { data: data[0] as ServiceRow, error };
	}

	return { data, error };
};

export const createServiceInDB = async (
	newService: ServiceInsert,
): Promise<ServicesResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SERVICES).insert(newService).select();

	return { data, error };
};
