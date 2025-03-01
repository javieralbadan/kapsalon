import {
	StaffAvailabilitiesResponseType,
	StaffAvailabilityInsert,
} from '@/types/staffAvailability';
import { supabaseClient } from '@/utils/supabase/client';

const AVAILABILITY = 'staff_availability';

export const getAvailabilitiesFromDB = async (): Promise<StaffAvailabilitiesResponseType> => {
	const { data, error } = await supabaseClient.from(AVAILABILITY).select('*');
	if (error) {
		console.error('🔎 Error fetching staff_availability:', error);
		throw error;
	}
	console.log('🚀 ~ API:getAvailabilitiesFromDB:', data);
	return { data, error: null };
};

export const createAvailabilityInDB = async (
	newRange: StaffAvailabilityInsert,
): Promise<StaffAvailabilitiesResponseType> => {
	const { data, error } = await supabaseClient.from(AVAILABILITY).insert(newRange).select();
	if (error) {
		console.error('🔎 Error creating staff_availability:', error);
		throw error;
	}
	console.log('🚀 ~ API:getAvailabilitiesFromDB:', data);
	return { data, error: null };
};
