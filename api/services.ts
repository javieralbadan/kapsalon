import {
  ServiceInsert,
  ServiceResponseType,
  ServiceRow,
  ServicesResponseType,
} from '@/types/services';
import { supabaseClient } from '@/utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

const SERVICES = 'services';

export const getServicesFromDB = async (): Promise<ServicesResponseType> => {
	try {
		const { data, error }: ServicesResponseType = await supabaseClient.from(SERVICES).select('*');
		if (error) {
			console.error('🔎 Error fetching services:', error);
			return { data: [], error };
		}

		return { data, error: null };
	} catch (error) {
		console.error('🔎 Error fetching services:', error);
		return { data: [], error: error as PostgrestError | null };
	}
};

export const getServiceByIdFromDB = async (serviceId: string): Promise<ServiceResponseType> => {
	const { data, error } = await supabaseClient.from(SERVICES).select('*').eq('id', serviceId);

	if (!data && error) {
		console.error('🔎 Error fetching service by id:', error);
		return { data: null, error };
	}

	return { data: data[0] as ServiceRow, error: null };
};

export const createServiceInDB = async (
	newService: ServiceInsert,
): Promise<ServicesResponseType> => {
	const { data, error } = await supabaseClient.from(SERVICES).insert(newService).select();

	if (!data && error) {
		console.error('🔎 Error creating service:', error);
		return { data: null, error };
	}

	return { data, error: null };
};
