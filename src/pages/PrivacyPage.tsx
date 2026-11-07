import LegalLayout from './LegalLayout';
import SEO from '@/components/SEO';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="November 1, 2026">
      <SEO canonicalPath="/privacy" title="Privacy Policy" description="WebsiteMagic.me privacy policy — what information we collect, how we use it, and your rights." />
      <p>
        WebsiteMagic.me ("we," "our," "us") respects your privacy. This policy explains what information
        we collect when you use our website and services, how we use it, and the choices you have.
        [This is a starting template — review and customize before launch.]
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you submit a contact form or website request, we collect the information you provide — your
        name, email, phone number, business name, and details about your project. We also collect basic
        analytics like pages visited and approximate location.
      </p>

      <h2>How We Use Your Information</h2>
      <p>
        We use your information to respond to inquiries, prepare proposals, deliver and maintain your
        website, and improve our services. We never sell your data to third parties.
      </p>

      <h2>Data Storage</h2>
      <p>
        Your submission data is stored securely in our database and accessed only by our team for service
        delivery. [Specify data retention period before launch.]
      </p>

      <h2>Cookies</h2>
      <p>
        We use essential cookies to operate the site and optional analytics cookies to understand usage.
        You can disable analytics cookies in your browser.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal data at any time by
        emailing hello@websitemagic.me.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email hello@websitemagic.me.
      </p>
    </LegalLayout>
  );
}
