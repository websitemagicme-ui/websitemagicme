import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Upload,
  AlertCircle,
} from 'lucide-react';
import SEO from '@/components/SEO';
import { DEMOS, getDemo, type DemoId } from '@/data/demos';
import { PLANS, getPlan, getZeroMonthly, type PlanId } from '@/data/plans';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface FormState {
  design: DemoId | '';
  businessName: string;
  industry: string;
  location: string;
  existingUrl: string;
  businessDescription: string;
  services: string;
  businessHours: string;
  preferredColors: string;
  hasLogo: boolean;
  goals: string;
  features: string[];
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  plan: PlanId;
  zeroUpfront: boolean;
}

const ALL_FEATURES = [
  { id: 'contact-form', label: 'Contact form' },
  { id: 'appointment-booking', label: 'Appointment booking' },
  { id: 'ai-receptionist', label: 'AI receptionist' },
  { id: 'online-payments', label: 'Online payments' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'customer-reviews', label: 'Customer reviews' },
  { id: 'additional-pages', label: 'Additional pages' },
];

const INDUSTRIES = [
  'Barbershop / Salon',
  'Restaurant / Cafe',
  'Plumbing / HVAC / Electrical',
  'Cleaning / Landscaping',
  'Dental / Healthcare',
  'Contractor',
  'Consulting / Professional Services',
  'Other',
];

const CONTACT_METHODS = ['Email', 'Phone', 'Text message'];

const TOTAL_STEPS = 6;

export default function GetStartedPage() {
  const [params] = useSearchParams();
  const initialPlan = (params.get('plan') as PlanId) || 'business';
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState<FormState>({
    design: '',
    businessName: '',
    industry: '',
    location: '',
    existingUrl: '',
    businessDescription: '',
    services: '',
    businessHours: '',
    preferredColors: '',
    hasLogo: false,
    goals: '',
    features: [],
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'Email',
    plan: initialPlan,
    zeroUpfront: params.get('offer') === 'zero',
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleFeature = (id: string) =>
    setForm((f) => ({
      ...f,
      features: f.features.includes(id)
        ? f.features.filter((x) => x !== id)
        : [...f.features, id],
    }));

  const selectedPlan = useMemo(() => getPlan(form.plan), [form.plan]);

  // Step validation
  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (step === 0 && !form.design) e.design = 'Please choose a design to continue.';
    if (step === 1) {
      if (!form.businessName.trim()) e.businessName = 'Business name is required.';
      if (!form.industry) e.industry = 'Please select your industry.';
    }
    if (step === 4) {
      if (!form.fullName.trim()) e.fullName = 'Your name is required.';
      if (!form.email.trim()) e.email = 'Email is required.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
      if (!form.phone.trim()) e.phone = 'Phone number is required.';
      if (!form.preferredContact) e.preferredContact = 'Please choose a contact method.';
    }
    return e;
  }, [step, form]);

  const stepValid = Object.keys(errors).length === 0;

  const next = () => {
    setTouched({});
    if (stepValid) setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    else setTouched({ all: true } as Record<string, boolean>);
  };

  const back = () => {
    setTouched({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    if (!stepValid) {
      setTouched({ all: true } as Record<string, boolean>);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('website_requests').insert({
          selected_design: form.design || null,
          business_name: form.businessName,
          industry: form.industry,
          location: form.location,
          existing_url: form.existingUrl,
          business_description: form.businessDescription,
          services_offered: form.services,
          business_hours: form.businessHours,
          preferred_colors: form.preferredColors,
          has_logo: form.hasLogo,
          website_goals: form.goals,
          features: form.features,
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          preferred_contact: form.preferredContact,
          selected_plan: form.plan,
          zero_upfront: form.zeroUpfront,
          setup_price: form.zeroUpfront ? '$0' : selectedPlan.setupPrice,
          monthly_price: selectedPlan.monthlyPrice,
        });
        if (error) throw error;
      }
      setSubmitted(true);
    } catch {
      setSubmitError('Something went wrong submitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl container-px py-20">
        <div className="card p-10 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-400/15 text-accent-600">
            <CheckCircle2 size={30} />
          </span>
          <h1 className="mt-5 font-display text-3xl text-ink-900">Request received!</h1>
          <p className="mt-3 text-ink-600">
            Thanks, {form.fullName.split(' ')[0]}. We've received your website request for{' '}
            {form.businessName}. A real person from our team will reach out within one business day to
            confirm the details and next steps.
          </p>
          {!isSupabaseConfigured && (
            <p className="mt-4 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-xs text-ink-600">
              Note: Database storage isn't connected yet, so this submission was demonstrated locally. Your
              request will be stored once the backend is linked.
            </p>
          )}
          <div className="mt-7 flex justify-center gap-3">
            <button onClick={() => navigate('/')} className="btn-secondary">
              Back to Home
            </button>
            <button onClick={() => navigate('/contact')} className="btn-primary">
              Book a Call
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="mx-auto max-w-3xl container-px py-10 lg:py-14">
      <SEO canonicalPath="/get-started" title="Get Started — Build Your Website" description="Tell us about your business and pick a design. We'll build, host, and maintain your professional website. Takes 3 minutes, no credit card needed." />
      {/* Header + progress */}
      <div className="mb-8">
        <h1 className="font-display text-3xl text-ink-900">Let's build your website</h1>
        <p className="mt-2 text-sm text-ink-500">
          Step {step + 1} of {TOTAL_STEPS} — takes about 3 minutes. No credit card needed.
        </p>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink-200">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        {/* STEP 0 — Choose design */}
        {step === 0 && (
          <div>
            <h2 className="heading-3 text-ink-900">Choose a website design</h2>
            <p className="mt-1.5 text-sm text-ink-500">Pick the style you like best — we'll customize it for your brand.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DEMOS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => update('design', d.id)}
                  className={`group relative overflow-hidden rounded-xl border-2 bg-white text-left transition-all ${
                    form.design === d.id
                      ? 'border-brand-600 ring-2 ring-brand-100'
                      : 'border-ink-200 hover:border-ink-300'
                  }`}
                >
                  <div className="h-24 w-full" style={{ background: `linear-gradient(135deg, ${d.accentColor}, ${d.accentColor}cc)` }}>
                    <div className="flex h-full items-center justify-center text-xs font-bold text-white opacity-90">
                      {d.businessName}
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium text-ink-400">{d.industry}</p>
                    <p className="text-sm font-semibold text-ink-800">{d.businessName}</p>
                  </div>
                  {form.design === d.id && (
                    <span className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                  )}
                </button>
              ))}
            </div>
            {(touched.all || touched.design) && errors.design && (
              <FieldError msg={errors.design} />
            )}
          </div>
        )}

        {/* STEP 1 — Business info */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="heading-3 text-ink-900">Tell us about your business</h2>
              <p className="mt-1.5 text-sm text-ink-500">The basics so we understand what you do.</p>
            </div>
            <Field label="Business name" required error={touched.all ? errors.businessName : undefined}>
              <input
                value={form.businessName}
                onChange={(e) => update('businessName', e.target.value)}
                placeholder="e.g. Blade & Co."
                className="form-input"
              />
            </Field>
            <Field label="Business industry" required error={touched.all ? errors.industry : undefined}>
              <select
                value={form.industry}
                onChange={(e) => update('industry', e.target.value)}
                className="form-input"
              >
                <option value="">Select your industry</option>
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </Field>
            <Field label="Business location">
              <input
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="City, State"
                className="form-input"
              />
            </Field>
            <Field label="Existing website URL (if any)">
              <input
                value={form.existingUrl}
                onChange={(e) => update('existingUrl', e.target.value)}
                placeholder="https://yourcurrentsite.com"
                className="form-input"
              />
            </Field>
            <Field label="Business description">
              <textarea
                value={form.businessDescription}
                onChange={(e) => update('businessDescription', e.target.value)}
                rows={3}
                placeholder="What do you do, and what makes your business special?"
                className="form-input resize-none"
              />
            </Field>
          </div>
        )}

        {/* STEP 2 — Services and branding */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="heading-3 text-ink-900">Services and branding</h2>
              <p className="mt-1.5 text-sm text-ink-500">Help us tailor the design and content to your business.</p>
            </div>
            <Field label="Services offered">
              <textarea
                value={form.services}
                onChange={(e) => update('services', e.target.value)}
                rows={3}
                placeholder="e.g. Haircuts, beard trims, hot towel shaves..."
                className="form-input resize-none"
              />
            </Field>
            <Field label="Business hours">
              <input
                value={form.businessHours}
                onChange={(e) => update('businessHours', e.target.value)}
                placeholder="e.g. Mon–Fri 8 AM–7 PM, Sat 8 AM–5 PM"
                className="form-input"
              />
            </Field>
            <Field label="Preferred colors">
              <input
                value={form.preferredColors}
                onChange={(e) => update('preferredColors', e.target.value)}
                placeholder="e.g. Navy and gold, or 'match my logo'"
                className="form-input"
              />
            </Field>
            <Field label="Do you have an existing logo?">
              <div className="flex gap-2">
                <button
                  onClick={() => update('hasLogo', true)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    form.hasLogo ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600'
                  }`}
                >
                  Yes, I have a logo
                </button>
                <button
                  onClick={() => update('hasLogo', false)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    !form.hasLogo ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600'
                  }`}
                >
                  No, I need one
                </button>
              </div>
              {form.hasLogo && (
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-ink-300 bg-ink-50 px-4 py-3 text-sm text-ink-500">
                  <Upload size={15} /> Logo upload available after we reach out — no need to attach now.
                </div>
              )}
            </Field>
            <Field label="Website goals">
              <textarea
                value={form.goals}
                onChange={(e) => update('goals', e.target.value)}
                rows={2}
                placeholder="e.g. Get more bookings, look more professional..."
                className="form-input resize-none"
              />
            </Field>
          </div>
        )}

        {/* STEP 3 — Features */}
        {step === 3 && (
          <div>
            <h2 className="heading-3 text-ink-900">Choose your features</h2>
            <p className="mt-1.5 text-sm text-ink-500">Select the features you'd like on your website.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {ALL_FEATURES.map((feat) => {
                const checked = form.features.includes(feat.id);
                return (
                  <button
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                      checked ? 'border-brand-600 bg-brand-50' : 'border-ink-200 hover:border-ink-300'
                    }`}
                  >
                    <span
                      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                        checked ? 'border-brand-600 bg-brand-600 text-white' : 'border-ink-300'
                      }`}
                    >
                      {checked && <Check size={12} strokeWidth={3} />}
                    </span>
                    <span className="text-sm font-medium text-ink-800">{feat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4 — Contact */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="heading-3 text-ink-900">Your contact details</h2>
              <p className="mt-1.5 text-sm text-ink-500">So our team can reach out to finalize your project.</p>
            </div>
            <Field label="Full name" required error={touched.all ? errors.fullName : undefined}>
              <input
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Jane Smith"
                className="form-input"
              />
            </Field>
            <Field label="Email" required error={touched.all ? errors.email : undefined}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@business.com"
                className="form-input"
              />
            </Field>
            <Field label="Phone number" required error={touched.all ? errors.phone : undefined}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className="form-input"
              />
            </Field>
            <Field label="Preferred contact method" required error={touched.all ? errors.preferredContact : undefined}>
              <div className="flex flex-wrap gap-2">
                {CONTACT_METHODS.map((m) => (
                  <button
                    key={m}
                    onClick={() => update('preferredContact', m)}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      form.preferredContact === m
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-ink-200 text-ink-600'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        )}

        {/* STEP 5 — Confirm */}
        {step === 5 && (
          <div>
            <h2 className="heading-3 text-ink-900">Review and confirm</h2>
            <p className="mt-1.5 text-sm text-ink-500">Check everything looks right before submitting.</p>

            <div className="mt-6 space-y-4">
              {/* Plan selector */}
              <div className="rounded-xl border border-ink-200 bg-ink-50/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Choose your plan</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {PLANS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => update('plan', p.id)}
                      className={`rounded-lg border-2 p-3 text-left transition-all ${
                        form.plan === p.id ? 'border-brand-600 bg-white' : 'border-transparent bg-white/60'
                      }`}
                    >
                      <span className="text-sm font-semibold text-ink-900">{p.name}</span>
                      <p className="mt-0.5 text-xs text-ink-500">
                        {form.zeroUpfront ? `$0 setup · ${getZeroMonthly(p.id)}` : `${p.setupPrice} · ${p.monthlyPrice}`}
                      </p>
                    </button>
                  ))}
                </div>
                <label className="mt-3 flex items-center gap-2.5 rounded-lg bg-white px-3 py-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={form.zeroUpfront}
                    onChange={(e) => update('zeroUpfront', e.target.checked)}
                    className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-ink-700">
                    Apply the <strong className="font-semibold">$0 upfront offer</strong> — waives the setup fee in exchange for a higher monthly rate and a 12-month commitment.
                  </span>
                </label>
                {form.zeroUpfront && (
                  <div className="mt-2 rounded-lg bg-brand-50 px-3 py-2.5 text-xs text-brand-800">
                    With $0 upfront, your monthly rate becomes <strong>{getZeroMonthly(form.plan)}</strong> for 12 months. After the commitment, standard pricing ({selectedPlan.monthlyPrice}) applies.
                  </div>
                )}
              </div>

              {/* Summary */}
              <dl className="divide-y divide-ink-200/70 rounded-xl border border-ink-200 bg-white">
                <SummaryRow label="Design" value={form.design ? getDemo(form.design as DemoId).businessName : 'Not selected'} />
                <SummaryRow label="Business" value={form.businessName || '—'} />
                <SummaryRow label="Industry" value={form.industry || '—'} />
                <SummaryRow label="Location" value={form.location || '—'} />
                <SummaryRow
                  label="Features"
                  value={form.features.length ? `${form.features.length} selected` : 'None'}
                />
                <SummaryRow label="Contact" value={`${form.fullName} · ${form.email}`} />
                <SummaryRow label="Plan" value={selectedPlan.name} />
                <SummaryRow
                  label="Setup"
                  value={form.zeroUpfront ? '$0 (waived)' : selectedPlan.setupPrice}
                  highlight
                />
                <SummaryRow
                  label="Monthly"
                  value={form.zeroUpfront ? getZeroMonthly(form.plan) : selectedPlan.monthlyPrice}
                  highlight
                />
                {form.zeroUpfront && (
                  <SummaryRow label="Commitment" value="12 months" />
                )}
              </dl>

              {form.zeroUpfront && (
                <p className="rounded-lg bg-brand-50 px-4 py-2.5 text-xs text-brand-800">
                  The setup fee is waived with your 12-month commitment. Your monthly rate is{' '}
                  <strong>{getZeroMonthly(form.plan)}</strong> during the commitment period — standard pricing
                  ({selectedPlan.monthlyPrice}) applies after. E-Shop and custom websites are priced separately.
                </p>
              )}

              {submitError && (
                <div className="flex items-start gap-2.5 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" /> {submitError}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={back}
            disabled={step === 0}
            className="btn-secondary disabled:opacity-40"
          >
            <ArrowLeft size={16} /> Back
          </button>
          {step < TOTAL_STEPS - 1 ? (
            <button onClick={next} className="btn-primary">
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={submit} disabled={submitting} className="btn-primary disabled:opacity-70">
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                <>Submit My Website Request</>
              )}
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-ink-400">
        No credit card required to submit this request. We'll confirm details and pricing before any work begins.
      </p>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-800">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-error">{error}</p>}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return <p className="mt-3 text-xs text-error">{msg}</p>;
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <dt className="text-sm text-ink-500">{label}</dt>
      <dd className={`text-sm font-medium text-right ${highlight ? 'text-brand-700' : 'text-ink-900'}`}>{value}</dd>
    </div>
  );
}
