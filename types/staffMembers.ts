import type { Database } from '@/types/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export type StaffMemberRow = Database['public']['Tables']['staff']['Row'];
export type StaffMemberInsert = Database['public']['Tables']['staff']['Insert'];

export interface StaffMemberResponseType {
	data: StaffMemberRow | null;
	error: PostgrestError | null;
}

export interface StaffMembersResponseType {
	data: StaffMemberRow[] | null;
	error: PostgrestError | null;
}
