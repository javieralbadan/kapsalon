import { CustomerApiResponse, CustomerUpdate } from '@/types/customers';
import { handleNextErrorResponse, handleNextSuccessResponse } from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<NextResponse<CustomerApiResponse>> {
  const { slug = [] } = await params;
  const [slug1, customerId] = slug;

  try {
    let rowAttribute;
    let rowValue;

    if (slug1 === 'phone' && customerId) {
      rowAttribute = 'phone_number';
      rowValue = customerId;
    } else {
      rowAttribute = 'id';
      rowValue = slug1;
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq(rowAttribute, rowValue)
      .single();

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<CustomerApiResponse>> {
  try {
    const { id } = await params;
    const customerData = (await request.json()) as CustomerUpdate;
    console.log('🚀 ~ PATCH/customerData:', customerData);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('customers')
      .update(customerData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
