import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ewgtclzscwbokxmzxbcu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3Z3RjbHpzY3dib2t4bXp4YmN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwODA3MzIsImV4cCI6MjA4MDY1NjczMn0.QkM72rVeBpm6uGgBVdG4ulIzEg3V_7T8usqvIf6vBto';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function inspect(table) {
    console.log(`Inspecting ${table}...`);
    const { data, error } = await supabase.from(table).select('*').limit(1);

    if (error) {
        console.log(`Failed to load ${table}: ${error.message}`);
    } else {
        if (data && data.length > 0) {
            console.log(`${table} keys:`, Object.keys(data[0]));
        } else {
            console.log(`${table} is empty.`);
        }
    }
}

async function run() {
    await inspect('Services'); // Capitalized
    await inspect('services'); // Lowercase
    await inspect('Titles');

    console.log('Attempting to insert dummy record into Titles...');
    const { data, error } = await supabase
        .from('Titles')
        .insert([
            {
                "VIN": "TEST123456789",
                "Sheet": "Test Sheet",
                "Unit Type": "Truck",
                "Location": "Test Location",
                "Lien Status": "Pending"
            }
        ])
        .select();

    if (error) {
        console.error('Insert error:', error);
    } else {
        console.log('Insert success:', data);
    }
}

run();
