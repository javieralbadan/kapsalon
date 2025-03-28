import { CustomerInsert, CustomerRow, CustomerUI } from '@/types/customers';
import { FormUserInfoType } from '@/types/messages';

export const mapCustomerUI = (customerAPI: CustomerRow): CustomerUI | null => {
  if (Object.keys(customerAPI).length === 0) return null;

  return {
    id: customerAPI.id,
    firstName: customerAPI.first_name,
    lastName: customerAPI.last_name,
    phoneNumber: customerAPI.phone_number,
    phoneVerified: customerAPI.phone_verified,
    email: customerAPI.email,
  };
};

export const mapCustomerToInsert = (customerInfo: FormUserInfoType): CustomerInsert => {
  return {
    first_name: customerInfo.firstName,
    last_name: customerInfo.lastName,
    phone_number: `${customerInfo.phone}`,
    phone_verified: true,
  };
};
