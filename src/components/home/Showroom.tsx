import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { CATEGORIES, DEMOS, type DemoCategory } from '@/data/demos';

export default function Showroom() {
  const [active, setActive] = useState<'All' | DemoCategory>('All');
  const navigate = useNavigate();

  const filtered = useMemo(
    () => (active === 'All' ? DEMOS : DEMOS.filter((d) => d.category === active)),
    [active],
  );

  return (
    <section id="showroom" className="section-y">
      <div className="mx-auto max-w-7xl container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">Design showroom</span>
          <h2 className="heading-2 mt-4 text-ink-900">Websites built for businesses like yours.</h2>
          <p className="mt-4 text-lg text-ink-500">
            Explore professionally designed websites created around the needs of real-world businesses.
            Click any design to see the full live demo.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active === cat
                  ? 'border-brand-600 bg-brand-600 text-white shadow-soft'
                  : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((demo) => (
            <article
              key={demo.id}
              className="group flex flex-col overflow-hidden rounded-xl2 border border-ink-200/70 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
            >
              {/* Hero image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={demo.heroImage}
                  alt={`${demo.businessName} — ${demo.industry} website preview`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold drop-shadow">{demo.businessName}</h3>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur">
                      {demo.category}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs opacity-90 drop-shadow">{demo.tagline}</p>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{demo.industry}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{demo.description}</p>

                {/* Thumbnail gallery preview */}
                <div className="mt-4 grid grid-cols-3 gap-1.5">
                  {demo.galleryImages.slice(0, 3).map((img) => (
                    <div key={img.src} className="h-14 overflow-hidden rounded-md">
                      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-400">
                    <Star size={12} className="text-warning" /> Demo website
                  </span>
                  <button
                    onClick={() => navigate(`/preview/${demo.id}`)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    Preview Website <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
