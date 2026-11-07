import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import BrowserMockup from '@/components/BrowserMockup';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pb-16 pt-10 lg:pb-24 lg:pt-16">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[900px] max-w-[120%] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-100/50 via-brand-50/30 to-transparent blur-3xl" />
        <div className="absolute right-[8%] top-[40%] h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #1f2a44 1px, transparent 1px), linear-gradient(to bottom, #1f2a44 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at top, black, transparent 70%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl container-px">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Copy */}
          <div className="animate-fade-up">
            <span className="eyebrow">
              <Sparkles size={14} /> Managed website service
            </span>
            <h1 className="heading-1 mt-5 text-ink-900">
              A better website for your business. <span className="text-brand-600">Without the hassle.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
              Your professional website, AI receptionist, hosting, and ongoing support — all handled by
              one team. No technical skills required.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate('/get-started')} className="btn-primary">
                Get My Website <ArrowRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('showroom')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Explore Designs
              </button>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-ink-500">
              <CheckCircle2 size={16} className="text-accent-500" />
              <span>Built for small businesses. Managed by real people.</span>
            </div>
          </div>

          {/* Visual: stacked browser mockups */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="relative mx-auto max-w-xl">
              {/* Back card: restaurant */}
              <div className="absolute -right-2 top-8 w-[78%] rotate-3 opacity-90 transition-transform duration-500 hover:rotate-1">
                <BrowserMockup url="olivestone.com" variant="compact" accent="#15803d">
                  <MiniSite name="Olive & Stone" tagline="Wood-fired. Seasonal." accent="#15803d" />
                </BrowserMockup>
              </div>
              {/* Mid card: plumbing */}
              <div className="absolute -left-3 top-24 w-[70%] -rotate-3 opacity-95 transition-transform duration-500 hover:-rotate-1">
                <BrowserMockup url="proflowplumbing.com" variant="compact" accent="#1d4ed8">
                  <MiniSite name="ProFlow Plumbing" tagline="Fast. Reliable. Licensed." accent="#1d4ed8" />
                </BrowserMockup>
              </div>
              {/* Front card: barber */}
              <div className="relative z-10 w-full">
                <BrowserMockup url="bladeandco.com" variant="full" accent="#b45309">
                  <MiniSite name="Blade & Co." tagline="Sharp cuts. Classic craft." accent="#b45309" featured />
                </BrowserMockup>
              </div>

              {/* Floating status chip */}
              <div className="absolute -bottom-5 left-1/2 z-20 -translate-x-1/2 animate-float">
                <div className="flex items-center gap-2.5 rounded-full border border-ink-200/80 bg-white px-4 py-2.5 shadow-card">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-500" />
                  </span>
                  <span className="text-sm font-semibold text-ink-800">Your website is live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniSite({
  name,
  tagline,
  accent,
  featured,
}: {
  name: string;
  tagline: string;
  accent: string;
  featured?: boolean;
}) {
  return (
    <div className="p-4">
      <div
        className="rounded-lg p-4 text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{name}</span>
          <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">Menu</span>
        </div>
        <p className="mt-1 text-xs opacity-90">{tagline}</p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-md border border-ink-200/60 p-2"
            style={i === 0 && featured ? { background: `${accent}10` } : {}}
          >
            <div className="h-8 w-full rounded bg-ink-100" style={i === 0 ? { background: `${accent}25` } : {}} />
            <div className="mt-1.5 h-1.5 w-3/4 rounded bg-ink-200" />
            <div className="mt-1 h-1.5 w-1/2 rounded bg-ink-100" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-md bg-ink-50 px-3 py-2">
        <span className="text-[10px] font-medium text-ink-500">Open today</span>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
          style={{ background: accent }}
        >
          Book now
        </span>
      </div>
    </div>
  );
}
