import { ServiceRow } from '@/types/services';
import { GroupListItem } from '@/types/ui';
import { formatCurrency } from '../formatters';

export const mapServiceList = (staff: ServiceRow[]): GroupListItem[] => {
  return staff.map(({ id, name, price }) => ({
    id,
    name,
    description: formatCurrency({ value: price }),
  }));
};
