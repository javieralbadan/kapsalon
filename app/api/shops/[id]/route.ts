import { API_CODES, getDBErrorCode } from '@/constants/api';
import { ShopApiResponse } from '@/types/shops';
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
      console.error(`🔎 Error fetching shop ${id}:`, error);
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
