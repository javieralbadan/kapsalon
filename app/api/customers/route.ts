import { CustomerApiResponse, CustomerInsert } from '@/types/customers';
import {
  API_CODES,
  handleNextErrorResponse,
  handleNextSuccessResponse,
} from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse<CustomerApiResponse>> {
  try {
    const customerData = (await request.json()) as CustomerInsert;
    const supabase = await createClient();
    const { data, error } = await supabase.from('customers').insert(customerData).select().single();

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data, API_CODES.CREATED);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
