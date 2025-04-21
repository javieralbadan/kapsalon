import { SCHEDULE_APPOINTMENT } from '@/constants/appointment';
import { StaffAvailableSlotsApiResponse } from '@/types/staffAvailability';
import { setAppoinmentTimeZone } from '@/utils/mappers/appointment';
import { generateAvailableSlots, getDateRange } from '@/utils/server/appointment-utils';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const ERRORS = {
  INVALID_PAGE: 'Parámetero de página inválido. Debe ser entre 0 y 2',
  NO_AVAILS: 'No se encontraron disponibilidades configuradas',
  NO_APPOINTMENTS: 'No se encontraron disponibilidades configuradas',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ memberId?: string }> },
): Promise<NextResponse<StaffAvailableSlotsApiResponse>> {
  const { memberId } = await params;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '0', 10);

  if (!memberId) {
    throw new Error(ERRORS.INVALID_PAGE);
  }

  if (page < 0 || page > SCHEDULE_APPOINTMENT.MAX_APPOINTMENTS_PAGES) {
    throw new Error(ERRORS.INVALID_PAGE);
  }

  try {
    const supabase = await createClient();
    // 1. Obtener la disponibilidad del barbero
    const { data: availabilities, error: availabilityError } = await supabase
      .from('staff_availability')
      .select('*')
      .eq('staff_member_id', memberId)
      .eq('is_available', true);

    if (availabilityError) {
      throw new Error(availabilityError as unknown as string);
    }

    if (!availabilities || availabilities.length === 0) {
      throw new Error(ERRORS.NO_AVAILS);
    }

    // 2. Obtener el rango de fechas según la página
    const dateRange = getDateRange(page);

    // 3. Obtener los turnos ya confirmados del barbero dentro del rango de fechas
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*')
      .eq('staff_member_id', memberId)
      .eq('status', 'confirmed')
      .gte('date_time', dateRange.start.toISOString())
      .lt('date_time', dateRange.end.toISOString());

    if (appointmentsError) {
      throw new Error(appointmentsError as unknown as string);
    }

    // 4. Ajustar timeZone a Colombia
    const apptsInTimeZone = appointments.map((item) => setAppoinmentTimeZone(item));
    // 5. Generar los slots disponibles
    const availableSlots = generateAvailableSlots(availabilities, apptsInTimeZone, dateRange);

    return NextResponse.json({
      data: availableSlots,
      pagination: {
        currentPage: page,
        hasMore: page < SCHEDULE_APPOINTMENT.MAX_APPOINTMENTS_PAGES,
      },
    });
  } catch (error) {
    throw new Error(error as string);
  }
}
