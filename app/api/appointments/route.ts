import { API_CODES, BAD_REQUEST_STATUS, DB_CODES } from '@/constants/api';
import { AppointmentApiResponse, AppointmentInsert } from '@/types/appointments';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

const CONFLICT_RESPONSE = {
  data: null,
  error: 'Horario no disponible. Por favor selecciona otro.',
};

export async function POST(request: Request): Promise<NextResponse<AppointmentApiResponse>> {
  try {
    const appointmentData = (await request.json()) as AppointmentInsert;
    const supabase = await createClient();

    const { data: existingAppointments } = await supabase
      .from('appointments')
      .select('id')
      .eq('staff_member_id', appointmentData.staff_member_id)
      .eq('date_time', appointmentData.date_time);

    if (existingAppointments && existingAppointments?.length > 0) {
      return NextResponse.json(CONFLICT_RESPONSE, BAD_REQUEST_STATUS);
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();

    if (error) {
      console.error('🔎 Error creating appointment:', error);

      if (error.code === DB_CODES.UNIQUE_VIOLATION) {
        return NextResponse.json(CONFLICT_RESPONSE, BAD_REQUEST_STATUS);
      }

      return NextResponse.json(
        {
          data: null,
          error: error.message,
        },
        BAD_REQUEST_STATUS,
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
