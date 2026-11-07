import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

export default function FinalCta() {
  const navigate = useNavigate();
  return (
    <section className="section-y">
      <div className="mx-auto max-w-7xl container-px">
        <div className="relative overflow-hidden rounded-xl2 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-6 py-16 text-center text-white sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)',
              }}
            />
          </div>
          <div className="relative mx-auto max-w-2xl">
            <h2 className="heading-2 text-white">Your business deserves a better website.</h2>
            <p className="mt-4 text-lg text-brand-100">We build it. We manage it. You run your business.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button onClick={() => navigate('/get-started')} className="btn-primary bg-white text-brand-700 hover:bg-brand-50">
                Create My Website <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                <Calendar size={16} /> Book a Free 15-Minute Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
