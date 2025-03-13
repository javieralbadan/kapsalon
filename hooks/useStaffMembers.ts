import {
  createStaffMemberInDB,
  getStaffMemberByIdFromDB,
  getStaffMembersFromDB,
} from '@/api/staffMembers';
import { StaffMemberInsert } from '@/types/staffMembers';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useStaffMembers(options = {}) {
  const config = {
    dedupingInterval: CACHE_TIMES.ONE_WEEK,
    ...options,
  };
  return useSWR('staff-members', getStaffMembersFromDB, config);
}

export function useStaffMember(id: string, options = {}) {
  const config = {
    dedupingInterval: CACHE_TIMES.ONE_WEEK,
    ...options,
  };
  return useSWR(id ? `staff-member-${id}` : null, () => getStaffMemberByIdFromDB(id), config);
}

export function useCreateStaffMember() {
  return async (newStaffMember: StaffMemberInsert) => {
    const response = await createStaffMemberInDB(newStaffMember);
    if (response.error) throw response.error;
    return response;
  };
}
