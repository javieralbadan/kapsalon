import { API_CODES, getDBErrorCode } from '@/constants/api';
import {
  StaffMemberApiResponse,
  StaffMemberInsert,
  StaffMembersApiResponse,
} from '@/types/staffMembers';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<StaffMembersApiResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('staff').select('*');

    if (error) {
      console.error('🔎 Error fetching staff members:', error);
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

export async function POST(request: NextRequest): Promise<NextResponse<StaffMemberApiResponse>> {
  try {
    const staffData = (await request.json()) as StaffMemberInsert;
    const supabase = await createClient();

    const { data, error } = await supabase.from('staff').insert(staffData).select().single();

    if (error) {
      console.error('🔎 Error creating staff member:', error);
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
