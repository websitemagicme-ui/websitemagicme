import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Clock, Calendar, Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { PLANS } from '@/data/plans';

const TOPICS = [
  'I want a new website',
  'I want to redesign my current website',
  'I want the AI receptionist',
  'I want an e-shop / online store',
  'I have a custom / complex project',
  'Question about pricing',
  'Question about the $0 upfront offer',
  'Book a Google Meet consultation',
  'General question',
];

const BUDGETS = [
  'Starter ($179 setup + $29/mo)',
  'Business ($349 setup + $39/mo)',
  'Pro ($699+ setup + $69/mo)',
  'Starter $0 upfront ($0 setup + $57/mo)',
  'Business $0 upfront ($0 setup + $98/mo)',
  'Pro $0 upfront ($0 setup + $147/mo)',
  'E-Shop / Custom — to be discussed',
  'Not sure yet — help me choose',
];

const TIMELINES = ['ASAP', '1–2 weeks', '1 month', 'Just exploring'];

const MEET_SLOTS = [
  'Mon 9:00 AM', 'Mon 1:00 PM', 'Mon 4:00 PM',
  'Tue 9:00 AM', 'Tue 1:00 PM', 'Tue 4:00 PM',
  'Wed 9:00 AM', 'Wed 1:00 PM', 'Wed 4:00 PM',
  'Thu 9:00 AM', 'Thu 1:00 PM', 'Thu 4:00 PM',
  'Fri 9:00 AM', 'Fri 1:00 PM',
];

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    topic: '',
    budget: '',
    timeline: '',
    currentWebsite: '',
    googleBusinessUrl: '',
    message: '',
    meetSlot: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = 'Your name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.topic) e.topic = 'Please select a topic.';
    if (!form.message.trim()) e.message = 'Please tell us a little about what you need.';
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('submitting');
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('inquiries').insert({
          full_name: form.fullName,
          email: form.email,
          business_name: form.businessName,
          service: [form.topic, form.budget, form.timeline, form.meetSlot && `Google Meet: ${form.meetSlot}`].filter(Boolean).join(' · '),
          google_business_url: form.googleBusinessUrl || null,
          message: form.message,
        });
        if (error) throw error;
      }
      setStatus('success');
      setForm({
        fullName: '', email: '', phone: '', businessName: '', industry: '',
        topic: '', budget: '', timeline: '', currentWebsite: '', googleBusinessUrl: '', message: '', meetSlot: '',
      });
    } catch {
      setStatus('error');
    }
  };

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="mx-auto max-w-5xl container-px py-12 lg:py-16">
      <SEO canonicalPath="/contact" title="Contact Us" description="Get in touch with WebsiteMagic.me. Tell us about your business and what you need — a real person replies within one business day." />
      <div className="max-w-2xl">
        <span className="eyebrow">Contact</span>
        <h1 className="heading-2 mt-4 text-ink-900">Let's talk about your website.</h1>
        <p className="mt-4 text-lg text-ink-500">
          Tell us about your business and what you're looking for. A real person will reply within one
          business day — no bots, no scripts.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        {/* Form */}
        <div className="card p-6 sm:p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center py-8 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-400/15 text-accent-600">
                <CheckCircle2 size={30} />
              </span>
              <h2 className="mt-5 text-xl font-semibold text-ink-900">Message sent!</h2>
              <p className="mt-2 max-w-sm text-sm text-ink-600">
                Thanks for reaching out, {form.fullName.split(' ')[0] || 'there'}. We'll get back to you
                within one business day. If it's urgent, email hello@websitemagic.me.
              </p>
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStatus('idle')} className="btn-secondary">Send another</button>
                <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              {/* Section: About you */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-ink-900">About you</h3>
                <div className="grid gap-4 sm:grid-cols-2">
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
                    <label className="block text-sm font-medium text-ink-800">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className="form-input mt-1.5" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-800">Business name</label>
                    <input value={form.businessName} onChange={(e) => set('businessName', e.target.value)} className="form-input mt-1.5" placeholder="Your business" />
                  </div>
                </div>
              </div>

              {/* Section: Project */}
              <div className="border-t border-ink-100 pt-5">
                <h3 className="mb-3 text-sm font-semibold text-ink-900">About your project</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-800">What can we help with? <span className="text-brand-600">*</span></label>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {TOPICS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => set('topic', t)}
                          className={`rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                            form.topic === t ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:border-ink-300'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.topic && <p className="mt-1.5 text-xs text-error">{errors.topic}</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-ink-800">Budget range</label>
                      <select value={form.budget} onChange={(e) => set('budget', e.target.value)} className="form-input mt-1.5">
                        <option value="">Select a plan</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-800">Timeline</label>
                      <select value={form.timeline} onChange={(e) => set('timeline', e.target.value)} className="form-input mt-1.5">
                        <option value="">When do you need it?</option>
                        {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-ink-800">Current website (if any)</label>
                      <input type="url" value={form.currentWebsite} onChange={(e) => set('currentWebsite', e.target.value)} className="form-input mt-1.5" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink-800">Google Business Profile (if any)</label>
                      <input type="url" value={form.googleBusinessUrl} onChange={(e) => set('googleBusinessUrl', e.target.value)} className="form-input mt-1.5" placeholder="Paste your Google listing link" />
                    </div>
                  </div>

                  {/* Google Meet booking */}
                  <div className="rounded-xl border border-brand-200 bg-brand-50/40 p-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-brand-600" />
                      <label className="text-sm font-semibold text-ink-900">Book a Google Meet consultation</label>
                    </div>
                    <p className="mt-1 text-xs text-ink-500">
                      Pick a time slot and we'll send a Google Meet link to your email. Free 15-minute call, no pressure.
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
                      {MEET_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => set('meetSlot', form.meetSlot === slot ? '' : slot)}
                          className={`rounded-lg border px-2.5 py-2 text-xs font-medium transition-all ${
                            form.meetSlot === slot
                              ? 'border-brand-600 bg-brand-600 text-white'
                              : 'border-ink-200 bg-white text-ink-600 hover:border-brand-300'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {form.meetSlot && (
                      <p className="mt-2 text-xs text-brand-700">
                        Selected: <strong>{form.meetSlot}</strong> — we'll confirm by email with your Meet link.
                      </p>
                    )}
                    <p className="mt-2 text-xs text-ink-400">
                      Times shown in your local timezone. We'll confirm the exact date and send the Google Meet link after you submit.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ink-800">Message <span className="text-brand-600">*</span></label>
                    <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows={4} className="form-input mt-1.5 resize-none" placeholder="Tell us about your business, what you want, and any questions you have..." />
                    {errors.message && <p className="mt-1.5 text-xs text-error">{errors.message}</p>}
                  </div>
                </div>
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2.5 rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  Something went wrong sending your message. Please try again or email hello@websitemagic.me.
                </div>
              )}

              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto">
                {status === 'submitting' ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send Message <ArrowRight size={16} /></>}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-ink-900">Reach us directly</h3>
            <div className="mt-4 space-y-3 text-sm">
              <a href="mailto:hello@websitemagic.me" className="flex items-center gap-2.5 text-ink-600 hover:text-brand-600">
                <Mail size={16} className="text-ink-400" /> hello@websitemagic.me
              </a>
              <p className="flex items-center gap-2.5 text-ink-600">
                <Clock size={16} className="text-ink-400" /> Replies within 1 business day
              </p>
            </div>
          </div>

          <div className="card p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Calendar size={18} />
            </span>
            <h3 className="mt-4 text-sm font-semibold text-ink-900">Book a free Google Meet call</h3>
            <p className="mt-2 text-sm text-ink-500">
              Prefer to talk it through? Pick a time slot in the form and we'll send you a Google Meet link
              for a quick, no-pressure 15-minute call.
            </p>
            <div className="mt-4 rounded-lg border border-dashed border-brand-200 bg-brand-50/30 px-4 py-3 text-xs text-brand-700">
              Select a slot in the form on the left and we'll confirm by email with your Meet link.
            </div>
            <button onClick={() => navigate('/get-started')} className="btn-secondary mt-4 w-full">
              Or start your project now
            </button>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-ink-900">Explore plans</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {PLANS.map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <span className="font-medium text-ink-800">{p.name}</span>
                  <span className="text-ink-500">{p.setupPrice} + {p.monthlyPrice}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => navigate('/#pricing')} className="mt-3 text-xs font-semibold text-brand-600 hover:text-brand-700">
              See full pricing →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
