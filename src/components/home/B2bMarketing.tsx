import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, CheckCircle2, Gift, Loader2, Target, Users, TrendingUp } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const PLANS = [
  {
    name: 'Starter',
    price: '$100',
    period: '/month',
    leads: '10–20 leads',
    features: ['Local B2B lead generation', 'Email + phone outreach', 'Monthly performance report', 'Cancel anytime'],
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$200',
    period: '/month',
    leads: '25–50 leads',
    features: ['Multi-channel lead generation', 'Targeted outreach campaigns', 'Bi-weekly reports', 'Priority support', 'Cancel anytime'],
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$300',
    period: '/month',
    leads: '50+ leads',
    features: ['Full-funnel B2B marketing', 'Dedicated campaign manager', 'Weekly reports + strategy calls', 'CRM integration', 'Cancel anytime'],
    highlight: false,
  },
];

const BENEFITS = [
  { icon: Target, title: 'Targeted B2B leads', desc: 'We find and qualify leads matched to your industry and service area.' },
  { icon: Users, title: 'You focus on closing', desc: 'We deliver warm leads to your inbox. You do what you do best — sell.' },
  { icon: TrendingUp, title: 'Scale on your terms', desc: 'Start free, upgrade when you see results. No long-term contracts.' },
];

export default function B2bMarketing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', businessName: '', industry: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Your name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Please enter a valid email.';
    if (!form.businessName.trim()) nextErrors.businessName = 'Business name is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('inquiries').insert({
          full_name: form.fullName,
          email: form.email,
          business_name: form.businessName,
          service: 'B2B Marketing — Free Trial ($30 value)',
          message: form.message || `B2B lead generation trial request. Industry: ${form.industry || 'not specified'}.`,
        });
        if (error) throw error;
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="b2b-marketing" className="section-y">
      <div className="mx-auto max-w-7xl container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">B2B Marketing Services</span>
          <h2 className="heading-2 mt-4 text-ink-900">Get leads. Or don&apos;t pay.</h2>
          <p className="mt-4 text-lg text-ink-500">
            We generate qualified B2B leads for your business. Try it free — we&apos;ll deliver 3 to 5 leads at no cost.
            If you like the results, continue with a monthly plan. If not, walk away. No contracts, no catch.
          </p>
        </div>

        {/* Free offer banner */}
        <div className="mt-8 overflow-hidden rounded-xl2 border border-accent-400/30 bg-gradient-to-br from-accent-400/10 to-brand-50 p-6 sm:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white">
                <Gift size={24} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-ink-900">$30 value — completely free</h3>
                <p className="mt-1 text-sm text-ink-600">3 to 5 qualified B2B leads delivered to your inbox. No card, no commitment.</p>
              </div>
            </div>
            <a href="#b2b-signup" className="btn-primary shrink-0">
              Claim your free leads <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="card p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <b.icon size={18} />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink-900">{b.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing + signup */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Monthly plans */}
          <div>
            <h3 className="text-sm font-semibold text-ink-900">Monthly plans after your free trial</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-xl border p-5 transition-all ${
                    plan.highlight
                      ? 'border-brand-400 bg-brand-50/40 shadow-soft ring-1 ring-brand-200'
                      : 'border-ink-200 bg-white'
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Most popular
                    </span>
                  )}
                  <p className="text-sm font-bold text-ink-900">{plan.name}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-600">{plan.leads}</p>
                  <p className="mt-3 flex items-baseline gap-0.5">
                    <span className="text-2xl font-bold text-ink-900">{plan.price}</span>
                    <span className="text-sm text-ink-400">{plan.period}</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-ink-600">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-400">
              All plans are month-to-month with no long-term contract. Cancel or change your plan anytime.
              Lead volume is an estimate and varies by industry and market.
            </p>
          </div>

          {/* Signup form */}
          <div id="b2b-signup" className="card p-6 sm:p-7">
            {status === 'success' ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-400/15 text-accent-600">
                  <CheckCircle2 size={30} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">You&apos;re in!</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-600">
                  Thanks, {form.fullName.split(' ')[0] || 'there'}. We&apos;ll start finding your free leads right away and contact you within one business day with the first batch.
                </p>
                <button onClick={() => { setStatus('idle'); setForm({ fullName: '', email: '', businessName: '', industry: '', message: '' }); }} className="btn-secondary mt-6">
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="text-sm font-semibold text-ink-900">Claim your 3–5 free leads</h3>
                <p className="text-xs leading-relaxed text-ink-500">
                  Tell us about your business. We&apos;ll start qualifying leads and deliver your free batch within days.
                </p>

                <div>
                  <label className="block text-sm font-medium text-ink-800">Full name <span className="text-brand-600">*</span></label>
                  <input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} className="form-input mt-1.5" placeholder="Jane Smith" />
                  {errors.fullName && <p className="mt-1.5 text-xs text-error">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-800">Email <span className="text-brand-600">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="form-input mt-1.5" placeholder="you@business.com" />
                  {errors.email && <p className="mt-1.5 text-xs text-error">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-800">Business name <span className="text-brand-600">*</span></label>
                  <input value={form.businessName} onChange={(e) => set('businessName', e.target.value)} className="form-input mt-1.5" placeholder="Your business" />
                  {errors.businessName && <p className="mt-1.5 text-xs text-error">{errors.businessName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-800">Industry</label>
                  <input value={form.industry} onChange={(e) => set('industry', e.target.value)} className="form-input mt-1.5" placeholder="e.g. Plumbing, Legal, Dental" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink-800">Anything else? <span className="font-normal text-ink-400">(optional)</span></label>
                  <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows={3} className="form-input mt-1.5 resize-none" placeholder="Target areas, ideal client type, etc." />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    Something went wrong. Please try again or email hello@websitemagic.me.
                  </div>
                )}

                <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
                  {status === 'submitting' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Get my free leads <ArrowRight size={16} /></>}
                </button>
                <p className="text-center text-xs text-ink-400">No credit card required. No commitment.</p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button onClick={() => navigate('/contact')} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            Have questions? Contact us <ArrowRight size={14} className="inline" />
          </button>
        </div>
      </div>
    </section>
  );
}
