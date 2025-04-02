import { PostgrestError } from '@supabase/supabase-js';

export const DB_CODES = {
  NOT_FOUND: 'PGRST116',
  UNIQUE_VIOLATION: '23505',
};

export const API_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const BAD_REQUEST_STATUS = {
  status: API_CODES.BAD_REQUEST,
};

export const getDBErrorCode = ({ code }: PostgrestError) => {
  return API_CODES[code === DB_CODES.NOT_FOUND ? 'NOT_FOUND' : 'BAD_REQUEST'];
};
