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

	return { data, error };
};

export const getStaffMemberByIdFromDB = async (
	cycleId: string,
): Promise<StaffMemberResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.STAFF_MEMBERS).select('*').eq('id', cycleId);

	if (data && !error) {
		return { data: data[0] as StaffMemberRow, error };
	}

	return { data, error };
};

export const createStaffMemberInDB = async (
	newService: StaffMemberInsert,
): Promise<StaffMembersResponseType> => {
	// const supabase = createClient();
	const supabase = supabaseClient;
	const { data, error } = await supabase.from(ENTITIES.STAFF_MEMBERS).insert(newService).select();

	return { data, error };
};
