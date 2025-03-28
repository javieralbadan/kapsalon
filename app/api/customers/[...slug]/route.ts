import { API_CODES, getDBErrorCode } from '@/constants/api';
import { CustomerApiResponse, CustomerUpdate } from '@/types/customers';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<NextResponse<CustomerApiResponse>> {
  const { slug = [] } = await params;
  const [slug1, customerId] = slug;

  try {
    const supabase = await createClient();
    let rowAttribute;
    let rowValue;

    if (slug1 === 'phone' && customerId) {
      rowAttribute = 'phone_number';
      rowValue = customerId;
    } else {
      rowAttribute = 'id';
      rowValue = slug1;
    }

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq(rowAttribute, rowValue)
      .single();

    if (error) {
      console.error(`🔎 Error fetching customer by ${rowAttribute}:`, error);
      return NextResponse.json(
        {
          data: null,
          error: error.message,
        },
        {
          status: getDBErrorCode(error),
        },
      );
    }

    return NextResponse.json(
      {
        data: data || null,
        error: null,
      },
      {
        status: API_CODES.OK,
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<CustomerApiResponse>> {
  try {
    const { id } = await params;
    const customerData = (await request.json()) as CustomerUpdate;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('customers')
      .update(customerData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`🔎 Error updating customer ${id}:`, error);
      return NextResponse.json(
        {
          data: null,
          error: error.message,
        },
        {
          status: getDBErrorCode(error),
        },
      );
    }

    return NextResponse.json(
      {
        data: data || null,
        error: null,
      },
      {
        status: API_CODES.OK,
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
