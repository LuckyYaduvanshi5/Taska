export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Database table names
export const TABLES = {
  TASKS: 'tasks',
  USER_SETTINGS: 'user_settings',
  FOCUS_SESSIONS: 'focus_sessions',
} as const; 