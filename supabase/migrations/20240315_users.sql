-- Create enum for user roles if not exists
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('super_admin', 'admin', 'user')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add unique constraint on email
DO $$ BEGIN
    ALTER TABLE public.users ADD CONSTRAINT users_email_key UNIQUE (email);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Super admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Super admins can insert users" ON public.users;
DROP POLICY IF EXISTS "Super admins can update users" ON public.users;
DROP POLICY IF EXISTS "Super admins can delete users" ON public.users;

-- Create policies
DO $$ BEGIN
    CREATE POLICY "Users can view their own data" ON public.users
        FOR SELECT
        USING (auth.uid() = id);
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Super admins can view all users" ON public.users
        FOR SELECT
        USING (
            EXISTS (
                SELECT 1 FROM public.users
                WHERE id = auth.uid()
                AND role = 'super_admin'
            )
        );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Super admins can insert users" ON public.users
        FOR INSERT
        WITH CHECK (
            EXISTS (
                SELECT 1 FROM public.users
                WHERE id = auth.uid()
                AND role = 'super_admin'
            )
        );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Super admins can update users" ON public.users
        FOR UPDATE
        USING (
            EXISTS (
                SELECT 1 FROM public.users
                WHERE id = auth.uid()
                AND role = 'super_admin'
            )
        );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE POLICY "Super admins can delete users" ON public.users
        FOR DELETE
        USING (
            EXISTS (
                SELECT 1 FROM public.users
                WHERE id = auth.uid()
                AND role = 'super_admin'
            )
        );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create trigger for updated_at if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ BEGIN
    CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON public.users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create super admin in auth.users
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@landingkits.com',
    crypt('Farhan!234', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '',
    '',
    '',
    ''
) ON CONFLICT (email) DO NOTHING;

-- Get the auth user id and insert into public.users
DO $$
DECLARE
    auth_user_id UUID;
BEGIN
    SELECT id INTO auth_user_id FROM auth.users WHERE email = 'admin@landingkits.com';

    -- Delete existing record if exists
    DELETE FROM public.users WHERE email = 'admin@landingkits.com';

    -- Insert new record
    INSERT INTO public.users (id, email, password, name, role)
    VALUES (
        auth_user_id,
        'admin@landingkits.com',
        crypt('Farhan!234', gen_salt('bf')),
        'Super Admin',
        'super_admin'
    );
END $$;