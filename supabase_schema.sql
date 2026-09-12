-- ====================================================================
-- CHROMA VIDEO EDITOR: SUPABASE SQL DATABASE MIGRATION SCRIPT
-- Paste this script directly inside the SQL Editor of your Supabase Project.
-- Link: https://supabase.com/dashboard/project/_/sql
-- ====================================================================

-- 1. Create the user_projects table
-- This stores the individual timeline composition state for each authenticated artist.
CREATE TABLE IF NOT EXISTS public.user_projects (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    clips JSONB DEFAULT '[]'::jsonb NOT NULL,
    tracks JSONB DEFAULT '[]'::jsonb NOT NULL,
    aspect_ratio TEXT DEFAULT '16:9' NOT NULL,
    timeline_duration NUMERIC DEFAULT 71.81 NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Turn on Row Level Security (RLS)
-- This blocks unauthorized access or manipulation of user data by other guests.
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;

-- 3. Setup Row Level Security Policies
-- Policy A: Grant read-only access to owners
CREATE POLICY "Allow users to read their own projects"
ON public.user_projects
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy B: Grant full access (insert/update/delete) to owners
CREATE POLICY "Allow users to manage their own projects"
ON public.user_projects
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. Set up an automatic trigger to keep updated_at accurate
CREATE OR REPLACE FUNCTION public.set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_update_user_projects_timestamp
    BEFORE UPDATE ON public.user_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at_timestamp();

-- ====================================================================
-- SUCCESS: Table, RLS Policies, and Triggers initialized successfully!
-- ====================================================================
