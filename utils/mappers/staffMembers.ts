import { StaffMemberRow, StaffMemberUI } from '@/types/staffMembers';

export const mapStaffList = (staff: StaffMemberRow[]): StaffMemberUI[] => {
  return staff.map(({ id, first_name, last_name, email, phone_number }) => ({
    id,
    name: `${first_name} ${last_name}`,
    email,
    phoneNumber: phone_number || '',
  }));
};
