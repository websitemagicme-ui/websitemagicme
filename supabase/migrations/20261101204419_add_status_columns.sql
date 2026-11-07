/*
# Add status columns for lead management

1. Modified Tables
- `inquiries`: add `status` column (text, default 'new') to track lead lifecycle
- `website_requests`: add `status` column (text, default 'new') to track project request lifecycle
2. Security
- No new policies needed — existing authenticated-only SELECT/UPDATE policies already cover these columns.
- No new grants needed — existing UPDATE grant on these tables covers the new column.
*/

ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';
ALTER TABLE website_requests ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status);
CREATE INDEX IF NOT EXISTS website_requests_status_idx ON website_requests (status);