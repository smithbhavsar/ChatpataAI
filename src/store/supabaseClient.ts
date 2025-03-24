import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://oisnzoubtvfjtuvzbjwy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pc256b3VidHZmanR1dnpiand5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NDk3MDMsImV4cCI6MjA1NjMyNTcwM30.IVTS-V_hsv08tsOW2UqEO7YLtLP4sNfF80R3qwgx9Sc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);