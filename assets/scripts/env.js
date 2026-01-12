// Safe fallbacks for Vite environment variables
let supabaseUrl = 'https://ewgtclzscwbokxmzxbcu.supabase.co';
let supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3Z3RjbHpzY3dib2t4bXp4YmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwODA3MzIsImV4cCI6MjA4MDY1NjczMn0.QkM72rVeBpm6uGgBVdG4ulIzEg3V_7T8usqvIf6vBto';

try {
    // Check if we are in a Vite environment
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        if (import.meta.env.VITE_SUPABASE_URL) supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        if (import.meta.env.VITE_SUPABASE_KEY) supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
    }
} catch (e) {
    // Fallback to hardcoded keys already set above
}

export const SUPABASE_URL = supabaseUrl;
export const SUPABASE_KEY = supabaseKey;
