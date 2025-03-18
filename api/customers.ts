import {
  CustomerInsert,
  CustomerResponseType,
  CustomerRow,
  CustomersResponseType,
} from '@/types/customers';
import { supabaseClient } from '@/utils/supabase/client';

const CUSTOMERS = 'customers';

export const getCustomersFromDB = async (): Promise<CustomersResponseType> => {
  const { data, error } = await supabaseClient.from(CUSTOMERS).select('*');
  if (error) {
    console.error('🔎 Error fetching customers:', error);
    throw error;
  }
  console.log('🚀 ~ API:getCustomersFromDB:', data);
  return { data, error: null };
};

export const getCustomerByIdFromDB = async (customerId: string): Promise<CustomerResponseType> => {
  const { data, error } = await supabaseClient.from(CUSTOMERS).select('*').eq('id', customerId);
  if (error) {
    console.error('🔎 Error fetching customer by id:', error);
    throw error;
  }
  console.log('🚀 ~ API:getCustomerByIdFromDB:', data[0]);
  return { data: data[0] as CustomerRow, error: null };
};

export const createCustomerInDB = async (
  newCustomer: CustomerInsert,
): Promise<CustomersResponseType> => {
  const { data, error } = await supabaseClient.from(CUSTOMERS).insert(newCustomer).select();
  if (error) {
    console.error('🔎 Error creating customer:', error);
    throw error;
  }
  console.log('🚀 ~ API:createCustomerInDB:', data);
  return { data, error: null };
};

export const updateCustomerInDB = async (
  customerId: string,
  customerData: Partial<CustomerInsert>,
): Promise<CustomerResponseType> => {
  const { data, error } = await supabaseClient
    .from(CUSTOMERS)
    .update(customerData)
    .eq('id', customerId)
    .select();
  if (error) {
    console.error('🔎 Error updating customer:', error);
    throw error;
  }
  console.log('🚀 ~ API:updateCustomerInDB:', data[0]);
  return { data: data[0] as CustomerRow, error: null };
};
