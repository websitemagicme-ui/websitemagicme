/*
# Add screenshot uploads to client support tickets

1. Modified Tables
- `support_tickets.screenshot_paths`: optional array of private Storage object paths for screenshots attached to a ticket.

2. Storage
- Create the private `support-screenshots` bucket.
- Limit each file to 5 MB.
- Accept PNG, JPEG, WebP, and GIF image files only.
- Allow anonymous visitors to upload new screenshot objects because support tickets are submitted without client accounts.
- Allow authenticated admin users to read, update, and delete stored screenshot objects.

3. Security
- The bucket is private; files are not exposed through permanent public URLs.
- RLS policies scope writes and reads to the support-screenshots bucket.
- The application uses randomized object names rather than trusting uploaded filenames.

4. Important Notes
- The website limits each support submission to three screenshots and validates file size and type before upload.
- Larger files are not uploaded through this form; the support page directs clients to email support@websitemagic.me or use TransferNow and paste the share link into the request description.
- Existing support tickets remain unchanged and receive an empty screenshot path array.
*/

ALTER TABLE support_tickets
  ADD COLUMN IF NOT EXISTS screenshot_paths text[] NOT NULL DEFAULT '{}'::text[];

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'support-screenshots',
  'support-screenshots',
  false,
  5242880,
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE
SET public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif']::text[];

DROP POLICY IF EXISTS "public_upload_support_screenshots" ON storage.objects;
CREATE POLICY "public_upload_support_screenshots" ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'support-screenshots');

DROP POLICY IF EXISTS "admin_read_support_screenshots" ON storage.objects;
CREATE POLICY "admin_read_support_screenshots" ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'support-screenshots');

DROP POLICY IF EXISTS "admin_update_support_screenshots" ON storage.objects;
CREATE POLICY "admin_update_support_screenshots" ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'support-screenshots')
  WITH CHECK (bucket_id = 'support-screenshots');

DROP POLICY IF EXISTS "admin_delete_support_screenshots" ON storage.objects;
CREATE POLICY "admin_delete_support_screenshots" ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'support-screenshots');