import { CustomerInsert, CustomerRow, CustomerUI } from '@/types/customers';
import { mapCustomerUI } from '@/utils/mappers/customer';
import useSWR from 'swr';
import { CACHE_TIMES } from '../constants/cache';

interface FetchCustomerParams {
  endpoint?: 'phone' | null;
  id: string;
}

export function useGetAllCustomers(options = {}) {
  const getAll = async () => {
    const response = await fetch('/api/customers');

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al obtener los usuarios');
    }

    const responseData = (await response.json()) as { data: CustomerRow[] };
    return responseData.data;
  };

  const config = {
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };

  return useSWR('customers', getAll, config);
}

// This function is being exported to fetches a customer by ID or phone number also from other hooks
export const fetchCustomer = async ({
  endpoint,
  id,
}: FetchCustomerParams): Promise<CustomerRow> => {
  const response = await fetch(`/api/customers/${endpoint ? `${endpoint}/` : ''}${id}`);

  if (!response.ok) {
    const errorResponse = (await response.json()) as { error: string };
    throw new Error(errorResponse.error || 'Error al obtener el usuario');
  }

  const responseData = (await response.json()) as { data: CustomerRow };
  return responseData.data;
};

export function useGetCustomer(id: string, options = {}) {
  const config = {
    dedupingInterval: CACHE_TIMES.ONE_DAY,
    ...options,
  };

  return useSWR(id ? `customer-${id}` : null, () => fetchCustomer({ id }), config);
}

export function useCreateCustomer() {
  return async (newCustomer: CustomerInsert): Promise<CustomerUI | null> => {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    });

    if (!response.ok) {
      const errorResponse = (await response.json()) as { error: string };
      throw new Error(errorResponse.error || 'Error al crear el usuario');
    }

    const responseData = (await response.json()) as { data: CustomerRow };
    return mapCustomerUI(responseData.data);
  };
}
