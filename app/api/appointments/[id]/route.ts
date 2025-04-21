import { AppointmentApiResponse, AppointmentUpdate } from '@/types/appointments';
import { setAppoinmentTimeZone } from '@/utils/mappers/appointment';
import { handleNextErrorResponse, handleNextSuccessResponse } from '@/utils/mappers/nextResponse';
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
      return handleNextErrorResponse(error as Error);
    }

    const apptInTimeZone = setAppoinmentTimeZone(data);
    return handleNextSuccessResponse(apptInTimeZone);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
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
      return handleNextErrorResponse(error as Error);
    }

    const apptInTimeZone = setAppoinmentTimeZone(data);
    return handleNextSuccessResponse(apptInTimeZone);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
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
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(null);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
