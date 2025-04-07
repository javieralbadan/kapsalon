import {
  StaffMemberApiResponse,
  StaffMemberInsert,
  StaffMembersApiResponse,
} from '@/types/staffMembers';
import {
  API_CODES,
  handleNextErrorResponse,
  handleNextSuccessResponse,
} from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<StaffMembersApiResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('staff').select('*');

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<StaffMemberApiResponse>> {
  try {
    const staffData = (await request.json()) as StaffMemberInsert;
    const supabase = await createClient();
    const { data, error } = await supabase.from('staff').insert(staffData).select().single();

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data, API_CODES.CREATED);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
