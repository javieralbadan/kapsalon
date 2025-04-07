import { ShopApiResponse } from '@/types/shops';
import { handleNextErrorResponse, handleNextSuccessResponse } from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse<ShopApiResponse>> {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data, error } = await supabase.from('shops').select('*').eq('id', id).single();

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
