import { supabase } from './supabase';
import { Database } from '../../types/database';

type Tables = Database['public']['Tables'];

export const databaseService = {
  // Users
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateUserProfile(userId: string, updates: Partial<Tables['users']['Update']>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Tasks
  async getTasks(userId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createTask(task: Tables['tasks']['Insert']) {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTask(taskId: string, updates: Partial<Tables['tasks']['Update']>) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTask(taskId: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw error;
  },

  // Focus Sessions
  async createFocusSession(session: Tables['focus_sessions']['Insert']) {
    const { data, error } = await supabase
      .from('focus_sessions')
      .insert(session)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateFocusSession(sessionId: string, updates: Partial<Tables['focus_sessions']['Update']>) {
    const { data, error } = await supabase
      .from('focus_sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getFocusSessions(userId: string) {
    const { data, error } = await supabase
      .from('focus_sessions')
      .select('*, tasks(title)')
      .eq('user_id', userId)
      .order('start_time', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateUserPreferences(userId: string, preferences: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
    focus_duration?: number;
    break_duration?: number;
  }) {
    const { data, error } = await supabase
      .from('users')
      .update({
        preferences: preferences,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
}; 