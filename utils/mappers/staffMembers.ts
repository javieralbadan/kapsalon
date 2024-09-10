import { StaffMemberRow } from '@/types/staffMembers';
import { GroupListItem } from '@/types/ui';

export const mapStaffList = (staff: StaffMemberRow[]): GroupListItem[] => {
	return staff.map(({ id, first_name, last_name }) => ({
		id,
		name: `${first_name} ${last_name}`,
	}));
};
