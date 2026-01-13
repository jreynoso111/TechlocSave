import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_KEY, SUPABASE_URL } from './env.js';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    'Supabase URL or Key is missing. Check your env.js or environment variables.'
  );
}

const DEFAULT_FETCH_TIMEOUT_MS = 300_000; // 5 minutes to accommodate large uploads

const createFetchWithTimeout = (timeoutMs = DEFAULT_FETCH_TIMEOUT_MS) => {
  if (typeof fetch !== 'function') return null;
  return (resource, options = {}) => {
    return fetch(resource, options);
  };
};

const supabase = createClient(SUPABASE_URL || '', SUPABASE_KEY || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: createFetchWithTimeout(),
  },
});

// compatibility with legacy scripts
if (typeof window !== 'undefined') {
  window.supabaseClient = supabase;
}

export { supabase };
export default supabase;
