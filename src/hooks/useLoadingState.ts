import { useState, useCallback } from 'react';
import { handleError, AppError } from '../utils/errorHandling';

interface LoadingState {
  loading: boolean;
  error: AppError | null;
}

export function useLoadingState(initialState: boolean = false) {
  const [state, setState] = useState<LoadingState>({
    loading: initialState,
    error: null,
  });

  const startLoading = useCallback(() => {
    setState({ loading: true, error: null });
  }, []);

  const stopLoading = useCallback(() => {
    setState(prev => ({ ...prev, loading: false }));
  }, []);

  const setError = useCallback((error: any) => {
    setState({
      loading: false,
      error: handleError(error),
    });
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const wrapPromise = useCallback(
    async <T>(promise: Promise<T>): Promise<T> => {
      try {
        startLoading();
        const result = await promise;
        return result;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        stopLoading();
      }
    },
    [startLoading, setError, stopLoading]
  );

  return {
    ...state,
    startLoading,
    stopLoading,
    setError,
    clearError,
    wrapPromise,
  };
} 