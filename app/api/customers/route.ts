import { API_CODES } from '@/constants/api';
import { CustomerApiResponse, CustomerInsert } from '@/types/customers';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse<CustomerApiResponse>> {
  try {
    const customerData = (await request.json()) as CustomerInsert;
    const supabase = await createClient();

    const { data, error } = await supabase.from('customers').insert(customerData).select().single();

    if (error) {
      console.error('🔎 Error creating customer:', error);
      return NextResponse.json(
        {
          data: null,
          error: error.message,
        },
        {
          status: API_CODES.BAD_REQUEST,
        },
      );
    }

    return NextResponse.json(
      {
        data: data || null,
        error: null,
      },
      {
        status: API_CODES.CREATED,
      },
    );
  } catch (e) {
    console.error('🔎 Unexpected error:', e);
    return NextResponse.json(
      {
        data: null,
        error: 'Internal Server Error',
      },
      {
        status: API_CODES.INTERNAL_SERVER_ERROR,
      },
    );
  }
}
