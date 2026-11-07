import LegalLayout from './LegalLayout';
import SEO from '@/components/SEO';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="November 1, 2026">
      <SEO canonicalPath="/terms" title="Terms of Service" description="WebsiteMagic.me terms of service — pricing, cancellation, website ownership, and acceptable use." />
      <p>
        These terms govern your use of WebsiteMagic.me and our managed website services. By submitting a
        request or purchasing a plan, you agree to these terms.
        [This is a starting template — review with legal counsel before launch.]
      </p>

      <h2>Services</h2>
      <p>
        We provide website design, development, hosting, maintenance, and AI receptionist services as
        described in your selected plan. Specific deliverables and timelines are confirmed in your
        service agreement before work begins.
      </p>

      <h2>Pricing and Fees</h2>
      <p>
        Setup fees and monthly service fees are listed on our pricing page. The $0-upfront offer waives
        the setup fee in exchange for a 12-month service commitment. Monthly fees continue for the
        duration of your commitment and any renewal period. Additional fees for complex work are
        disclosed and approved before work begins.
      </p>

      <h2>Cancellation</h2>
      <p>
        Standard plans are month-to-month after any commitment term. If you selected the $0-upfront
        offer, the 12-month service commitment applies. [Specify cancellation notice and any early
        termination terms before launch.]
      </p>

      <h2>Website Ownership</h2>
      <p>
        You own the content and branding created for your business. You may request a copy of your
        website files at any time. [Specify full ownership and transfer terms before launch.]
      </p>

      <h2>Acceptable Use</h2>
      <p>
        You agree not to use our services for unlawful activities, spam, or content that infringes on
        others' rights. We may suspend services for violations, with notice where possible.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Our services are provided "as is." We are not liable for indirect or consequential damages. Our
        total liability is limited to the fees you paid in the preceding 12 months.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email hello@websitemagic.me.
      </p>
    </LegalLayout>
  );
}
