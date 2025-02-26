import { StaffAvailabilitiesResponseType, StaffAvailabilityInsert } from '@/types/staffAvailability';
import { supabaseClient } from '@/utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

const AVAILABILITY = 'staff_availability';

export const getAvailabilitiesFromDB = async (): Promise<StaffAvailabilitiesResponseType> => {
	try {
		const { data, error }: StaffAvailabilitiesResponseType = await supabaseClient
			.from(AVAILABILITY)
			.select('*');
		if (!data || error) {
			console.error('🔎 Error in DB fetching staff members:', error);
			return { data: [], error };
		}

		return { data, error: null };
	} catch (error) {
		console.error('🔎 Error fetching staff members:', error);
		return { data: [], error: error as PostgrestError | null };
	}
};

export const createAvailabilityInDB = async (
	newRange: StaffAvailabilityInsert,
): Promise<StaffAvailabilitiesResponseType> => {
	try {
		const { data, error } = await supabaseClient.from(AVAILABILITY).insert(newRange).select();
		console.log({ data, error });

		if (!data || error) {
			console.error('🔎 Error in DB creating availability:', error);
			return { data: null, error };
		}

		return { data, error: null };
	} catch (error) {
		console.error('🔎 Error creating availability:', error);
		return { data: [], error: error as PostgrestError | null };
	}
};
