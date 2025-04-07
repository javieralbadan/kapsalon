import {
  StaffAvailabilitiesApiResponse,
  StaffAvailabilityApiResponse,
  StaffAvailabilityInsert,
} from '@/types/staffAvailability';
import {
  API_CODES,
  handleNextErrorResponse,
  handleNextSuccessResponse,
} from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<StaffAvailabilitiesApiResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('staff_availability').select('*');

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
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
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data, API_CODES.CREATED);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
