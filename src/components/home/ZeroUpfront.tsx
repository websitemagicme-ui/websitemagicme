import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { ZERO_UPFRONT_TIERS, type PlanId } from '@/data/plans';

const POINTS = [
  'Select a qualifying managed website plan.',
  'Commit to 12 months of service.',
  'We waive the upfront website development fee.',
  'Monthly service charges still apply (at a higher rate during the commitment).',
  'The website remains subject to the service agreement.',
];

export default function ZeroUpfront() {
  const navigate = useNavigate();
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl container-px">
        <div className="relative overflow-hidden rounded-xl2 border border-ink-200/70 bg-gradient-to-br from-ink-950 via-ink-900 to-brand-950 p-8 text-white sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
                <ShieldCheck size={14} /> $0 upfront offer
              </span>
              <h2 className="heading-2 mt-4 text-white">
                Get your website built with <span className="text-brand-300">$0 upfront.</span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-200">
                We build your website with no upfront development fee when you commit to a qualifying
                12-month managed service plan. Instead of the setup fee, you pay a higher monthly rate
                during the commitment period.
              </p>
              <div className="mt-7">
                <button onClick={() => navigate('/get-started?offer=zero')} className="btn-primary">
                  Get My Website for $0 Upfront <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="lg:pl-6">
              {/* Tier table */}
              <div className="overflow-hidden rounded-xl border border-white/15 bg-white/5 backdrop-blur">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left font-medium text-ink-300">Plan</th>
                      <th className="px-4 py-3 text-right font-medium text-ink-300">Setup</th>
                      <th className="px-4 py-3 text-right font-medium text-brand-300">Monthly ($0 upfront)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ZERO_UPFRONT_TIERS.map((tier) => {
                      const id = tier.plan.toLowerCase() as PlanId;
                      return (
                        <tr key={tier.plan} className="border-b border-white/10 last:border-0">
                          <td className="px-4 py-3.5 font-semibold text-white">{tier.plan}</td>
                          <td className="px-4 py-3.5 text-right">
                            <span className="text-ink-400 line-through">{tier.setupPrice}</span>
                            <span className="ml-1.5 rounded-full bg-accent-400/20 px-2 py-0.5 text-xs font-semibold text-accent-400">$0</span>
                          </td>
                          <td className="px-4 py-3.5 text-right font-bold text-brand-300">{tier.zeroMonthly}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-400">
                E-Shop and custom/complex websites are priced individually — not part of the $0 upfront tiers.
              </p>

              <ul className="mt-5 space-y-3">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-ink-100">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/30 text-brand-200">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
                <li className="flex items-start gap-3 text-sm text-ink-100">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/30 text-brand-200">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  Cancellation and ownership terms are disclosed clearly before you commit.
                  <span className="ml-1 text-xs text-ink-400">[Terms — configure before launch.]</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
