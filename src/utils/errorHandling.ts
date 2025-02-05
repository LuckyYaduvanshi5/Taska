export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: any): AppError {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return error;
  }

  // Handle Supabase errors
  if (error?.code) {
    switch (error.code) {
      case 'PGRST301':
        return new AppError('Authentication required', 'AUTH_REQUIRED', error);
      case '23505':
        return new AppError('This record already exists', 'DUPLICATE', error);
      default:
        return new AppError(
          'An unexpected error occurred',
          'UNKNOWN',
          error
        );
    }
  }

  return new AppError(
    error?.message || 'An unexpected error occurred',
    'UNKNOWN',
    error
  );
} 