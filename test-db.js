import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ewgtclzscwbokxmzxbcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3Z3RjbHpzY3dib2t4bXp4YmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwODA3MzIsImV4cCI6MjA4MDY1NjczMn0.QkM72rVeBpm6uGgBVdG4ulIzEg3V_7T8usqvIf6vBto';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testConnection() {
    console.log('Testing connection to Supabase...');
    const { data, error } = await supabase.from('services').select('*').limit(5);

    if (error) {
        console.error('Profiles Query Error:', error.message);
    } else {
        console.log('Profiles Data:', data);
    }

    console.log('Testing Authentication...');
    const email = 'jreynoso111@gmail.com';
    const password = 'Reyper09';

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (authError) {
        console.error('Auth Error:', authError.message);
    } else {
        console.log('Auth Successful! User:', authData.user.email);
    }
}

testConnection();
