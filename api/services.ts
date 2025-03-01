import {
	ServiceInsert,
	ServiceResponseType,
	ServiceRow,
	ServicesResponseType,
} from '@/types/services';
import { supabaseClient } from '@/utils/supabase/client';

const SERVICES = 'services';

export const getServicesFromDB = async (): Promise<ServicesResponseType> => {
	const { data, error } = await supabaseClient.from(SERVICES).select('*');
	if (error) {
		console.error('🔎 Error fetching services:', error);
		throw error;
	}
	console.log('🚀 ~ API:getServicesFromDB:', data);
	return { data, error: null };
};

export const getServiceByIdFromDB = async (serviceId: string): Promise<ServiceResponseType> => {
	const { data, error } = await supabaseClient.from(SERVICES).select('*').eq('id', serviceId);
	if (error) {
		console.error('🔎 Error fetching service by id:', error);
		throw error;
	}
	console.log('🚀 ~ API:getServiceByIdFromDB:', data[0]);
	return { data: data[0] as ServiceRow, error: null };
};

export const createServiceInDB = async (
	newService: ServiceInsert,
): Promise<ServicesResponseType> => {
	const { data, error } = await supabaseClient.from(SERVICES).insert(newService).select();
	if (error) {
		console.error('🔎 Error creating service:', error);
		throw error;
	}
	console.log('🚀 ~ API:getServiceByIdFromDB:', data[0]);
	return { data, error: null };
};
