'use client';

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://irewerufdyabprcudeov.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyZXdlcnVmZHlhYnByY3VkZW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMDc5MDAsImV4cCI6MjA3MjU4MzkwMH0.mZVSYcMM74GTEtV5A5HCYUAMucbHi9R3WdGrgbHFKNc";
export  const supabase = createClient(supabaseUrl, supabaseKey);
