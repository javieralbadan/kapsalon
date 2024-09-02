import { PostgrestError } from '@supabase/supabase-js';
import type { Database } from 'types/supabase';

export type StaffMemberRow = Database['public']['Tables']['staff_members']['Row'];
export type StaffMemberInsert = Database['public']['Tables']['staff_members']['Insert'];

export interface StaffMemberResponseType {
	data: StaffMemberRow | null;
	error: PostgrestError | null;
}

export interface StaffMembersResponseType {
	data: StaffMemberRow[] | null;
	error: PostgrestError | null;
}
