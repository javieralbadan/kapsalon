import { StaffMemberInsert, StaffMemberRow } from '@/types/staffMembers';
import { mapStaffList } from '@/utils/mappers/staffMembers';
import useSWR, { SWRResponse } from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useGetAllStaff(options = {}) {
  const getAll = async () => {
    const response = await fetch('/api/staff-members');
    if (!response.ok) throw new Error('Error fetching staff members');
    const responseData = (await response.json()) as { data: StaffMemberRow[] };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_WEEK,
    ...options,
  };

  const result = useSWR('staff-members', getAll, config);
  const rawData = result?.data || [];
  const staffMembers = mapStaffList(rawData || []);

  return {
    ...result,
    staffMembers,
    data: staffMembers,
  };
}

export function useGetStaffMember(id: string, options = {}) {
  const getById = async (id: string) => {
    const response = await fetch(`/api/staff-members/${id}`);
    if (!response.ok) console.log('Error fetching staff members');
    const responseData = (await response.json()) as { data: StaffMemberRow };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_WEEK,
    ...options,
  };

  const result: SWRResponse = useSWR(id ? `staff-member-${id}` : null, () => getById(id), config);

  return { ...result, data: result.data as StaffMemberRow };
}

export function useGetStaffMemberByShop(shopId: string, options = {}) {
  let memberId;

  const getByShopId = async (shopId: string) => {
    const response = await fetch(`/api/staff-members/shop/${shopId}`);
    if (!response.ok) console.log('Error fetching staff member');
    const responseData = (await response.json()) as { data: StaffMemberRow };
    memberId = responseData.data.id;
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_WEEK,
    ...options,
  };

  console.log('🚀 ~ useShopStaffMember ~ memberId:', memberId);
  const result: SWRResponse = useSWR(
    shopId ? `staff-member-${memberId}` : null,
    () => getByShopId(shopId),
    config,
  );

  return { ...result, data: result.data as StaffMemberRow };
}

export function useCreateStaffMember() {
  return async (newStaffMember: StaffMemberInsert) => {
    const response = await fetch('/api/staff-members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStaffMember),
    });

    if (!response.ok) console.log('Error creating staff member');

    return response.json() as Promise<StaffMemberRow>;
  };
}
