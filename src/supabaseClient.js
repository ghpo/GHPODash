import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wqhcdxtiapkgvvvwozfm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxaGNkeHRpYXBrZ3Z2dndvemZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxNzYyMTIsImV4cCI6MjA1Nzc1MjIxMn0.H0gi2clR8dTxPo-HajB36C4-erDH3nzzNw-5hbFPWwM'
export const supabase = createClient(supabaseUrl, supabaseKey)
