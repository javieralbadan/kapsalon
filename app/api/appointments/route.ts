import { AppointmentApiResponse, AppointmentInsert, AppointmentRow } from '@/types/appointments';
import { nowInColombia } from '@/utils/formatters';
import { setAppoinmentTimeZone } from '@/utils/mappers/appointment';
import {
  API_CODES,
  DB_CODES,
  handleNextErrorResponse,
  handleNextSuccessResponse,
} from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

const MAX_ACTIVE_APPOINTMENTS = 3;
const MAX_APPOINTMENTS_ERROR = `Has alcanzado el límite de ${MAX_ACTIVE_APPOINTMENTS} citas activas.`;
const CONFLICT_ERROR = 'Horario no disponible. Por favor selecciona otro.';

export async function POST(request: Request): Promise<NextResponse<AppointmentApiResponse>> {
  try {
    const appointmentData = (await request.json()) as AppointmentInsert;
    const supabase = await createClient();

    // Validación 1: Verificar disponibilidad del profesional
    const { data: existingAppointments } = await supabase
      .from('appointments')
      .select('id')
      .eq('staff_member_id', appointmentData.staff_member_id)
      .eq('date_time', appointmentData.date_time);

    if (existingAppointments && existingAppointments?.length > 0) {
      return handleNextErrorResponse(CONFLICT_ERROR);
    }

    // Validación 2: Límite de citas futuras activas por cliente
    const { count: activeAppointmentsCount } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', appointmentData.customer_id)
      .gte('date_time', nowInColombia().toISOString())
      .eq('status', 'confirmed');

    if (activeAppointmentsCount && activeAppointmentsCount >= MAX_ACTIVE_APPOINTMENTS) {
      return handleNextErrorResponse(MAX_APPOINTMENTS_ERROR);
    }

    // Crear la cita
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();

    const apptInTimeZone = setAppoinmentTimeZone(data as AppointmentRow);
    if (!error) return handleNextSuccessResponse(apptInTimeZone, API_CODES.CREATED);

    if (error.code === DB_CODES.UNIQUE_VIOLATION) {
      return handleNextErrorResponse(CONFLICT_ERROR);
    }

    return handleNextErrorResponse(error as Error);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
