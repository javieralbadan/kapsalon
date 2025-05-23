import { StaffMembersApiResponse } from '@/types/staffMembers';
import { handleNextErrorResponse, handleNextSuccessResponse } from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<NextResponse<StaffMembersApiResponse>> {
  const { slug = [] } = await params;
  const [slug1, shopId] = slug;

  try {
    let rowAttribute;
    let rowValue;

    if (slug1 === 'shop' && shopId) {
      rowAttribute = 'shop_id';
      rowValue = shopId;
    } else {
      rowAttribute = 'id';
      rowValue = slug1;
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from('staff').select('*').eq(rowAttribute, rowValue);

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
