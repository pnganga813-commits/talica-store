import { createClient } from '@supabase/supabase-js';
import { STORE_CONFIG } from '../config';

// Wrapper to fix WebSocket constructor error in certain environments
class CustomWebSocket extends WebSocket {
  constructor(url: string | URL, protocols?: string | string[]) {
    super(url, protocols);
  }
}

export const supabase = createClient(
  STORE_CONFIG.SUPABASE_URL,
  STORE_CONFIG.SUPABASE_PUBLISHABLE_KEY,
  {
    realtime: {
      transport: CustomWebSocket
    }
  }
);
