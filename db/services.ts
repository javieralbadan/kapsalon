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

	if (error) {
		console.error('🔎 Error fetching services:', error);
		return { data: [], error };
	}

	return { data, error: null };
};

export const getServiceByIdFromDB = async (serviceId: string): Promise<ServiceResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SERVICES).select('*').eq('id', serviceId);

	if (!data && error) {
		console.error('🔎 Error fetching service by id:', error);
		return { data: null, error };
	}

	return { data: data[0] as ServiceRow, error: null };
};

export const createServiceInDB = async (
	newService: ServiceInsert,
): Promise<ServicesResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.SERVICES).insert(newService).select();

	if (!data && error) {
		console.error('🔎 Error creating service:', error);
		return { data: null, error };
	}

	return { data, error: null };
};
