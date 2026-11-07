/*
# Create inquiries and website project request tables

1. New Tables
- `inquiries`: simple contact form submissions (name, email, business name, service interest, message)
- `website_requests`: full multi-step onboarding submissions (design, business info, services, features, contact, selected plan)
2. Security
- No sign-in screen → single-tenant, public-write schema.
- Enable RLS on both tables.
- Grant INSERT to anon + authenticated (public submission forms).
- Grant SELECT/UPDATE/DELETE only to authenticated (admin dashboard reads; not used by anon frontend yet, but reserved).
- INSERT policies use WITH CHECK (true) since any visitor may submit an inquiry.
- No SELECT policy for anon → visitors cannot read other people's submissions (privacy).
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  business_name text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON inquiries TO authenticated;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_inquiries" ON inquiries;
CREATE POLICY "auth_read_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_inquiries" ON inquiries;
CREATE POLICY "auth_update_inquiries" ON inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_inquiries" ON inquiries;
CREATE POLICY "auth_delete_inquiries" ON inquiries FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS website_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Step 1: design
  selected_design text,
  -- Step 2: business info
  business_name text NOT NULL,
  industry text,
  location text,
  existing_url text,
  business_description text,
  -- Step 3: services and branding
  services_offered text,
  business_hours text,
  preferred_colors text,
  has_logo boolean DEFAULT false,
  website_goals text,
  -- Step 4: features
  features jsonb DEFAULT '[]'::jsonb,
  -- Step 5: contact
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  preferred_contact text,
  -- Plan selection
  selected_plan text,
  zero_upfront boolean DEFAULT false,
  -- Pricing snapshot
  setup_price text,
  monthly_price text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE website_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON website_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON website_requests TO authenticated;

DROP POLICY IF EXISTS "anon_insert_requests" ON website_requests;
CREATE POLICY "anon_insert_requests" ON website_requests FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_requests" ON website_requests;
CREATE POLICY "auth_read_requests" ON website_requests FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_requests" ON website_requests;
CREATE POLICY "auth_update_requests" ON website_requests FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_requests" ON website_requests;
CREATE POLICY "auth_delete_requests" ON website_requests FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS website_requests_created_at_idx ON website_requests (created_at DESC);