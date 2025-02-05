import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants/supabase';

// Initialize the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Type for the error response
export type ErrorResponse = {
  message: string;
  status: number;
};

// Helper function to handle errors
export const handleError = (error: any): ErrorResponse => {
  console.error('API Error:', error);
  return {
    message: error.message || 'An unexpected error occurred',
    status: error.status || 500,
  };
}; 