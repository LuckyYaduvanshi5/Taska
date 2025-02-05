import { supabase, handleError } from './supabase';
import type { UserSettings } from '../types/database';
import { TABLES } from '../constants/supabase';

export interface UpdateSettingsDTO {
    focus_duration?: number;
    short_break_duration?: number;
    long_break_duration?: number;
    pomodoros_until_long_break?: number;
    notification_enabled?: boolean;
    sound_enabled?: boolean;
    theme?: string;
}

export const SettingsService = {
    async getUserSettings(): Promise<UserSettings | null> {
        try {
            const { data, error } = await supabase
                .from(TABLES.USER_SETTINGS)
                .select()
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // No settings found, create default settings
                    return this._createDefaultSettings();
                }
                throw error;
            }
            return data;
        } catch (error) {
            throw handleError(error);
        }
    },

    async updateSettings(updates: UpdateSettingsDTO): Promise<UserSettings> {
        try {
            const { data, error } = await supabase
                .from(TABLES.USER_SETTINGS)
                .update(updates)
                .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw handleError(error);
        }
    },

    async _createDefaultSettings(): Promise<UserSettings> {
        try {
            const { data, error } = await supabase
                .from(TABLES.USER_SETTINGS)
                .insert({
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                    focus_duration: 25,
                    short_break_duration: 5,
                    long_break_duration: 15,
                    pomodoros_until_long_break: 4,
                    notification_enabled: true,
                    sound_enabled: true,
                    theme: 'light',
                })
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            throw handleError(error);
        }
    },
}; 