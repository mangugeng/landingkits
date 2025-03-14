-- Update password for super admin
UPDATE users
SET
    password = crypt ('Farhan!234', gen_salt ('bf'))
WHERE
    email = 'admin@landingkits.com';