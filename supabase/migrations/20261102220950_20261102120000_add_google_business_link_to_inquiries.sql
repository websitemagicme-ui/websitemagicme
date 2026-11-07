/*
# Add Google Business Profile link to contact inquiries

1. Modified Tables
- `inquiries.google_business_url`: optional text field storing the Google Business Profile or Google Maps listing link submitted through the contact form.

2. Application Impact
- Visitors can optionally provide their existing Google Business Profile link.
- Admin users can see the submitted link with the rest of the inquiry details.
- Existing inquiry records remain unchanged and receive NULL for this optional field.

3. Security
- No new tables are created.
- Existing RLS policies remain in place.
- Existing INSERT access for public contact submissions and authenticated admin access continue to apply to the new column.

4. Important Notes
- The field is optional so businesses without a Google Business Profile can still submit the form.
- The link is stored as text and is not fetched or opened by the database.
*/

ALTER TABLE inquiries
  ADD COLUMN IF NOT EXISTS google_business_url text;