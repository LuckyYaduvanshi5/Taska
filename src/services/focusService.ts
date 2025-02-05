import { supabase, handleError } from './supabase';
import type { FocusSession } from '../types/database';
import { TABLES } from '../constants/supabase';

export interface CreateFocusSessionDTO {
    task_id?: string;
    start_time: string;
    duration: number;
}

export interface UpdateFocusSessionDTO {
    end_time?: string;
    completed?: boolean;
    notes?: string;
}

export const FocusService = {
    async startSession(session: CreateFocusSessionDTO): Promise<FocusSession> {
        try {
            const { data, error } = await supabase
                .from(TABLES.FOCUS_SESSIONS)
                .insert({
                    ...session,
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw handleError(error);
        }
    },

    async completeSession(sessionId: string, updates: UpdateFocusSessionDTO): Promise<FocusSession> {
        try {
            const { data, error } = await supabase
                .from(TABLES.FOCUS_SESSIONS)
                .update(updates)
                .eq('id', sessionId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw handleError(error);
        }
    },

    async getSession(sessionId: string): Promise<FocusSession> {
        try {
            const { data, error } = await supabase
                .from(TABLES.FOCUS_SESSIONS)
                .select()
                .eq('id', sessionId)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw handleError(error);
        }
    },

    async getUserSessions(): Promise<FocusSession[]> {
        try {
            const { data, error } = await supabase
                .from(TABLES.FOCUS_SESSIONS)
                .select()
                .order('start_time', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            throw handleError(error);
        }
    },

    async getSessionsByTask(taskId: string): Promise<FocusSession[]> {
        try {
            const { data, error } = await supabase
                .from(TABLES.FOCUS_SESSIONS)
                .select()
                .eq('task_id', taskId)
                .order('start_time', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            throw handleError(error);
        }
    },
}; 