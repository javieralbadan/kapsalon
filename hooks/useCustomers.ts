import { CustomerInsert, CustomerRow } from '@/types/customers';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

export function useGetAllCustomers(options = {}) {
  const getAll = async () => {
    const response = await fetch('/api/customers');
    if (!response.ok) throw new Error('Error fetching customers');
    const responseData = (await response.json()) as { data: CustomerRow[] };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };

  return useSWR('customers', getAll, config);
}

export function useCustomer(id: string, options = {}) {
  const getById = async (id: string) => {
    const response = await fetch(`/api/customers/${id}`);
    if (!response.ok) throw new Error('Error fetching customer');
    const responseData = (await response.json()) as { data: CustomerRow };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };

  return useSWR(id ? `customer-${id}` : null, () => getById(id), config);
}

export function useCreateCustomer() {
  return async (newCustomer: CustomerInsert) => {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    });

    if (!response.ok) throw new Error('Error creating appointment');

    return response.json() as Promise<CustomerRow>;
  };
}
