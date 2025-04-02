import { API_CODES } from '@/constants/api';
import { ShopApiResponse, ShopInsert, ShopsApiResponse } from '@/types/shops';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<ShopsApiResponse>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('shops').select('*');

    if (error) {
      console.error('🔎 Error fetching shops:', error);
      return NextResponse.json(
        {
          data: null,
          error: error.message,
        },
        {
          status: API_CODES.BAD_REQUEST,
        },
      );
    }

    return NextResponse.json(
      {
        data: data || [],
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
        error: (e as Error)?.message || 'Error interno',
      },
      {
        status: API_CODES.INTERNAL_SERVER_ERROR,
      },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ShopApiResponse>> {
  try {
    const shopData = (await request.json()) as ShopInsert;
    const supabase = await createClient();

    const { data, error } = await supabase.from('shops').insert(shopData).select().single();

    if (error) {
      console.error('🔎 Error creating shop:', error);
      return NextResponse.json(
        {
          data: null,
          error: error.message,
        },
        {
          status: API_CODES.BAD_REQUEST,
        },
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
