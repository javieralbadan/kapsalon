import { PostgrestError } from '@supabase/supabase-js';
import type { Database } from 'types/supabase';

export type ServiceRow = Database['public']['Tables']['services']['Row'];
export type ServiceInsert = Database['public']['Tables']['services']['Insert'];

export interface ServiceResponseType {
	data: ServiceRow | null;
	error: PostgrestError | null;
}

export interface ServicesResponseType {
	data: ServiceRow[] | null;
	error: PostgrestError | null;
}