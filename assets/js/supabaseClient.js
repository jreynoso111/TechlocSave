import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../scripts/env.js';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    'Supabase URL or Key is missing. Check your .env file.'
  );
}

const DEFAULT_FETCH_TIMEOUT_MS = 300_000; // 5 minutes to accommodate large uploads

const createFetchWithTimeout = (timeoutMs = DEFAULT_FETCH_TIMEOUT_MS) => {
  if (typeof fetch !== 'function') return null;
  return (resource, options = {}) => {
    const controller = new AbortController();
    const { signal, ...rest } = options || {};
    const timeoutId = setTimeout(() => controller.abort('timeout'), timeoutMs);

    if (signal) {
      if (signal.aborted) controller.abort(signal.reason);
      signal.addEventListener(
        'abort',
        () => controller.abort(signal.reason),
        { once: true }
      );
    }

    return fetch(resource, { ...rest, signal: controller.signal }).finally(() =>
      clearTimeout(timeoutId)
    );
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

// For compatibility with legacy scripts that expect window.supabaseClient
if (typeof window !== 'undefined') {
  window.supabaseClient = supabase;
}

export { supabase };
export default supabase;

