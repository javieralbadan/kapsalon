import { ServiceApiResponse, ServiceInsert, ServicesApiResponse } from '@/types/services';
import {
  API_CODES,
  handleNextErrorResponse,
  handleNextSuccessResponse,
} from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<ServicesApiResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('services').select('*');

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ServiceApiResponse>> {
  try {
    const serviceData = (await request.json()) as ServiceInsert;
    const supabase = await createClient();
    const { data, error } = await supabase.from('services').insert(serviceData).select().single();

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data, API_CODES.CREATED);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
