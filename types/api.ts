import { PostgrestError } from '@supabase/supabase-js';

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export type SupabaseResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};
