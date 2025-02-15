import { createClient } from '@supabase/supabase-js';

// Get your Supabase URL and Anon Key from the Supabase project settings
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL; // Your Supabase URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Your Supabase Anon Key

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
