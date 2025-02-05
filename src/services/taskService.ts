import { supabase, handleError } from './supabase';
import type { Task, TaskStatus, TaskPriority } from '../types/database';
import { TABLES } from '../constants/supabase';

export interface CreateTaskDTO {
    title: string;
    description?: string;
    priority?: TaskPriority;
    due_date?: string;
    estimated_pomodoros?: number;
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    due_date?: string;
    estimated_pomodoros?: number;
    completed_pomodoros?: number;
}

export const TaskService = {
    async createTask(task: CreateTaskDTO): Promise<Task> {
        try {
            const { data, error } = await supabase
                .from(TABLES.TASKS)
                .insert({
                    ...task,
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

    async updateTask(taskId: string, updates: UpdateTaskDTO): Promise<Task> {
        try {
            const { data, error } = await supabase
                .from(TABLES.TASKS)
                .update(updates)
                .eq('id', taskId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw handleError(error);
        }
    },

    async deleteTask(taskId: string): Promise<void> {
        try {
            const { error } = await supabase
                .from(TABLES.TASKS)
                .delete()
                .eq('id', taskId);

            if (error) throw error;
        } catch (error) {
            throw handleError(error);
        }
    },

    async getTask(taskId: string): Promise<Task> {
        try {
            const { data, error } = await supabase
                .from(TABLES.TASKS)
                .select()
                .eq('id', taskId)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw handleError(error);
        }
    },

    async getTasks(status?: TaskStatus): Promise<Task[]> {
        try {
            let query = supabase
                .from(TABLES.TASKS)
                .select()
                .order('due_date', { ascending: true });

            if (status) {
                query = query.eq('status', status);
            }

            const { data, error } = await query;

            if (error) throw error;
            return data || [];
        } catch (error) {
            throw handleError(error);
        }
    },
}; 