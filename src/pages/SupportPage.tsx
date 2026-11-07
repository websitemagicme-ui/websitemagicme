import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, ClipboardList, Loader2, Mail } from 'lucide-react';
import SEO from '@/components/SEO';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const MAX_SCREENSHOTS = 3;
const MAX_SCREENSHOT_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

const REQUEST_TYPES = [
  'Add something to my website',
  'Change existing content or design',
  'Fix a website issue',
  'Update my business information',
  'Add a new feature or integration',
  'Other request',
];

export default function SupportPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    businessName: '',
    requestType: '',
    currentWebsite: '',
    message: '',
  });
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Your name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.';
    if (!form.requestType) nextErrors.requestType = 'Please select what you need.';
    if (!form.message.trim()) nextErrors.message = 'Please describe the requested change.';
    if (screenshots.length > MAX_SCREENSHOTS) nextErrors.screenshots = `Please choose no more than ${MAX_SCREENSHOTS} screenshots.`;
    if (screenshots.some((file) => !ACCEPTED_IMAGE_TYPES.includes(file.type) || file.size > MAX_SCREENSHOT_SIZE)) {
      nextErrors.screenshots = 'Screenshots must be PNG, JPG, WebP, or GIF files under 5 MB each.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      let screenshotPaths: string[] = [];
      if (isSupabaseConfigured && supabase) {
        const client = supabase;
        const uploaded = await Promise.all(screenshots.map(async (file) => {
          const extension = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
          const path = `incoming/${crypto.randomUUID()}.${extension}`;
          const { error } = await client.storage.from('support-screenshots').upload(path, file, {
            contentType: file.type,
            upsert: false,
          });
          if (error) throw error;
          return path;
        }));
        screenshotPaths = uploaded;

        const { error } = await client.from('support_tickets').insert({
          full_name: form.fullName,
          email: form.email,
          business_name: form.businessName || null,
          request_type: form.requestType,
          current_website: form.currentWebsite || null,
          message: form.message,
          screenshot_paths: screenshotPaths,
        });
        if (error) throw error;
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-5xl container-px py-12 lg:py-16">
      <SEO canonicalPath="/support" title="Client Support" description="Need a change to your website? Send us the details and our team will handle it. Existing WebsiteMagic.me clients can request updates, fixes, and new features." />
      <div className="max-w-2xl">
        <span className="eyebrow">Client support</span>
        <h1 className="heading-2 mt-4 text-ink-900">Need a change to your website?</h1>
        <p className="mt-4 text-lg text-ink-500">
          Send us the details and your request will go directly to our team. We will review it and follow up with the next steps.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="card p-6 sm:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-400/15 text-accent-600">
                <CheckCircle2 size={30} />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-ink-900">Request received</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-600">
                Thanks, {form.fullName.split(' ')[0] || 'there'}. Your request is with our team and we will contact you by email after reviewing it.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={() => { setStatus('idle'); setScreenshots([]); setForm({ fullName: '', email: '', businessName: '', requestType: '', currentWebsite: '', message: '' }); }} className="btn-secondary">
                  Submit another request
                </button>
                <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <h2 className="text-sm font-semibold text-ink-900">Tell us who you are</h2>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-ink-800">Full name <span className="text-brand-600">*</span></label>
                    <input value={form.fullName} onChange={(event) => set('fullName', event.target.value)} className="form-input mt-1.5" placeholder="Jane Smith" />
                    {errors.fullName && <p className="mt-1.5 text-xs text-error">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-800">Email <span className="text-brand-600">*</span></label>
                    <input type="email" value={form.email} onChange={(event) => set('email', event.target.value)} className="form-input mt-1.5" placeholder="you@business.com" />
                    {errors.email && <p className="mt-1.5 text-xs text-error">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-800">Business name</label>
                    <input value={form.businessName} onChange={(event) => set('businessName', event.target.value)} className="form-input mt-1.5" placeholder="Your business" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-800">Current website</label>
                    <input type="url" value={form.currentWebsite} onChange={(event) => set('currentWebsite', event.target.value)} className="form-input mt-1.5" placeholder="https://..." />
                  </div>
                </div>
              </div>

              <div className="border-t border-ink-100 pt-5">
                <label className="block text-sm font-medium text-ink-800">What do you need? <span className="text-brand-600">*</span></label>
                <select value={form.requestType} onChange={(event) => set('requestType', event.target.value)} className="form-input mt-1.5">
                  <option value="">Select a request type</option>
                  {REQUEST_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
                {errors.requestType && <p className="mt-1.5 text-xs text-error">{errors.requestType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-800">Describe the change or issue <span className="text-brand-600">*</span></label>
                <textarea value={form.message} onChange={(event) => set('message', event.target.value)} rows={6} className="form-input mt-1.5 resize-none" placeholder="Tell us what you would like changed, added, or fixed..." />
                {errors.message && <p className="mt-1.5 text-xs text-error">{errors.message}</p>}
              </div>

              <div className="rounded-xl border border-ink-200 bg-ink-50/60 p-4">
                <label className="block text-sm font-medium text-ink-800">Attach screenshots <span className="font-normal text-ink-400">(optional)</span></label>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">Add up to 3 PNG, JPG, WebP, or GIF screenshots. Each file must be under 5 MB.</p>
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple onChange={(event) => setScreenshots(Array.from(event.target.files ?? []))} className="mt-3 block w-full text-sm text-ink-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-brand-700 hover:file:bg-brand-100" />
                {screenshots.length > 0 && <p className="mt-2 text-xs text-ink-500">{screenshots.length} screenshot{screenshots.length === 1 ? '' : 's'} selected.</p>}
                {errors.screenshots && <p className="mt-1.5 text-xs text-error">{errors.screenshots}</p>}
                <p className="mt-3 text-xs leading-relaxed text-ink-500">Need to send larger files? Email <a href="mailto:support@websitemagic.me" className="font-semibold text-brand-600 hover:text-brand-700">support@websitemagic.me</a> or upload them to <a href="https://www.transfernow.net/en" target="_blank" rel="noreferrer" className="font-semibold text-brand-600 hover:text-brand-700">TransferNow</a> and paste the share link into the description above.</p>
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2.5 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  We could not send your request. Please try again or email hello@websitemagic.me.
                </div>
              )}

              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto">
                {status === 'submitting' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send Support Request <ArrowRight size={16} /></>}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ClipboardList size={18} />
            </span>
            <h2 className="mt-4 text-sm font-semibold text-ink-900">What happens next?</h2>
            <ol className="mt-3 space-y-3 text-sm leading-relaxed text-ink-600">
              <li><strong className="text-ink-800">1. We review your request.</strong> We look at the details and confirm what is needed.</li>
              <li><strong className="text-ink-800">2. We reply by email.</strong> You will hear from our team with timing or any questions.</li>
              <li><strong className="text-ink-800">3. We make the change.</strong> Once agreed, we take care of the update for you.</li>
            </ol>
          </div>
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-ink-900">Prefer email?</h2>
            <a href="mailto:hello@websitemagic.me" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700">
              <Mail size={16} /> hello@websitemagic.me
            </a>
            <p className="mt-3 text-xs leading-relaxed text-ink-500">Include your business name and the website change you need.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
