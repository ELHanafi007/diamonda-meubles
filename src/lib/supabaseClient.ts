import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zdtxoprqyouczborasvf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkdHhvcHJxeW91Y3pib3Jhc3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMzc3NDcsImV4cCI6MjA5MTcxMzc0N30.lxO3RROeLFi4A-S7L3gXtS2VgLEqhQ7f7IDDVT4iO_s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
