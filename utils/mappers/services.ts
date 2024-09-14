import { ServiceRow } from '@/types/services';
import { GroupListItem } from '@/types/ui';

export const mapServiceList = (staff: ServiceRow[]): GroupListItem[] => {
	return staff.map(({ id, name, price }) => ({
		id,
		name,
		description: `$${price}`,
	}));
};
