import { API_CODES } from '@/constants/api';
import {
  StaffAvailabilitiesApiResponse,
  StaffAvailabilityApiResponse,
  StaffAvailabilityInsert,
} from '@/types/staffAvailability';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<StaffAvailabilitiesApiResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('staff_availability').select('*');

    if (error) {
      console.error('🔎 Error fetching staff_availability:', error);
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
        error: 'Internal Server Error',
      },
      {
        status: API_CODES.INTERNAL_SERVER_ERROR,
      },
    );
  }
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<StaffAvailabilityApiResponse>> {
  try {
    const availabilityData = (await request.json()) as StaffAvailabilityInsert;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('staff_availability')
      .insert(availabilityData)
      .select()
      .single();

    if (error) {
      console.error('🔎 Error creating staff_availability:', error);
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
