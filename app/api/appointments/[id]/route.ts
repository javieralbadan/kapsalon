import { API_CODES, getDBErrorCode } from '@/constants/api';
import { AppointmentApiResponse, AppointmentUpdate } from '@/types/appointments';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<AppointmentApiResponse>> {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase.from('appointments').select('*').eq('id', id).single();

    if (error) {
      console.error(`🔎 Error fetching appointment ${id}:`, error);
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
): Promise<NextResponse<AppointmentApiResponse>> {
  try {
    const { id } = await params;
    const appointmentData = (await request.json()) as AppointmentUpdate;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('appointments')
      .update(appointmentData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error(`🔎 Error updating appointment ${id}:`, error);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<AppointmentApiResponse>> {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase.from('appointments').delete().eq('id', id);

    if (error) {
      console.error(`🔎 Error deleting appointment ${id}:`, error);
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
        data: null,
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
