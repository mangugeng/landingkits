-- Enable storage policies for landingkits bucket
BEGIN;

-- Create bucket if not exists
INSERT INTO
    storage.buckets (id, name, public)
VALUES
    ('landingkits', 'landingkits', true) ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Remove existing policies for landingkits bucket
DROP POLICY IF EXISTS "Allow public read access for landingkits" ON storage.objects;

DROP POLICY IF EXISTS "Allow insert access for landingkits" ON storage.objects;

DROP POLICY IF EXISTS "Allow update access for landingkits" ON storage.objects;

DROP POLICY IF EXISTS "Allow delete access for landingkits" ON storage.objects;

-- Create new policies specific to landingkits bucket with anon access
CREATE POLICY "Allow public read access for landingkits" ON storage.objects FOR
SELECT
    USING (
        bucket_id = 'landingkits'
        AND auth.role () = 'anon'
    );

CREATE POLICY "Allow insert access for landingkits" ON storage.objects FOR INSERT
WITH
    CHECK (
        bucket_id = 'landingkits'
        AND auth.role () = 'anon'
    );

CREATE POLICY "Allow update access for landingkits" ON storage.objects FOR
UPDATE USING (
    bucket_id = 'landingkits'
    AND auth.role () = 'anon'
);

CREATE POLICY "Allow delete access for landingkits" ON storage.objects FOR DELETE USING (
    bucket_id = 'landingkits'
    AND auth.role () = 'anon'
);

-- Grant usage on storage schema
GRANT USAGE ON SCHEMA storage TO anon;

GRANT ALL ON storage.objects TO anon;

GRANT ALL ON storage.buckets TO anon;

COMMIT;