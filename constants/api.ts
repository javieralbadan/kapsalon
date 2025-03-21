import { PostgrestError } from '@supabase/supabase-js';

export const API_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const getDBErrorCode = ({ code }: PostgrestError) => {
  const DB_NOT_FOUND_CODE = 'PGRST116';
  return API_CODES[code === DB_NOT_FOUND_CODE ? 'NOT_FOUND' : 'BAD_REQUEST'];
};
