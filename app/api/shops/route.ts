import { ShopApiResponse, ShopInsert, ShopsApiResponse } from '@/types/shops';
import {
  API_CODES,
  handleNextErrorResponse,
  handleNextSuccessResponse,
} from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<ShopsApiResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('shops').select('*');

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ShopApiResponse>> {
  try {
    const shopData = (await request.json()) as ShopInsert;
    const supabase = await createClient();
    const { data, error } = await supabase.from('shops').insert(shopData).select().single();

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data, API_CODES.CREATED);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
