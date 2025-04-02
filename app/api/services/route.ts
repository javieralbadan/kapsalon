import { API_CODES, getDBErrorCode } from '@/constants/api';
import { ServiceApiResponse, ServiceInsert, ServicesApiResponse } from '@/types/services';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<ServicesApiResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('services').select('*');

    if (error) {
      console.error('🔎 Error fetching services:', error);
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
        data: data || [],
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
        error: (e as Error)?.message || 'Error interno',
      },
      {
        status: API_CODES.INTERNAL_SERVER_ERROR,
      },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ServiceApiResponse>> {
  try {
    const serviceData = (await request.json()) as ServiceInsert;
    const supabase = await createClient();

    const { data, error } = await supabase.from('services').insert(serviceData).select().single();

    if (error) {
      console.error('🔎 Error creating service:', error);
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
        error: (e as Error)?.message || 'Error interno',
      },
      {
        status: API_CODES.INTERNAL_SERVER_ERROR,
      },
    );
  }
}
