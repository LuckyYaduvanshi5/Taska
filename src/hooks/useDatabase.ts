import { useState, useCallback } from 'react';
import { databaseService } from '../services/supabase/database';
import { Database } from '../types/database';

type Tables = Database['public']['Tables'];

export function useDatabase() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.error('Database error:', error);
    setError(error.message);
    setLoading(false);
  };

  const getTasks = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const tasks = await databaseService.getTasks(userId);
      return tasks;
    } catch (error) {
      handleError(error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (task: Tables['tasks']['Insert']) => {
    setLoading(true);
    try {
      const newTask = await databaseService.createTask(task);
      return newTask;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    getTasks,
    createTask,
    // Add other methods as needed
  };
} 