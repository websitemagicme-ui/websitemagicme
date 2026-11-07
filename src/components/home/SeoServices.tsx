import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, TrendingUp } from 'lucide-react';

const FEATURES = [
  '30 articles a month, written and published for you',
  'AI recommendation checks across 10 buyer questions on ChatGPT, Claude, and Gemini',
  'High-authority backlinks on autopilot, worth $800+/month',
  'Auto-publishing to WordPress, Shopify, and 8 more platforms',
  'Site audit with fixes for Google and AI search',
  'Reddit and Quora posts designed to get your brand cited by AI',
  'Weekly Instagram and Facebook posts made from your articles',
  'Keyword research grouped into clear content topics',
];

export default function SeoServices() {
  const navigate = useNavigate();

  return (
    <section id="seo-services" className="section-y bg-ink-900 text-white">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
              <Sparkles size={14} /> SEO services
            </span>
            <h2 className="heading-2 mt-5 text-white">Get found by people and the AI tools they trust.</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-300">
              Grow organic traffic from Google and AI search with a content engine that keeps working in the background.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-ink-300">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-300">
                <TrendingUp size={19} />
              </span>
              <span>Strategy, publishing, and visibility tracking handled for you.</span>
            </div>
            <button onClick={() => navigate('/contact')} className="btn-primary mt-9 bg-accent-500 text-ink-950 hover:bg-accent-400">
              Start your 3-day free trial <ArrowRight size={16} />
            </button>
            <p className="mt-3 text-xs text-ink-400">90-day money-back guarantee</p>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-white p-7 text-ink-900 shadow-2xl sm:p-9">
            <div className="absolute -top-3 right-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-soft">
              SEO Grow Plan
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink-200 pb-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600">Grow</p>
                <p className="mt-2 text-sm text-ink-500">Everything you need to grow organic traffic on autopilot.</p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-ink-900">$98</span>
                  <span className="text-sm text-ink-500">/mo</span>
                </div>
                <p className="mt-1 text-xs text-ink-400">Billed yearly</p>
              </div>
            </div>
            <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-400/20 text-accent-700">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink-200 pt-5">
              <span className="text-xs font-medium text-ink-500">Built for local businesses ready to grow</span>
              <button onClick={() => navigate('/contact')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700">
                Talk to us <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
