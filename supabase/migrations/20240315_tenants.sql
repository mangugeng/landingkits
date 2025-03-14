-- Create tenants table
CREATE TABLE
    tenants (
        id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        logo TEXT,
        domain TEXT UNIQUE,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT TIMEZONE ('utc', NOW ()),
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT TIMEZONE ('utc', NOW ())
    );

-- Create trigger for updating updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE
UPDATE ON tenants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column ();

-- Enable RLS
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Policy for super_admin and admin (can do everything)
CREATE POLICY "admin_all" ON tenants FOR ALL TO authenticated USING (
    EXISTS (
        SELECT
            1
        FROM
            users
        WHERE
            users.id = auth.uid ()
            AND (
                users.role = 'super_admin'
                OR users.role = 'admin'
            )
    )
);

-- Policy for public read access
CREATE POLICY "public_read" ON tenants FOR
SELECT
    TO anon USING (is_active = true);

-- Insert sample tenant
INSERT INTO
    tenants (name, slug, description, logo)
VALUES
    (
        'Demo Landing Page',
        'demo',
        'Ini adalah contoh landing page untuk demonstrasi',
        '/images/tenants/demo-logo.png'
    );