import { ServiceRow, ServiceUI } from '@/types/services';
import { GroupListItem } from '@/types/ui';
import { formatCurrency } from '../formatters';

export const mapServiceList = (serviceList: ServiceRow[]): ServiceUI[] => {
  return serviceList.map(({ id, name, price, staff_member_id, description, duration }) => ({
    id,
    name,
    price: formatCurrency({ value: price }),
    staffMemberId: staff_member_id,
    ...(description && { description }),
    ...(duration && { duration }),
  }));
};

export const mapServicesAsList = (serviceList: ServiceUI[]): GroupListItem[] => {
  return serviceList.map(({ id, name, price }) => ({
    id,
    name,
    description: price,
  }));
};
