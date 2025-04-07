import { StaffAvailabilitiesApiResponse } from '@/types/staffAvailability';
import { handleNextErrorResponse, handleNextSuccessResponse } from '@/utils/mappers/nextResponse';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
): Promise<NextResponse<StaffAvailabilitiesApiResponse>> {
  const { slug = [] } = await params;
  const [slug1, memberId] = slug;

  try {
    let rowAttribute;
    let rowValue;

    if (slug1 === 'staff-member' && memberId) {
      rowAttribute = 'staff_member_id';
      rowValue = memberId;
    } else {
      rowAttribute = 'id';
      rowValue = slug1;
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('staff_availability')
      .select('*')
      .eq(rowAttribute, rowValue);

    if (error) {
      return handleNextErrorResponse(error as Error);
    }

    return handleNextSuccessResponse(data);
  } catch (error) {
    return handleNextErrorResponse(error as Error);
  }
}
