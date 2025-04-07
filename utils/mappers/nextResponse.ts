import { PostgrestError } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

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

export const getDBErrorCode = (error: PostgrestError) => {
  console.log('🚀 ~ getDBErrorCode ~ error:', error);
  return API_CODES[error.code === DB_CODES.NOT_FOUND ? 'NOT_FOUND' : 'BAD_REQUEST'];
};

export const handleNextSuccessResponse = <T>(data: T, status: number = API_CODES.OK) => {
  return NextResponse.json({ data: data || null, error: null }, { status });
};

export const handleNextErrorResponse = (errorParam: PostgrestError | Error | string) => {
  console.error('🔎 handleNextErrorResponse - Unexpected error:', errorParam);
  let error;
  let status = API_CODES.INTERNAL_SERVER_ERROR;

  if (typeof errorParam === 'string') {
    error = errorParam || 'Error interno';
    return NextResponse.json({ data: null, error }, { status });
  }

  if (errorParam instanceof PostgrestError) {
    error = errorParam.message;
    status = getDBErrorCode(errorParam);
  } else {
    error = errorParam.message || 'Error interno';
    status = API_CODES.INTERNAL_SERVER_ERROR;
  }

  return NextResponse.json({ data: null, error }, { status });
};
