import {
    StaffMemberInsert,
    StaffMemberResponseType,
    StaffMemberRow,
    StaffMembersResponseType,
} from '@/types/staffMembers';
import { supabaseClient } from '@/utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

const STAFF = 'staff';

export const getStaffMembersFromDB = async (): Promise<StaffMembersResponseType> => {
	try {
		const { data, error }: StaffMembersResponseType = await supabaseClient.from(STAFF).select('*');
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

export const getStaffMemberByIdFromDB = async (
	memberId: string,
): Promise<StaffMemberResponseType> => {
	const { data, error } = await supabaseClient.from(STAFF).select('*').eq('id', memberId);

	if (!data && error) {
		console.error('🔎 Error fetching staff member by id:', error);
		return { data: null, error };
	}

	return { data: data[0] as StaffMemberRow, error: null };
};

export const createStaffMemberInDB = async (
	newService: StaffMemberInsert,
): Promise<StaffMembersResponseType> => {
	const { data, error } = await supabaseClient.from(STAFF).insert(newService).select();

	if (!data && error) {
		console.error('🔎 Error creating staff member:', error);
		return { data: null, error };
	}

	return { data, error: null };
};
