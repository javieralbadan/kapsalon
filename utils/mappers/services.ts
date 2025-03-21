import { ServiceRow } from '@/types/services';
import { GroupListItem } from '@/types/ui';
import { formatCurrency } from '../formatters';

export const mapServiceList = (serviceList: ServiceRow[]): GroupListItem[] => {
  return serviceList.map(({ id, name, price }) => ({
    id,
    name,
    description: formatCurrency({ value: price }),
  }));
};
