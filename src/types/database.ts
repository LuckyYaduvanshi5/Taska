export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface Task {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    priority: TaskPriority;
    status: TaskStatus;
    due_date?: string;
    estimated_pomodoros: number;
    completed_pomodoros: number;
    created_at: string;
    updated_at: string;
}

export interface UserSettings {
    id: string;
    user_id: string;
    focus_duration: number;
    short_break_duration: number;
    long_break_duration: number;
    pomodoros_until_long_break: number;
    notification_enabled: boolean;
    sound_enabled: boolean;
    theme: string;
    created_at: string;
    updated_at: string;
}

export interface FocusSession {
    id: string;
    user_id: string;
    task_id?: string;
    start_time: string;
    end_time?: string;
    duration: number;
    completed: boolean;
    notes?: string;
    created_at: string;
}

export interface Database {
    public: {
        Tables: {
            tasks: {
                Row: Task;
                Insert: Omit<Task, 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>;
            };
            user_settings: {
                Row: UserSettings;
                Insert: Omit<UserSettings, 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Omit<UserSettings, 'id' | 'created_at' | 'updated_at'>>;
            };
            focus_sessions: {
                Row: FocusSession;
                Insert: Omit<FocusSession, 'id' | 'created_at'>;
                Update: Partial<Omit<FocusSession, 'id' | 'created_at'>>;
            };
        };
    };
} 