import { StaffMemberInsert, StaffMemberRow } from '@/types/staffMembers';
import { mapStaffList } from '@/utils/mappers/staffMembers';
import useSWR, { SWRResponse } from 'swr';
import { CACHE_TIMES } from '../constants/cache';

type ResponseData<T extends boolean> = T extends true
  ? { data: StaffMemberRow[] }
  : { data: StaffMemberRow };

const BASE_URL = '/api/staff-members';
const CONFIG = {
  dedupingInterval: CACHE_TIMES.ONE_WEEK,
};

const fetchStaffMembers = async (endpoint: string): Promise<StaffMemberRow | StaffMemberRow[]> => {
  // endpoint should start with slash '/shop' || '/<barber-id>'
  const response = await fetch(`${BASE_URL}${endpoint}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const returnsMultiple = !endpoint || endpoint.split('/').length > 1;

  if (!response.ok) {
    const errorResponse = (await response.json()) as { error: string };
    throw new Error(errorResponse.error || 'Error al obtener los barberos');
  }

  const responseData = (await response.json()) as ResponseData<typeof returnsMultiple>;
  return responseData.data;
};

export function useGetAllStaff() {
  const result = useSWR('staff-members', fetchStaffMembers, CONFIG);
  const rawData = (result?.data as StaffMemberRow[]) || [];
  const staffMembers = mapStaffList(rawData || []);

  return {
    ...result,
    staffMembers,
    data: staffMembers,
  };
}

export function useGetStaffMembersByShop(shopId: string) {
  const result: SWRResponse = useSWR(
    shopId ? `staff-members-by-shop-${shopId}` : null,
    () => fetchStaffMembers(`/shop/${shopId}`),
    CONFIG,
  );

  const rawData = (result?.data as StaffMemberRow[]) || [];
  const staffMembers = mapStaffList(rawData || []);

  return {
    staffMembers,
    data: staffMembers,
    isLoading: result.isLoading,
    error: result.error as Error,
  };
}

export function useGetStaffMember(id: string) {
  const result: SWRResponse = useSWR(
    id ? `staff-member-${id}` : null,
    () => fetchStaffMembers(`/${id}`),
    CONFIG,
  );
  const rawData = result?.data as StaffMemberRow;
  const [staffMember] = mapStaffList([rawData]);

  return {
    staffMember,
    data: staffMember,
    isLoading: result.isLoading,
    error: result.error as Error,
  };
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

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al crear el barbero');
    }

    return response.json() as Promise<StaffMemberRow>;
  };
}
