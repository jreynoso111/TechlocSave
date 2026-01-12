import { SUPABASE_KEY, SUPABASE_URL } from './env.js';

// Determine the createClient function
let createClientFunc;
if (typeof window !== 'undefined' && window.supabase && window.supabase.createClient) {
  createClientFunc = window.supabase.createClient;
} else {
  // We'll try to use the one from the module import if we're in a build environment
  // In a plain browser, the script tag for supabase-js should be present.
  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    createClientFunc = createClient;
  } catch (e) {
    console.error('Failed to load Supabase client module.');
  }
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    'Supabase URL or Key is missing. Check your .env file.'
  );
}

const DEFAULT_FETCH_TIMEOUT_MS = 300_000; // 5 minutes to accommodate large uploads

const createFetchWithTimeout = (timeoutMs = DEFAULT_FETCH_TIMEOUT_MS) => {
  if (typeof fetch !== 'function') return null;
  return (resource, options = {}) => {
    return fetch(resource, options);
  };
};

const supabase = createClientFunc ? createClientFunc(SUPABASE_URL || '', SUPABASE_KEY || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: createFetchWithTimeout(),
  },
}) : null;

// compatibility with legacy scripts
if (typeof window !== 'undefined') {
  window.supabaseClient = supabase;
}

export { supabase };
export default supabase;

