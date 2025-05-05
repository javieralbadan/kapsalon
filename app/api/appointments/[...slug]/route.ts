import { SupabaseResponse } from '@/types/api';
import {
  AppointmentApiResponse,
  AppointmentDetailsApiResponse,
  AppointmentDetailsData,
  AppointmentsDetailsApiResponse,
  AppointmentUpdate,
} from '@/types/appointments';
import { setAppoinmentTimeZone } from '@/utils/mappers/appointment';
import {
  API_CODES,
  handleNextErrorResponse,
  handleNextSuccessResponse,
} from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<NextResponse<AppointmentsDetailsApiResponse | AppointmentDetailsApiResponse>> {
  const { slug = [] } = await params;
  const [slug1, memberId] = slug;

  try {
    const supabase = createClient();

    if (slug1 === 'staff-member' && memberId) {
      const { data, error } = await getApptsByStaff({ supabase, id: memberId });

      if (error) {
        return handleNextErrorResponse(error as Error);
      }

      if (!data) {
        const errorMsg = `Citas nos encontradas para el barbero [${memberId}].`;
        return handleNextErrorResponse(new Error(errorMsg), API_CODES.NOT_FOUND);
      }

      if (data.length === 0) {
        return handleNextSuccessResponse([]);
      }

      const appointmentsDetails = data.map((item) => setAppoinmentTimeZone(item));
      return handleNextSuccessResponse(appointmentsDetails);
    } else {
      const { data, error } = await getOneApptByCustomer({ supabase, id: slug1 });
      if (error) {
        return handleNextErrorResponse(error as Error);
      }

      if (!data) {
        const errorMsg = `Cita [${slug1}] no encontrada.`;
        return handleNextErrorResponse(new Error(errorMsg), API_CODES.NOT_FOUND);
      }

      const appointmentDetails = setAppoinmentTimeZone(data);
      return handleNextSuccessResponse(appointmentDetails);
    }
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}

interface HandlerProps {
  supabase: ReturnType<typeof createClient>;
  id: string; // staff_member_id || appointment_id
}
type HandlerReturnSingle = Promise<SupabaseResponse<AppointmentDetailsData>>;
type HandlerReturnMultiple = Promise<SupabaseResponse<AppointmentDetailsData[]>>;

async function getApptsByStaff({ supabase, id }: HandlerProps): HandlerReturnMultiple {
  const nowUTC = new Date().toISOString();
  return (
    (await supabase)
      .from('appointments')
      .select(
        '*, customers (first_name, last_name, phone_number), services (name, price), staff (first_name, last_name, phone_number)',
      )
      .eq('staff_member_id', id)
      // .in('status', ['confirmed', 'rescheduled'])
      .gte('date_time', nowUTC)
      // .lt('date_time', dateRange.end.toISOString())
      .order('date_time', { ascending: true })
  );
}

async function getOneApptByCustomer({ supabase, id }: HandlerProps): HandlerReturnSingle {
  return (await supabase)
    .from('appointments')
    .select(
      '*, customers (first_name, last_name, phone_number), services (name, price), staff (first_name, last_name, phone_number, shops (*))',
    )
    .eq('id', id)
    .single();
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<NextResponse<AppointmentApiResponse>> {
  try {
    const { slug = [] } = await params;
    const [apptId] = slug;
    const appointmentData = (await request.json()) as AppointmentUpdate;
    console.log('🚀 ~ PATCH apptId/appointmentData:', apptId, appointmentData);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('appointments')
      .update(appointmentData)
      .eq('id', apptId)
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
  _: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<NextResponse<AppointmentApiResponse>> {
  try {
    const { slug = [] } = await params;
    const [apptId] = slug;
    const supabase = await createClient();
    const { error } = await supabase.from('appointments').delete().eq('id', apptId);

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(null);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
