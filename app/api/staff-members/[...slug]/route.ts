import { API_CODES, getDBErrorCode } from '@/constants/api';
import { StaffMemberApiResponse } from '@/types/staffMembers';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<NextResponse<StaffMemberApiResponse>> {
  const { slug = [] } = await params;
  const [slug1, shopId] = slug;

  try {
    const supabase = await createClient();
    let rowAttribute;
    let rowValue;

    if (slug1 === 'shop' && shopId) {
      rowAttribute = 'shop_id';
      rowValue = shopId;
    } else {
      rowAttribute = 'id';
      rowValue = slug1;
    }

    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq(rowAttribute, rowValue)
      .single();

    if (error) {
      console.error(`🔎 Error fetching staff member by ${rowAttribute}:`, error);
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
