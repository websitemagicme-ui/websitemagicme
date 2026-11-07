import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star, ArrowRight, ShoppingCart, MessageSquare } from 'lucide-react';
import { PLANS, ZERO_UPFRONT_TIERS, type PlanId } from '@/data/plans';

export default function Pricing() {
  const navigate = useNavigate();
  const [showZero, setShowZero] = useState(false);
  const choose = (id: PlanId) => navigate(`/get-started?plan=${id}`);

  return (
    <section id="pricing" className="section-y">
      <div className="mx-auto max-w-7xl container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">Pricing</span>
          <h2 className="heading-2 mt-4 text-ink-900">Simple pricing. No surprises.</h2>
          <p className="mt-4 text-lg text-ink-500">
            Choose the website package that fits your business. Every plan includes professional design,
            hosting, and ongoing support.
          </p>
        </div>

        {/* Toggle: standard vs $0 upfront */}
        <div className="mt-8 inline-flex rounded-full border border-ink-200 bg-white p-1 shadow-soft">
          <button
            onClick={() => setShowZero(false)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              !showZero ? 'bg-brand-600 text-white' : 'text-ink-500 hover:text-ink-800'
            }`}
          >
            Standard Pricing
          </button>
          <button
            onClick={() => setShowZero(true)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              showZero ? 'bg-brand-600 text-white' : 'text-ink-500 hover:text-ink-800'
            }`}
          >
            $0 Upfront Option
          </button>
        </div>

        {!showZero ? (
          <>
            {/* Standard pricing cards */}
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-xl2 border bg-white p-7 transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? 'border-brand-600 shadow-glow ring-1 ring-brand-600'
                      : 'border-ink-200/70 shadow-card'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-soft">
                      <Star size={12} /> Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-ink-900">{plan.name}</h3>
                    <p className="mt-1.5 text-sm text-ink-500">{plan.description}</p>
                  </div>
                  <div className="mt-5 border-y border-ink-200/70 py-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-ink-900">{plan.setupPrice}</span>
                      <span className="text-sm text-ink-500">one-time setup</span>
                    </div>
                    <div className="mt-1.5 flex items-baseline gap-1.5">
                      <span className="text-xl font-semibold text-ink-800">{plan.monthlyPrice}</span>
                      <span className="text-sm text-ink-500">managed service</span>
                    </div>
                  </div>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-400/15 text-accent-600">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => choose(plan.id)}
                    className={`mt-7 w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {plan.cta} <ArrowRight size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* E-shop / Custom banner */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="flex items-start gap-4 rounded-xl2 border border-ink-200/70 bg-gradient-to-br from-ink-50 to-white p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <ShoppingCart size={20} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink-900">E-Shop / Online Store</h3>
                  <p className="mt-1 text-sm text-ink-500">
                    Full e-commerce with product catalog, cart, checkout, and payments. Custom quote —
                    pricing discussed during your consultation based on catalog size and needs.
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Request a Quote <ArrowRight size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl2 border border-ink-200/70 bg-gradient-to-br from-ink-50 to-white p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MessageSquare size={20} />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-ink-900">Custom / Complex Websites</h3>
                  <p className="mt-1 text-sm text-ink-500">
                    Advanced integrations, custom workflows, member portals, or unique architecture. Scope
                    and pricing are discussed during your consultation call — no surprises, ever.
                  </p>
                  <button
                    onClick={() => navigate('/contact')}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Book a Consultation <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* $0 upfront comparison table */
          <div className="mt-8">
            <div className="rounded-xl2 border border-ink-200/70 bg-white shadow-card overflow-hidden">
              <div className="border-b border-ink-200/70 bg-gradient-to-r from-brand-50 to-white px-6 py-5">
                <h3 className="text-lg font-semibold text-ink-900">$0 Upfront — 12-Month Commitment</h3>
                <p className="mt-1 text-sm text-ink-500">
                  We waive the setup fee. You pay a higher monthly rate for 12 months instead. After the
                  commitment, standard monthly pricing applies.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-ink-200/70 bg-ink-50/50">
                      <th className="px-6 py-3.5 text-left font-semibold text-ink-700">Plan</th>
                      <th className="px-6 py-3.5 text-right font-semibold text-ink-700">Setup Fee</th>
                      <th className="px-6 py-3.5 text-right font-semibold text-ink-700">Standard Monthly</th>
                      <th className="px-6 py-3.5 text-right font-semibold text-brand-700">$0 Upfront Monthly</th>
                      <th className="px-6 py-3.5 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ZERO_UPFRONT_TIERS.map((tier) => {
                      const id = tier.plan.toLowerCase() as PlanId;
                      return (
                        <tr key={tier.plan} className="border-b border-ink-100 last:border-0">
                          <td className="px-6 py-4 font-semibold text-ink-900">{tier.plan}</td>
                          <td className="px-6 py-4 text-right">
                            <span className="inline-flex items-center gap-1">
                              <span className="text-ink-400 line-through">{tier.setupPrice}</span>
                              <span className="rounded-full bg-accent-400/15 px-2 py-0.5 text-xs font-semibold text-accent-600">$0</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-ink-500">{tier.regularMonthly}</td>
                          <td className="px-6 py-4 text-right font-bold text-brand-700">{tier.zeroMonthly}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => navigate(`/get-started?plan=${id}&offer=zero`)}
                              className="inline-flex items-center gap-1 rounded-lg border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-all hover:bg-brand-100"
                            >
                              Get $0 Upfront <ArrowRight size={12} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-ink-200/70 bg-ink-50/40 px-6 py-4">
                <p className="text-xs text-ink-500">
                  Monthly rates shown apply during the 12-month commitment period. After 12 months,
                  standard monthly pricing applies. Setup fee is waived — not the ongoing service.
                </p>
              </div>
            </div>

            {/* E-shop note for $0 upfront */}
            <div className="mt-4 rounded-xl border border-ink-200/70 bg-white p-5">
              <div className="flex items-start gap-3">
                <ShoppingCart size={18} className="mt-0.5 shrink-0 text-ink-400" />
                <p className="text-sm text-ink-600">
                  <span className="font-semibold text-ink-800">E-Shop & Custom websites:</span> Not included
                  in the $0 upfront tiers. These are scoped and priced individually during your
                  consultation. <button onClick={() => navigate('/contact')} className="font-semibold text-brand-600 hover:text-brand-700">Book a call to discuss →</button>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-ink-200/70 bg-ink-50/60 p-5">
          <p className="text-sm leading-relaxed text-ink-600">
            <span className="font-semibold text-ink-800">Pricing note:</span> Complex e-commerce projects,
            third-party software subscriptions, and advanced integrations may require additional fees.
            All additional costs are disclosed and approved before work begins. Monthly plans cover
            ongoing service; the setup fee is separate unless the qualifying $0-upfront offer is selected.
          </p>
        </div>
      </div>
    </section>
  );
}
