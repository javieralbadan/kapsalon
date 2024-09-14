import { PostgrestError } from '@supabase/supabase-js';
import { StaffAvailabilitiesResponseType } from 'types/staffAvailability';
import { supabaseClient } from 'utils/supabase/client';

const AVAILABILITY = 'staff_availability';

export const getAvailabilitiesFromDB = async (): Promise<StaffAvailabilitiesResponseType> => {
	try {
		const { data, error }: StaffAvailabilitiesResponseType = await supabaseClient
			.from(AVAILABILITY)
			.select('*');
		if (error) {
			console.error('🔎 Error fetching staff members:', error);
			return { data: [], error };
		}

		return { data, error: null };
	} catch (error) {
		console.error('🔎 Error fetching staff members:', error);
		return { data: [], error: error as PostgrestError | null };
	}
};
