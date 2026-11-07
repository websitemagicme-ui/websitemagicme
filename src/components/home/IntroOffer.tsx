import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function IntroOffer() {
  const navigate = useNavigate();
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl container-px">
        <div className="relative overflow-hidden rounded-xl2 border border-brand-200/60 bg-gradient-to-br from-brand-50 via-white to-brand-50/50 p-8 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-200/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 left-1/3 h-40 w-40 rounded-full bg-accent-400/10 blur-2xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="eyebrow">Limited introductory offer</span>
              <h2 className="heading-2 mt-4 text-ink-900">
                Your new website. <span className="text-brand-600">$0 upfront.</span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">
                Choose a qualifying 12-month managed website plan and we'll build your website with no
                upfront development fee. You only pay the monthly service — the setup fee is on us.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <button onClick={() => navigate('/get-started')} className="btn-primary w-full lg:w-auto">
                See Plans <ArrowRight size={16} />
              </button>
              <p className="text-xs text-ink-500 lg:text-right">
                Requires a qualifying 12-month service commitment. Monthly service charges apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
