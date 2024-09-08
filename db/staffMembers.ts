'use server';
import { ENTITIES } from 'constants/data-base';
import {
	StaffMemberInsert,
	StaffMemberResponseType,
	StaffMemberRow,
	StaffMembersResponseType,
} from 'types/staffMembers';
import { supabaseClient } from 'utils/supabase/client';
// import { createClient } from "utils/supabase/server";

export const getStaffMembersFromDB = async (): Promise<StaffMembersResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.STAFF_MEMBERS).select('*');

	if (error) {
		console.error('🔎 Error fetching staff members:', error);
		return { data: [], error };
	}

	return { data, error: null };
};

export const getStaffMemberByIdFromDB = async (
	memberId: string,
): Promise<StaffMemberResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase
		.from(ENTITIES.STAFF_MEMBERS)
		.select('*')
		.eq('id', memberId);

	if (!data && error) {
		console.error('🔎 Error fetching staff member by id:', error);
		return { data: null, error };
	}

	return { data: data[0] as StaffMemberRow, error: null };
};

export const createStaffMemberInDB = async (
	newService: StaffMemberInsert,
): Promise<StaffMembersResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.STAFF_MEMBERS).insert(newService).select();

	if (!data && error) {
		console.error('🔎 Error creating staff member:', error);
		return { data: null, error };
	}

	return { data, error: null };
};
