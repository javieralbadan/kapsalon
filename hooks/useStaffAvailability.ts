import { createAvailabilityInDB, getAvailabilitiesFromDB } from '@/api/staffAvailability';
import { StaffAvailabilityInsert } from '@/types/staffAvailability';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useStaffAvailabilities(options = {}) {
	const config = {
		// TODO: Change to 1 hour
		dedupingInterval: CACHE_TIMES.ONE_DAY,
		...options,
	};
	return useSWR('staff-availabilities', getAvailabilitiesFromDB, config);
}

export function useCreateStaffAvailability() {
	return async (newRange: StaffAvailabilityInsert) => {
		const response = await createAvailabilityInDB(newRange);
		if (response.error) throw response.error;
		return response;
	};
}
