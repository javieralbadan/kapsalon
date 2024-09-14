import { PostgrestError } from '@supabase/supabase-js';
import type { Database } from 'types/supabase';

export type StaffAvailabilityRow = Database['public']['Tables']['staff_availability']['Row'];

export interface StaffAvailabilityResponseType {
	data: StaffAvailabilityRow | null;
	error: PostgrestError | null;
}

export interface StaffAvailabilitiesResponseType {
	data: StaffAvailabilityRow[] | null;
	error: PostgrestError | null;
}
