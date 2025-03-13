import {
  StaffMemberInsert,
  StaffMemberResponseType,
  StaffMemberRow,
  StaffMembersResponseType,
} from '@/types/staffMembers';
import { supabaseClient } from '@/utils/supabase/client';

const STAFF = 'staff';

export const getStaffMembersFromDB = async (): Promise<StaffMembersResponseType> => {
  const { data, error } = await supabaseClient.from(STAFF).select('*');
  if (error) {
    console.error('🔎 Error fetching staff:', error);
    throw error;
  }
  console.log('🚀 ~ API:getStaffMembersFromDB:', data);
  return { data, error: null };
};

export const getStaffMemberByIdFromDB = async (
  memberId: string,
): Promise<StaffMemberResponseType> => {
  const { data, error } = await supabaseClient.from(STAFF).select('*').eq('id', memberId);
  if (error) {
    console.error('🔎 Error fetching staff member by id:', error);
    throw error;
  }
  return { data: data[0] as StaffMemberRow, error: null };
};

export const createStaffMemberInDB = async (
  newService: StaffMemberInsert,
): Promise<StaffMembersResponseType> => {
  const { data, error } = await supabaseClient.from(STAFF).insert(newService).select();
  if (error) {
    console.error('🔎 Error creating staff member:', error);
    throw error;
  }
  return { data, error: null };
};
