/*
# Create client support tickets

1. New Tables
- `support_tickets`: requests from existing WebsiteMagic.me clients who need a website change, addition, fix, or question answered.
- `id`: unique ticket identifier.
- `full_name`: client's name.
- `email`: email address used for follow-up.
- `business_name`: client's business name.
- `request_type`: category of requested support.
- `current_website`: optional website address for context.
- `message`: details of the requested change or issue.
- `status`: admin workflow status, defaulting to `new`.
- `created_at`: submission timestamp.

2. Security
- Enable RLS on `support_tickets`.
- Allow anonymous and authenticated visitors to INSERT support tickets because clients submit requests without needing a separate client login.
- Allow authenticated admins to SELECT, UPDATE, and DELETE tickets for review and workflow management.
- Do not grant anonymous visitors read access to submitted tickets.

3. Important Notes
- The table is intentionally single-tenant and supports the existing admin dashboard workflow.
- Existing data is not modified.
- Ticket submissions are stored for admin follow-up; no automatic external message is sent by this change.
*/

CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  business_name text,
  request_type text NOT NULL,
  current_website text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON support_tickets TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON support_tickets TO authenticated;

DROP POLICY IF EXISTS "anon_insert_support_tickets" ON support_tickets;
CREATE POLICY "anon_insert_support_tickets" ON support_tickets FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_support_tickets" ON support_tickets;
CREATE POLICY "auth_read_support_tickets" ON support_tickets FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_support_tickets" ON support_tickets;
CREATE POLICY "auth_update_support_tickets" ON support_tickets FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_support_tickets" ON support_tickets;
CREATE POLICY "auth_delete_support_tickets" ON support_tickets FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS support_tickets_created_at_idx ON support_tickets (created_at DESC);
CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON support_tickets (status);