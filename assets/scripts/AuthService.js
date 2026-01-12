import { supabase } from './supabaseClient.js';

export class AuthService {
    static async getSession() {
        try {
            if (!supabase) return null;
            const { data } = await supabase.auth.getSession();
            return data.session;
        } catch (err) {
            console.error('Error getting session:', err);
            return null;
        }
    }

    static async getUserProfile(userId) {
        try {
            if (!supabase) return null;
            const { data, error } = await supabase
                .from('profiles')
                .select('role, status')
                .eq('id', userId)
                .single();

            if (error || !data) return { role: 'user', status: 'active' };
            return { role: data.role || 'user', status: data.status || 'active' };
        } catch (err) {
            console.error('Error fetching profile:', err);
            return { role: 'user', status: 'active' };
        }
    }

    static async logout() {
        if (!supabase) return;
        await supabase.auth.signOut();
        window.location.reload();
    }

    static onAuthStateChange(callback) {
        if (!supabase) return;
        return supabase.auth.onAuthStateChange(callback);
    }
}
