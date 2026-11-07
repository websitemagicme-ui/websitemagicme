import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Clock, Mail, Star, ExternalLink, Quote, Check, ChevronDown, Scissors } from 'lucide-react';
import { useState } from 'react';
import { getDemo, type DemoSite, type DemoId } from '@/data/demos';
import SEO from '@/components/SEO';
import BrowserMockup from '@/components/BrowserMockup';

type LayoutTheme =
  | 'classic-barber'
  | 'spa-elegant'
  | 'rustic-restaurant'
  | 'blue-service'
  | 'calm-medical'
  | 'corporate-consulting'
  | 'dark-luxury'
  | 'bold-fitness'
  | 'editorial-law'
  | 'playful-vet'
  | 'minimal-realty'
  | 'warm-cafe'
  | 'gallery-photography';

const LAYOUT_MAP: Record<DemoId, LayoutTheme> = {
  'blade-and-co': 'classic-barber',
  'luna-beauty': 'spa-elegant',
  'olive-and-stone': 'rustic-restaurant',
  'proflow-plumbing': 'blue-service',
  'smilepoint': 'calm-medical',
  'northstar-consulting': 'corporate-consulting',
  'city-limo': 'dark-luxury',
  'ironforge-fitness': 'bold-fitness',
  'sterling-law': 'editorial-law',
  'pawsitive-vet': 'playful-vet',
  'meridian-realty': 'minimal-realty',
  'ember-coffee': 'warm-cafe',
  'lens-and-light': 'gallery-photography',
};

export default function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const demo = getDemo(id as Parameters<typeof getDemo>[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);

  const theme = LAYOUT_MAP[demo.id] ?? 'classic-barber';
  const accent = demo.accentColor;

  const seoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: demo.businessName,
    description: demo.preview.hero,
    address: demo.preview.address,
    telephone: demo.preview.phone,
    email: demo.preview.email,
    image: demo.heroImage,
  };

  return (
    <div className="bg-ink-50/50">
      <SEO
        canonicalPath={`/preview/${demo.id}`}
        title={`${demo.businessName} — ${demo.industry} Website Example`}
        description={`${demo.businessName} is a demo ${demo.industry.toLowerCase()} website built with WebsiteMagic.me. ${demo.tagline} See this design and get one for your business.`}
        jsonLd={seoJsonLd}
      />

      {/* Demo disclaimer banner */}
      <div className="border-b border-warning/30 bg-warning/10 px-5 py-2.5 text-center text-xs font-medium text-ink-700">
        This is a fictional demo website created to showcase WebsiteMagic.me's design work. It is not a real business.
      </div>

      <div className="mx-auto max-w-5xl container-px py-8">
        <button
          onClick={() => navigate('/#showroom')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-600"
        >
          <ArrowLeft size={16} /> Back to showroom
        </button>
      </div>

      <BrowserMockup url={`${demo.id}.preview`} accent={accent} variant="full">
        <PreviewLayout
          demo={demo}
          theme={theme}
          accent={accent}
          openFaq={openFaq}
          setOpenFaq={setOpenFaq}
          onBook={() => setBookingOpen(true)}
        />
      </BrowserMockup>

      {/* CTA below preview */}
      <div className="mx-auto max-w-5xl container-px py-10">
        <div className="flex flex-col items-center gap-3 rounded-xl2 border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 text-center">
          <h3 className="font-display text-2xl text-ink-900">Want a website like this for your business?</h3>
          <p className="max-w-md text-sm text-ink-600">
            We can design and manage a site just like {demo.businessName} — tailored to your brand, your services, and your customers.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => navigate('/get-started')} className="btn-primary">Get My Website</button>
            <button onClick={() => navigate('/#showroom')} className="btn-secondary">See More Designs</button>
          </div>
        </div>
      </div>

      {/* Booking modal (demo) */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => { setBookingOpen(false); setBookingSent(false); }}>
          <div className="w-full max-w-md rounded-xl2 bg-white p-6 shadow-glow" onClick={(e) => e.stopPropagation()}>
            {bookingSent ? (
              <div className="py-6 text-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-400/15 text-accent-600"><Check size={24} /></span>
                <h3 className="mt-4 text-lg font-semibold text-ink-900">Request sent!</h3>
                <p className="mt-2 text-sm text-ink-500">
                  This is a demo booking form. {demo.businessName} will "contact you" to confirm — but remember, this is a fictional business.
                </p>
                <button onClick={() => { setBookingOpen(false); setBookingSent(false); }} className="btn-secondary mt-5">Close</button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-ink-900">{demo.preview.cta}</h3>
                <p className="mt-1 text-sm text-ink-500">Fill out the form below and we'll be in touch. (Demo only)</p>
                <form onSubmit={(e) => { e.preventDefault(); setBookingSent(true); }} className="mt-4 space-y-3">
                  <input className="form-input" placeholder="Your name" required />
                  <input type="email" className="form-input" placeholder="Your email" required />
                  <input type="tel" className="form-input" placeholder="Phone number" />
                  <textarea className="form-input resize-none" rows={2} placeholder="Preferred date & time" />
                  <button type="submit" className="btn-primary w-full" style={{ background: accent }}>Send Request</button>
                  <button type="button" onClick={() => setBookingOpen(false)} className="btn-ghost w-full">Cancel</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Shared layout renderer that switches by theme ─── */

interface LayoutProps {
  demo: DemoSite;
  theme: LayoutTheme;
  accent: string;
  openFaq: number | null;
  setOpenFaq: (n: number | null) => void;
  onBook: () => void;
}

type LayoutComponentProps = Omit<LayoutProps, 'theme'>;

function PreviewLayout({ demo, theme, accent, openFaq, setOpenFaq, onBook }: LayoutProps) {
  switch (theme) {
    case 'classic-barber':
      return <ClassicBarber demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'spa-elegant':
      return <SpaElegant demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'rustic-restaurant':
      return <RusticRestaurant demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'blue-service':
      return <BlueService demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'calm-medical':
      return <CalmMedical demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'corporate-consulting':
      return <CorporateConsulting demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'dark-luxury':
      return <DarkLuxury demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'bold-fitness':
      return <BoldFitness demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'editorial-law':
      return <EditorialLaw demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'playful-vet':
      return <PlayfulVet demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'minimal-realty':
      return <MinimalRealty demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'warm-cafe':
      return <WarmCafe demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    case 'gallery-photography':
      return <GalleryPhotography demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
    default:
      return <ClassicBarber demo={demo} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} onBook={onBook} />;
  }
}

/* ─── Shared sub-components ─── */

function Nav({ items, accent, dark }: { items: string[]; accent: string; dark?: boolean }) {
  return (
    <div className={`flex flex-wrap justify-center gap-x-6 gap-y-2 border-b px-6 py-3 text-xs font-medium sm:text-sm ${dark ? 'border-white/10 text-ink-300' : 'border-ink-200/70 bg-white text-ink-600'}`}>
      {items.map((item) => (
        <span key={item} className="cursor-default transition-colors hover:opacity-70" style={!dark ? { color: undefined } : undefined}>
          {item}
        </span>
      ))}
    </div>
  );
}

function StatsRow({ stats, accent, dark }: { stats: { value: string; label: string }[]; accent: string; dark?: boolean }) {
  return (
    <div className={`grid grid-cols-2 gap-px sm:grid-cols-4 ${dark ? 'bg-white/10' : 'bg-ink-200/70'}`}>
      {stats.map((stat) => (
        <div key={stat.label} className={`px-4 py-5 text-center ${dark ? 'bg-ink-900' : 'bg-white'}`}>
          <div className="text-2xl font-bold" style={{ color: accent }}>{stat.value}</div>
          <div className={`mt-0.5 text-xs ${dark ? 'text-ink-400' : 'text-ink-500'}`}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

function ContactInfo({ demo, accent }: { demo: DemoSite; accent: string }) {
  return (
    <div className="mt-5 space-y-2.5 text-sm">
      <p className="flex items-center gap-2 text-ink-600"><MapPin size={15} className="text-ink-400" /> {demo.preview.address}</p>
      <p className="flex items-center gap-2 text-ink-600"><Phone size={15} className="text-ink-400" /> {demo.preview.phone}</p>
      <p className="flex items-center gap-2 text-ink-600"><Mail size={15} className="text-ink-400" /> {demo.preview.email}</p>
    </div>
  );
}

function HoursBlock({ hours, accent }: { hours: { day: string; time: string }[]; accent: string }) {
  return (
    <ul className="space-y-2 text-sm">
      {hours.map((h) => (
        <li key={h.day} className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2">
          <span className="flex items-center gap-2 text-ink-700"><Clock size={14} className="text-ink-400" /> {h.day}</span>
          <span className="font-medium text-ink-800">{h.time}</span>
        </li>
      ))}
    </ul>
  );
}

function FaqAccordion({ faqs, accent, openFaq, setOpenFaq }: { faqs: { q: string; a: string }[]; accent: string; openFaq: number | null; setOpenFaq: (n: number | null) => void }) {
  return (
    <div className="mx-auto mt-6 max-w-2xl space-y-2.5">
      {faqs.map((f, i) => {
        const isOpen = openFaq === i;
        return (
          <div key={f.q} className={`overflow-hidden rounded-xl border bg-white transition-all ${isOpen ? 'border-ink-300 shadow-soft' : 'border-ink-200/70'}`}>
            <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left">
              <span className="text-sm font-semibold text-ink-900">{f.q}</span>
              <ChevronDown size={16} className={`shrink-0 text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden"><p className="px-4 pb-4 text-sm text-ink-600">{f.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FooterDark({ demo }: { demo: DemoSite }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-ink-900 px-6 py-8 text-center text-ink-300">
      <div className="text-sm font-bold text-white">{demo.businessName}</div>
      <div className="text-xs">{demo.preview.address} · {demo.preview.phone}</div>
      <div className="mt-2 flex items-center gap-2 text-xs"><Star size={12} className="text-warning" /> Demo website · Built with WebsiteMagic.me</div>
    </div>
  );
}

/* ─── 1. CLASSIC BARBER — vintage masculine, warm amber ─── */

function ClassicBarber({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Full-bleed hero with left-aligned text and vintage feel */}
      <div className="relative h-[380px] overflow-hidden sm:h-[440px]">
        <img src={demo.heroImage} alt={`${demo.businessName} — ${p.hero}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 text-white">
          <div className="flex items-center gap-2 text-amber-400"><Scissors size={20} /><span className="text-xs font-bold uppercase tracking-[0.25em]">Est. 2014</span></div>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl drop-shadow-lg">{demo.businessName}</h1>
          <p className="mt-3 max-w-md text-lg drop-shadow-md">{p.hero}</p>
          <p className="mt-2 max-w-sm text-sm opacity-80">{p.subhero}</p>
          <button onClick={onBook} className="mt-6 w-fit rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105" style={{ background: accent }}>
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Services in a two-column list style, not cards */}
      <div className="bg-white px-8 py-12 sm:px-16">
        <h2 className="font-display text-3xl text-ink-900">Services & Pricing</h2>
        <div className="mt-1 h-0.5 w-16" style={{ background: accent }} />
        <div className="mt-8 max-w-2xl divide-y divide-ink-100">
          {p.services.map((s) => (
            <div key={s.title} className="flex items-baseline justify-between gap-4 py-4">
              <div>
                <h3 className="text-base font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-0.5 text-sm text-ink-500">{s.desc}</p>
              </div>
              <span className="shrink-0 text-lg font-bold" style={{ color: accent }}>{s.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery as a horizontal strip */}
      <div className="bg-ink-900 px-8 py-12 sm:px-16">
        <h2 className="font-display text-3xl text-white">The Shop</h2>
        <div className="mt-1 h-0.5 w-16" style={{ background: accent }} />
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="shrink-0">
              <div className="h-56 w-72 overflow-hidden rounded-lg">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-2 text-xs font-medium uppercase tracking-wide text-amber-400">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Stats */}
      <StatsRow stats={p.stats} accent={accent} dark />

      {/* About with image left, text right */}
      <div className="grid gap-8 bg-white px-8 py-12 sm:grid-cols-2 sm:px-16">
        <div className="overflow-hidden rounded-lg">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-3xl text-ink-900">About {demo.businessName}</h2>
          <div className="mt-1 h-0.5 w-16" style={{ background: accent }} />
          <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
      </div>

      {/* Team as portraits */}
      {p.team.length > 0 && (
        <div className="bg-ink-50/40 px-8 py-12 sm:px-16">
          <h2 className="font-display text-3xl text-ink-900">Meet the Barbers</h2>
          <div className="mt-1 h-0.5 w-16" style={{ background: accent }} />
          <div className="mt-8 flex flex-wrap gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-40">
                <div className="h-48 w-40 overflow-hidden rounded-lg border-2" style={{ borderColor: accent }}>
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover grayscale" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-ink-900">{m.name}</h3>
                <p className="text-xs uppercase tracking-wide" style={{ color: accent }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials inline */}
      <div className="bg-white px-8 py-12 sm:px-16">
        <h2 className="font-display text-3xl text-ink-900">What Regulars Say</h2>
        <div className="mt-1 h-0.5 w-16" style={{ background: accent }} />
        <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author}>
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="text-amber-500" fill="currentColor" />)}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-900">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + booking */}
      <div className="bg-ink-50/40 px-8 py-12 sm:px-16">
        <div className="grid max-w-2xl gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink-900">Hours</h2>
            <div className="mt-1 h-0.5 w-12" style={{ background: accent }} />
            <div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div>
          </div>
          <div className="rounded-lg border p-5" style={{ borderColor: `${accent}40` }}>
            <h2 className="font-display text-2xl text-ink-900">Find Us</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-white px-8 py-12 sm:px-16">
          <h2 className="font-display text-3xl text-ink-900">Good to Know</h2>
          <div className="mt-1 h-0.5 w-16" style={{ background: accent }} />
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <FooterDark demo={demo} />
    </div>
  );
}

/* ─── 2. SPA ELEGANT — soft pink, centered, airy, rounded ─── */

function SpaElegant({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Centered hero with soft overlay */}
      <div className="relative h-[400px] overflow-hidden sm:h-[460px]">
        <img src={demo.heroImage} alt={`${demo.businessName} — ${p.hero}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/30 via-black/30 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <div className="rounded-full bg-white/20 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur">{demo.industry}</div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl drop-shadow-lg">{demo.businessName}</h1>
          <p className="mt-3 max-w-lg text-lg drop-shadow-md">{p.hero}</p>
          <p className="mt-2 max-w-md text-sm opacity-90">{p.subhero}</p>
          <button onClick={onBook} className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-semibold shadow-glow transition-transform hover:scale-105" style={{ color: accent }}>
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Stats in rounded cards */}
      <div className="bg-pink-50/30 px-6 py-10 sm:px-10">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-5 text-center shadow-soft">
              <div className="text-2xl font-bold" style={{ color: accent }}>{s.value}</div>
              <div className="mt-1 text-xs text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services as elegant cards */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <div className="text-center">
          <h2 className="font-display text-3xl text-ink-900">Treatments & Pricing</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">Every treatment is designed around you.</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {p.services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-pink-100 bg-gradient-to-br from-white to-pink-50/40 p-5 transition-all hover:shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-ink-900">{s.title}</h3>
                <span className="shrink-0 rounded-full px-3 py-0.5 text-xs font-semibold text-white" style={{ background: accent }}>{s.price}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery as rounded masonry */}
      <div className="bg-pink-50/30 px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">Gallery</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img, i) => (
            <figure key={img.src} className={`overflow-hidden rounded-3xl ${i === 0 ? 'sm:row-span-2 sm:h-full' : ''}`}>
              <div className={`relative overflow-hidden ${i === 0 ? 'h-64 sm:h-full' : 'h-40'}`}>
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* About with rounded image right */}
      <div className="grid gap-8 bg-white px-6 py-14 sm:grid-cols-2 sm:px-10">
        <div>
          <h2 className="font-display text-3xl text-ink-900">About {demo.businessName}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Team as rounded circles */}
      {p.team.length > 0 && (
        <div className="bg-pink-50/30 px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">Meet the Team</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-36 text-center">
                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-soft">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">{m.name}</h3>
                <p className="text-xs" style={{ color: accent }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials as quote cards */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">What Clients Say</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-3xl bg-pink-50/40 p-6">
              <Quote size={28} style={{ color: accent }} className="opacity-30" />
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{t.quote}</p>
              <div className="mt-4 border-t border-pink-100 pt-3">
                <p className="text-sm font-semibold text-ink-900">{t.author}</p>
                <p className="text-xs text-ink-400">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + booking */}
      <div className="bg-pink-50/30 px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div className="rounded-3xl bg-white p-6"><h2 className="font-display text-xl text-ink-900">Hours</h2><div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div></div>
          <div className="rounded-3xl bg-white p-6">
            <h2 className="font-display text-xl text-ink-900">Visit Us</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-white px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">Questions?</h2>
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <div className="flex flex-col items-center gap-2 px-6 py-8 text-center" style={{ background: accent }}>
        <div className="text-sm font-bold text-white">{demo.businessName}</div>
        <div className="text-xs text-white/80">{p.address} · {p.phone}</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/70"><Star size={12} /> Demo · Built with WebsiteMagic.me</div>
      </div>
    </div>
  );
}

/* ─── 3. RUSTIC RESTAURANT — earthy, menu-forward, warm greens ─── */

function RusticRestaurant({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Hero with overlay text bottom-left, rustic feel */}
      <div className="relative h-[400px] overflow-hidden sm:h-[480px]">
        <img src={demo.heroImage} alt={`${demo.businessName} — ${p.hero}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 sm:p-16 text-white">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: '#86efac' }}>
            <span className="h-px w-8 bg-green-400" /> Farm to Table <span className="h-px w-8 bg-green-400" />
          </div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl drop-shadow-lg">{demo.businessName}</h1>
          <p className="mt-2 max-w-md text-lg drop-shadow-md">{p.hero}</p>
          <p className="mt-1 max-w-sm text-sm opacity-80">{p.subhero}</p>
          <button onClick={onBook} className="mt-5 rounded-lg border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink-900">
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Menu as the star — full menu card */}
      <div className="bg-stone-50 px-6 py-14 sm:px-10">
        <div className="text-center">
          <h2 className="font-display text-3xl text-ink-900">Our Menu</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">Seasonal dishes, made from scratch.</p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-white p-8 shadow-soft">
          <div className="divide-y divide-stone-100">
            {p.menu?.map((item) => (
              <div key={item.name} className="flex items-baseline justify-between gap-4 py-4">
                <div>
                  <h3 className="text-base font-semibold text-ink-900">{item.name}</h3>
                  <p className="mt-0.5 text-xs italic text-ink-500">{item.desc}</p>
                </div>
                <span className="shrink-0 text-base font-bold" style={{ color: accent }}>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <StatsRow stats={p.stats} accent={accent} />

      {/* Gallery as asymmetric grid */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">From Our Kitchen</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img, i) => (
            <figure key={img.src} className={`overflow-hidden rounded-xl ${i === 1 ? 'sm:mt-8' : ''}`}>
              <div className="relative h-48 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* About — text left, image right, earthy bg */}
      <div className="grid gap-8 bg-stone-100 px-6 py-14 sm:grid-cols-2 sm:px-10">
        <div className="overflow-hidden rounded-xl">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-3xl text-ink-900">Our Story</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-white px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">Meet the Chef</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-44 text-center">
                <div className="h-40 w-44 overflow-hidden rounded-xl shadow-soft">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-ink-900">{m.name}</h3>
                <p className="text-xs text-ink-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="bg-stone-100 px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">Guest Words</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-xl border border-stone-200 bg-white p-6">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} style={{ color: accent }} fill="currentColor" />)}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-900">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + reservation */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div><h2 className="font-display text-2xl text-ink-900">Hours</h2><div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div></div>
          <div className="rounded-xl border border-stone-200 p-5">
            <h2 className="font-display text-2xl text-ink-900">Reservations</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-stone-100 px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">Before You Visit</h2>
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <FooterDark demo={demo} />
    </div>
  );
}

/* ─── 4. BLUE SERVICE — clean, trust-building, blue accents ─── */

function BlueService({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Hero with split: image left, text right */}
      <div className="grid sm:grid-cols-2">
        <div className="relative h-64 sm:h-96">
          <img src={demo.heroImage} alt={`${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center bg-white px-8 py-12 sm:px-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>
            <Check size={16} /> Licensed & Insured
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl text-ink-900">{demo.businessName}</h1>
          <p className="mt-3 text-base text-ink-600">{p.hero}</p>
          <p className="mt-2 text-sm text-ink-500">{p.subhero}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={onBook} className="rounded-xl px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105" style={{ background: accent }}>
              {p.cta} <ExternalLink size={15} className="inline" />
            </button>
            <a href={`tel:${p.phone}`} className="rounded-xl border-2 px-6 py-3 text-sm font-bold transition-colors" style={{ borderColor: accent, color: accent }}>
              Call Now
            </a>
          </div>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Trust badges row */}
      <div className="bg-ink-900 px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-ink-300">
          <span className="flex items-center gap-1.5"><Check size={14} style={{ color: accent }} /> 24/7 Emergency Service</span>
          <span className="flex items-center gap-1.5"><Check size={14} style={{ color: accent }} /> Upfront Pricing</span>
          <span className="flex items-center gap-1.5"><Check size={14} style={{ color: accent }} /> 1-Year Warranty</span>
          <span className="flex items-center gap-1.5"><Check size={14} style={{ color: accent }} /> 15+ Years Experience</span>
        </div>
      </div>

      {/* Services grid with icons */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <h2 className="font-display text-3xl text-ink-900">Our Services</h2>
        <p className="mt-2 text-sm text-ink-500">Clear pricing, no surprises. Choose what fits your needs.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.services.map((s) => (
            <div key={s.title} className="rounded-xl border border-ink-200/70 p-5 transition-all hover:shadow-card">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}15`, color: accent }}>
                <Check size={16} />
              </div>
              <h3 className="text-base font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{s.desc}</p>
              <p className="mt-3 text-sm font-bold" style={{ color: accent }}>{s.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <StatsRow stats={p.stats} accent={accent} />

      {/* About */}
      <div className="grid gap-8 bg-ink-50/40 px-6 py-14 sm:grid-cols-2 sm:px-10">
        <div>
          <h2 className="font-display text-3xl text-ink-900">About {demo.businessName}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
        <div className="overflow-hidden rounded-xl"><img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" /></div>
      </div>

      {/* Gallery */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <h2 className="font-display text-3xl text-ink-900">Recent Work</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl">
              <div className="relative h-44 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-ink-50/40 px-6 py-14 sm:px-10">
          <h2 className="font-display text-3xl text-ink-900">Meet the Owner</h2>
          <div className="mt-8 flex flex-wrap gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-full border-2" style={{ borderColor: accent }}>
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{m.name}</h3>
                  <p className="text-xs" style={{ color: accent }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <h2 className="font-display text-3xl text-ink-900">Customer Reviews</h2>
        <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-xl border border-ink-200/70 p-5">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} style={{ color: accent }} fill="currentColor" />)}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-xs font-bold text-ink-900">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + CTA combined */}
      <div className="px-6 py-14 sm:px-10" style={{ background: accent }}>
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div className="text-white">
            <h2 className="font-display text-2xl">Hours & Service Area</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {p.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2">
                  <span className="flex items-center gap-2"><Clock size={14} className="opacity-70" /> {h.day}</span>
                  <span className="font-medium">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white p-6">
            <h2 className="font-display text-xl text-ink-900">Request Service</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-white px-6 py-14 sm:px-10">
          <h2 className="font-display text-3xl text-ink-900">FAQ</h2>
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <FooterDark demo={demo} />
    </div>
  );
}

/* ─── 5. CALM MEDICAL — soft teal, trust, clean ─── */

function CalmMedical({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Hero with light teal background and centered text */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}10, ${accent}05)` }}>
        <div className="mx-auto grid max-w-4xl gap-8 px-6 py-14 sm:grid-cols-2 sm:px-10">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
              <Check size={16} /> Accepting New Patients
            </div>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl text-ink-900">{demo.businessName}</h1>
            <p className="mt-3 text-base text-ink-700">{p.hero}</p>
            <p className="mt-2 text-sm text-ink-500">{p.subhero}</p>
            <button onClick={onBook} className="mt-6 w-fit rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105" style={{ background: accent }}>
              {p.cta} <ExternalLink size={15} className="inline" />
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img src={demo.heroImage} alt={`${demo.businessName}`} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Stats */}
      <div className="bg-white px-6 py-10 sm:px-10">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: `${accent}08` }}>
              <div className="text-2xl font-bold" style={{ color: accent }}>{s.value}</div>
              <div className="mt-1 text-xs text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="bg-ink-50/40 px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">Our Services</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink-500">Modern technology, gentle hands, and zero judgment.</p>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {p.services.map((s) => (
            <div key={s.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${accent}15`, color: accent }}>
                <Check size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-ink-900">{s.title}</h3>
                  <span className="shrink-0 text-sm font-bold" style={{ color: accent }}>{s.price}</span>
                </div>
                <p className="mt-1 text-sm text-ink-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="grid gap-8 bg-white px-6 py-14 sm:grid-cols-2 sm:px-10">
        <div className="overflow-hidden rounded-2xl">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-ink-900">About {demo.businessName}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-ink-50/40 px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">Meet Our Team</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-44 text-center">
                <div className="mx-auto h-36 w-36 overflow-hidden rounded-2xl border-2" style={{ borderColor: `${accent}40` }}>
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">{m.name}</h3>
                <p className="text-xs" style={{ color: accent }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">Our Facility</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-2xl">
              <div className="relative h-40 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="px-6 py-14 sm:px-10" style={{ background: `${accent}08` }}>
        <h2 className="text-center font-display text-3xl text-ink-900">Patient Stories</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-2xl bg-white p-6 shadow-soft">
              <Quote size={24} style={{ color: accent }} className="opacity-30" />
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{t.quote}</p>
              <div className="mt-4 border-t border-ink-100 pt-3">
                <p className="text-sm font-semibold text-ink-900">{t.author}</p>
                <p className="text-xs text-ink-400">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + booking */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div><h2 className="font-display text-2xl text-ink-900">Office Hours</h2><div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div></div>
          <div className="rounded-2xl p-6" style={{ background: `${accent}08` }}>
            <h2 className="font-display text-xl text-ink-900">Book a Visit</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="px-6 py-14 sm:px-10" style={{ background: `${accent}05` }}>
          <h2 className="text-center font-display text-3xl text-ink-900">FAQ</h2>
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <div className="flex flex-col items-center gap-2 px-6 py-8 text-center" style={{ background: accent }}>
        <div className="text-sm font-bold text-white">{demo.businessName}</div>
        <div className="text-xs text-white/80">{p.address} · {p.phone}</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/70"><Star size={12} /> Demo · Built with WebsiteMagic.me</div>
      </div>
    </div>
  );
}

/* ─── 6. CORPORATE CONSULTING — dark, serious, case-study focused ─── */

function CorporateConsulting({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Dark hero with bold statement */}
      <div className="bg-ink-900 px-8 py-16 sm:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ink-400">{demo.industry}</div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl text-white">{demo.businessName}</h1>
          <p className="mt-4 text-lg text-ink-300">{p.hero}</p>
          <p className="mt-2 max-w-xl mx-auto text-sm text-ink-400">{p.subhero}</p>
          <button onClick={onBook} className="mt-6 rounded-xl px-8 py-3 text-sm font-semibold text-ink-900 shadow-glow transition-transform hover:scale-105" style={{ background: '#fff' }}>
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} dark />

      {/* Stats on dark */}
      <StatsRow stats={p.stats} accent={accent} dark />

      {/* Services as clean grid */}
      <div className="bg-white px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-ink-900">What We Do</h2>
        <div className="mt-8 grid gap-px bg-ink-200/70 sm:grid-cols-2">
          {p.services.map((s) => (
            <div key={s.title} className="bg-white p-6">
              <h3 className="text-lg font-semibold text-ink-900">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{s.desc}</p>
              <p className="mt-3 text-sm font-bold uppercase tracking-wide" style={{ color: accent }}>{s.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About with image */}
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="bg-ink-900 px-8 py-14 sm:px-12">
          <h2 className="font-display text-3xl text-white">About {demo.businessName}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
        <div className="min-h-64 overflow-hidden">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-ink-900">In the Room</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl">
              <div className="relative h-44 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-ink-50/40 px-8 py-14 sm:px-16">
          <h2 className="font-display text-3xl text-ink-900">Our Partners</h2>
          <div className="mt-8 flex flex-wrap gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="flex items-start gap-4">
                <div className="h-24 w-24 overflow-hidden rounded-xl">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{m.name}</h3>
                  <p className="text-sm text-ink-500">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials as case results */}
      <div className="bg-ink-900 px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-white">Client Results</h2>
        <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-xl border border-white/10 p-6">
              <Quote size={24} className="text-ink-500" />
              <p className="mt-3 text-sm leading-relaxed text-ink-200">{t.quote}</p>
              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="text-sm font-semibold text-white">{t.author}</p>
                <p className="text-xs text-ink-400">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + contact */}
      <div className="bg-white px-8 py-14 sm:px-16">
        <div className="grid max-w-2xl gap-8 sm:grid-cols-2">
          <div><h2 className="font-display text-2xl text-ink-900">Office Hours</h2><div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div></div>
          <div className="rounded-xl border border-ink-200 p-5">
            <h2 className="font-display text-2xl text-ink-900">Get in Touch</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-ink-50/40 px-8 py-14 sm:px-16">
          <h2 className="font-display text-3xl text-ink-900">FAQ</h2>
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <FooterDark demo={demo} />
    </div>
  );
}

/* ─── 7. DARK LUXURY — black, gold accents, premium ─── */

function DarkLuxury({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  const goldAccent = '#d4af37';
  return (
    <div className="bg-ink-900">
      {/* Full-screen dark hero */}
      <div className="relative h-[420px] overflow-hidden sm:h-[500px]">
        <img src={demo.heroImage} alt={`${demo.businessName}`} className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-900/70 to-ink-900" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <div className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: goldAccent }}>{demo.industry}</div>
          <h1 className="mt-4 font-display text-4xl sm:text-6xl drop-shadow-lg">{demo.businessName}</h1>
          <p className="mt-3 max-w-lg text-lg" style={{ color: goldAccent }}>{p.hero}</p>
          <p className="mt-2 max-w-md text-sm text-ink-300">{p.subhero}</p>
          <button onClick={onBook} className="mt-6 rounded-lg px-8 py-3 text-sm font-semibold text-ink-900 shadow-glow transition-transform hover:scale-105" style={{ background: goldAccent }}>
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={goldAccent} dark />

      {/* Stats gold on black */}
      <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
        {p.stats.map((s) => (
          <div key={s.label} className="bg-ink-900 px-4 py-6 text-center">
            <div className="text-3xl font-bold" style={{ color: goldAccent }}>{s.value}</div>
            <div className="mt-1 text-xs text-ink-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Services on dark bg */}
      <div className="bg-ink-900 px-8 py-14 sm:px-16">
        <h2 className="text-center font-display text-3xl text-white">Fleet & Services</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {p.services.map((s) => (
            <div key={s.title} className="rounded-xl border border-white/10 p-5 transition-all hover:border-white/30">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <span className="shrink-0 text-sm font-bold" style={{ color: goldAccent }}>{s.price}</span>
              </div>
              <p className="mt-2 text-sm text-ink-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery full-width strip */}
      <div className="bg-black px-8 py-14 sm:px-16">
        <h2 className="text-center font-display text-3xl text-white">Our Fleet</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl">
              <div className="relative h-52 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover opacity-80 transition-all duration-500 hover:opacity-100 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <figcaption className="absolute bottom-3 left-4 text-sm font-medium" style={{ color: goldAccent }}>{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="grid gap-8 bg-ink-900 px-8 py-14 sm:grid-cols-2 sm:px-16">
        <div className="overflow-hidden rounded-xl">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover opacity-80" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-white">About {demo.businessName}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">{p.about}</p>
          <div className="mt-5 space-y-2.5 text-sm">
            <p className="flex items-center gap-2 text-ink-300"><MapPin size={15} style={{ color: goldAccent }} /> {p.address}</p>
            <p className="flex items-center gap-2 text-ink-300"><Phone size={15} style={{ color: goldAccent }} /> {p.phone}</p>
            <p className="flex items-center gap-2 text-ink-300"><Mail size={15} style={{ color: goldAccent }} /> {p.email}</p>
          </div>
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-black px-8 py-14 sm:px-16">
          <h2 className="text-center font-display text-3xl text-white">Operations</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-40 text-center">
                <div className="h-32 w-40 overflow-hidden rounded-xl border" style={{ borderColor: `${goldAccent}40` }}>
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover opacity-80" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-white">{m.name}</h3>
                <p className="text-xs" style={{ color: goldAccent }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="bg-ink-900 px-8 py-14 sm:px-16">
        <h2 className="text-center font-display text-3xl text-white">Client Testimonials</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-xl border border-white/10 p-6">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} style={{ color: goldAccent }} fill="currentColor" />)}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-200">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-xs font-bold text-white">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + booking on dark */}
      <div className="bg-black px-8 py-14 sm:px-16">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-white">Availability</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {p.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span className="flex items-center gap-2 text-ink-300"><Clock size={14} style={{ color: goldAccent }} /> {h.day}</span>
                  <span className="font-medium text-white">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border p-6" style={{ borderColor: `${goldAccent}30` }}>
            <h2 className="font-display text-xl text-white">Book Now</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-300"><MapPin size={16} style={{ color: goldAccent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-300 hover:text-white"><Phone size={16} style={{ color: goldAccent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-bold text-ink-900 shadow-soft transition-transform hover:scale-[1.02]" style={{ background: goldAccent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-ink-900 px-8 py-14 sm:px-16">
          <h2 className="text-center font-display text-3xl text-white">FAQ</h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-2.5">
            {p.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className={`overflow-hidden rounded-xl border bg-ink-800 transition-all ${isOpen ? 'border-white/20' : 'border-white/10'}`}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left">
                    <span className="text-sm font-semibold text-white">{f.q}</span>
                    <ChevronDown size={16} className={`shrink-0 text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden"><p className="px-4 pb-4 text-sm text-ink-400">{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2 bg-black px-6 py-8 text-center">
        <div className="text-sm font-bold text-white">{demo.businessName}</div>
        <div className="text-xs text-ink-400">{p.address} · {p.phone}</div>
        <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: goldAccent }}><Star size={12} fill="currentColor" /> Demo · Built with WebsiteMagic.me</div>
      </div>
    </div>
  );
}

/* ─── 8. BOLD FITNESS — dark with red, aggressive typography ─── */

function BoldFitness({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div className="bg-ink-900">
      {/* Hero with oversized type */}
      <div className="relative h-[380px] overflow-hidden sm:h-[460px]">
        <img src={demo.heroImage} alt={`${demo.businessName}`} className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-10 sm:px-16">
          <h1 className="font-display text-5xl font-black uppercase text-white sm:text-7xl">{demo.businessName}</h1>
          <p className="mt-2 max-w-lg text-xl font-bold uppercase text-white">{p.hero}</p>
          <p className="mt-1 max-w-md text-sm text-ink-400">{p.subhero}</p>
          <button onClick={onBook} className="mt-5 w-fit rounded-lg px-8 py-3.5 text-sm font-black uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-105" style={{ background: accent }}>
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} dark />

      {/* Stats — big and bold */}
      <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
        {p.stats.map((s) => (
          <div key={s.label} className="bg-ink-900 px-4 py-8 text-center">
            <div className="text-4xl font-black uppercase" style={{ color: accent }}>{s.value}</div>
            <div className="mt-1 text-xs font-bold uppercase tracking-wide text-ink-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Services as bold blocks */}
      <div className="bg-ink-900 px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl font-black uppercase text-white">Membership</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.services.map((s) => (
            <div key={s.title} className="rounded-xl border-2 p-5 transition-all hover:scale-[1.02]" style={{ borderColor: `${accent}40` }}>
              <h3 className="text-lg font-black uppercase text-white">{s.title}</h3>
              <p className="mt-1 text-sm text-ink-400">{s.desc}</p>
              <p className="mt-3 text-2xl font-black" style={{ color: accent }}>{s.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-black px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl font-black uppercase text-white">The Gym</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl">
              <div className="relative h-48 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-bold uppercase text-white">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="grid gap-8 bg-ink-900 px-8 py-14 sm:grid-cols-2 sm:px-16">
        <div className="overflow-hidden rounded-xl">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl font-black uppercase text-white">About</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">{p.about}</p>
          <div className="mt-5 space-y-2.5 text-sm">
            <p className="flex items-center gap-2 text-ink-300"><MapPin size={15} style={{ color: accent }} /> {p.address}</p>
            <p className="flex items-center gap-2 text-ink-300"><Phone size={15} style={{ color: accent }} /> {p.phone}</p>
            <p className="flex items-center gap-2 text-ink-300"><Mail size={15} style={{ color: accent }} /> {p.email}</p>
          </div>
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-black px-8 py-14 sm:px-16">
          <h2 className="font-display text-3xl font-black uppercase text-white">The Coaches</h2>
          <div className="mt-8 flex flex-wrap gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-44">
                <div className="h-52 w-44 overflow-hidden rounded-xl border-l-4" style={{ borderColor: accent }}>
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 text-sm font-black uppercase text-white">{m.name}</h3>
                <p className="text-xs uppercase tracking-wide" style={{ color: accent }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="bg-ink-900 px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl font-black uppercase text-white">Member Stories</h2>
        <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-xl border-l-4 p-6" style={{ borderColor: accent, background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-sm leading-relaxed text-ink-200">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-black uppercase text-white">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + join */}
      <div className="bg-black px-8 py-14 sm:px-16">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-black uppercase text-white">Hours</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {p.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span className="flex items-center gap-2 text-ink-300"><Clock size={14} style={{ color: accent }} /> {h.day}</span>
                  <span className="font-bold text-white">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-6" style={{ borderColor: accent }}>
            <h2 className="font-display text-2xl font-black uppercase text-white">Start Now</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-300"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-300 hover:text-white"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-lg px-4 py-3 text-sm font-black uppercase tracking-wider text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-ink-900 px-8 py-14 sm:px-16">
          <h2 className="font-display text-3xl font-black uppercase text-white">FAQ</h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-2.5">
            {p.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-xl border bg-ink-800" style={{ borderColor: isOpen ? `${accent}60` : 'rgba(255,255,255,0.1)' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left">
                    <span className="text-sm font-bold uppercase text-white">{f.q}</span>
                    <ChevronDown size={16} className={`shrink-0 text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden"><p className="px-4 pb-4 text-sm text-ink-400">{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2 bg-ink-900 px-6 py-8 text-center border-t" style={{ borderColor: `${accent}30` }}>
        <div className="text-sm font-black uppercase text-white">{demo.businessName}</div>
        <div className="text-xs text-ink-400">{p.address} · {p.phone}</div>
        <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: accent }}><Star size={12} fill="currentColor" /> Demo · Built with WebsiteMagic.me</div>
      </div>
    </div>
  );
}

/* ─── 9. EDITORIAL LAW — serif, sophisticated, navy ─── */

function EditorialLaw({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Editorial hero with serif and centered text */}
      <div className="px-8 py-16 sm:px-16" style={{ background: `linear-gradient(180deg, ${accent}08, transparent)` }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-ink-500">Attorneys at Law</div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl text-ink-900" style={{ fontStyle: 'italic' }}>{demo.businessName}</h1>
          <div className="mx-auto mt-4 h-px w-24" style={{ background: accent }} />
          <p className="mt-4 max-w-xl mx-auto text-lg text-ink-700">{p.hero}</p>
          <p className="mt-2 max-w-lg mx-auto text-sm text-ink-500">{p.subhero}</p>
          <button onClick={onBook} className="mt-6 rounded-lg px-8 py-3 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-105" style={{ background: accent }}>
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Stats in a thin bar */}
      <div className="bg-ink-900 px-8 py-6 sm:px-16">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#fff' }}>{s.value}</div>
              <div className="mt-0.5 text-xs uppercase tracking-wide text-ink-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Practice areas as editorial list */}
      <div className="px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-ink-900">Practice Areas</h2>
        <div className="mt-1 h-px w-16" style={{ background: accent }} />
        <div className="mt-8 grid gap-px bg-ink-200/70 sm:grid-cols-2">
          {p.services.map((s) => (
            <div key={s.title} className="bg-white p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink-900">{s.title}</h3>
                <span className="shrink-0 text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>{s.price}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About — editorial two-column */}
      <div className="px-8 py-14 sm:px-16" style={{ background: `${accent}06` }}>
        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl">
            <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl text-ink-900">Our Firm</h2>
            <div className="mt-1 h-px w-16" style={{ background: accent }} />
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
            <ContactInfo demo={demo} accent={accent} />
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-ink-900">Our Offices</h2>
        <div className="mt-1 h-px w-16" style={{ background: accent }} />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-xl">
              <div className="relative h-44 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Team — horizontal cards */}
      {p.team.length > 0 && (
        <div className="px-8 py-14 sm:px-16" style={{ background: `${accent}06` }}>
          <h2 className="font-display text-3xl text-ink-900">Our Attorneys</h2>
          <div className="mt-1 h-px w-16" style={{ background: accent }} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {p.team.map((m) => (
              <div key={m.name} className="flex items-start gap-5 rounded-xl bg-white p-5 shadow-soft">
                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{m.name}</h3>
                  <p className="text-xs uppercase tracking-wide" style={{ color: accent }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials as case results */}
      <div className="px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-ink-900">Case Results</h2>
        <div className="mt-1 h-px w-16" style={{ background: accent }} />
        <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-xl border border-ink-200 p-6">
              <Quote size={24} style={{ color: accent }} className="opacity-30" />
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{t.quote}</p>
              <div className="mt-4 border-t border-ink-100 pt-3">
                <p className="text-sm font-bold text-ink-900">{t.author}</p>
                <p className="text-xs text-ink-400">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + contact */}
      <div className="px-8 py-14 sm:px-16" style={{ background: `${accent}06` }}>
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-ink-900">Office Hours</h2>
            <div className="mt-1 h-px w-12" style={{ background: accent }} />
            <div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div>
          </div>
          <div className="rounded-xl border border-ink-200 p-5">
            <h2 className="font-display text-2xl text-ink-900">Schedule a Consultation</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="px-8 py-14 sm:px-16">
          <h2 className="font-display text-3xl text-ink-900">Frequently Asked</h2>
          <div className="mt-1 h-px w-16" style={{ background: accent }} />
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <div className="flex flex-col items-center gap-2 px-8 py-8 text-center" style={{ background: accent }}>
        <div className="text-sm font-bold text-white" style={{ fontStyle: 'italic' }}>{demo.businessName}</div>
        <div className="text-xs text-white/80">{p.address} · {p.phone}</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/70"><Star size={12} /> Demo · Built with WebsiteMagic.me</div>
      </div>
    </div>
  );
}

/* ─── 10. PLAYFUL VET — green, friendly, rounded, paw prints ─── */

function PlayfulVet({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Friendly hero with rounded image */}
      <div className="px-6 py-12 sm:px-10" style={{ background: `linear-gradient(135deg, ${accent}12, ${accent}05)` }}>
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide" style={{ color: accent }}>
              Fear-Free Certified
            </div>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl text-ink-900">{demo.businessName}</h1>
            <p className="mt-3 text-base text-ink-700">{p.hero}</p>
            <p className="mt-2 text-sm text-ink-500">{p.subhero}</p>
            <button onClick={onBook} className="mt-6 w-fit rounded-full px-8 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105" style={{ background: accent }}>
              {p.cta} <ExternalLink size={15} className="inline" />
            </button>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <img src={demo.heroImage} alt={`${demo.businessName}`} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Stats as playful pills */}
      <div className="bg-white px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {p.stats.map((s) => (
            <div key={s.label} className="rounded-full px-6 py-3 text-center" style={{ background: `${accent}10` }}>
              <span className="text-lg font-bold" style={{ color: accent }}>{s.value}</span>
              <span className="ml-2 text-xs text-ink-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services as rounded cards */}
      <div className="bg-green-50/30 px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">Our Services</h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink-500">Care that wags tails.</p>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {p.services.map((s) => (
            <div key={s.title} className="rounded-3xl border border-green-100 bg-white p-5 transition-all hover:shadow-soft">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-base font-bold text-ink-900">{s.title}</h3>
                <span className="shrink-0 rounded-full px-3 py-0.5 text-xs font-bold text-white" style={{ background: accent }}>{s.price}</span>
              </div>
              <p className="mt-2 text-sm text-ink-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">Happy Patients</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-3xl">
              <div className="relative h-40 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-bold text-white drop-shadow">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="grid gap-8 bg-green-50/30 px-6 py-14 sm:grid-cols-2 sm:px-10">
        <div className="overflow-hidden rounded-3xl">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-ink-900">About {demo.businessName}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-white px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">Meet the Vets</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-40 text-center">
                <div className="mx-auto h-36 w-36 overflow-hidden rounded-3xl border-4 border-green-100">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-ink-900">{m.name}</h3>
                <p className="text-xs" style={{ color: accent }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="bg-green-50/30 px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">Pet Parent Stories</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} style={{ color: accent }} fill="currentColor" />)}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-bold text-ink-900">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + booking */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div><h2 className="font-display text-2xl text-ink-900">Clinic Hours</h2><div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div></div>
          <div className="rounded-3xl p-6" style={{ background: `${accent}08` }}>
            <h2 className="font-display text-xl text-ink-900">Book a Visit</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-full px-4 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-green-50/30 px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">FAQ</h2>
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <div className="flex flex-col items-center gap-2 px-6 py-8 text-center" style={{ background: accent }}>
        <div className="text-sm font-bold text-white">{demo.businessName}</div>
        <div className="text-xs text-white/80">{p.address} · {p.phone}</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/70"><Star size={12} /> Demo · Built with WebsiteMagic.me</div>
      </div>
    </div>
  );
}

/* ─── 11. MINIMAL REALTY — clean, large photos, lots of white space ─── */

function MinimalRealty({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Full-bleed hero image with minimal text overlay */}
      <div className="relative h-[420px] overflow-hidden sm:h-[500px]">
        <img src={demo.heroImage} alt={`${demo.businessName}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        <div className="absolute bottom-0 left-0 p-8 sm:p-16 text-white">
          <h1 className="font-display text-4xl sm:text-5xl">{demo.businessName}</h1>
          <p className="mt-2 text-lg">{p.hero}</p>
          <button onClick={onBook} className="mt-5 rounded-lg px-6 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors" style={{ background: `${accent}cc` }}>
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Stats — minimal text bar */}
      <div className="bg-white px-8 py-8 sm:px-16">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-ink-900">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-ink-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services as minimal list */}
      <div className="px-8 py-14 sm:px-16" style={{ background: `${accent}05` }}>
        <h2 className="font-display text-3xl text-ink-900">Our Services</h2>
        <div className="mt-8 max-w-2xl divide-y divide-ink-100">
          {p.services.map((s) => (
            <div key={s.title} className="flex items-baseline justify-between gap-4 py-4">
              <div>
                <h3 className="text-base font-semibold text-ink-900">{s.title}</h3>
                <p className="mt-0.5 text-sm text-ink-500">{s.desc}</p>
              </div>
              <span className="shrink-0 text-sm font-bold" style={{ color: accent }}>{s.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery as large images */}
      <div className="bg-white px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-ink-900">Featured Properties</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {demo.galleryImages.map((img, i) => (
            <figure key={img.src} className={`overflow-hidden rounded-lg ${i === 0 ? 'sm:col-span-2' : ''}`}>
              <div className={`relative overflow-hidden ${i === 0 ? 'h-64 sm:h-72' : 'h-48'}`}>
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <figcaption className="absolute bottom-3 left-4 text-sm font-medium text-white">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="grid gap-8 px-8 py-14 sm:grid-cols-2 sm:px-16" style={{ background: `${accent}05` }}>
        <div className="overflow-hidden rounded-lg">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-ink-900">About</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-white px-8 py-14 sm:px-16">
          <h2 className="font-display text-3xl text-ink-900">Our Agents</h2>
          <div className="mt-8 flex flex-wrap gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-44">
                <div className="h-56 w-44 overflow-hidden rounded-lg">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-ink-900">{m.name}</h3>
                <p className="text-xs" style={{ color: accent }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="px-8 py-14 sm:px-16" style={{ background: `${accent}05` }}>
        <h2 className="font-display text-3xl text-ink-900">Client Testimonials</h2>
        <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author}>
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} style={{ color: accent }} fill="currentColor" />)}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold text-ink-900">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + contact */}
      <div className="bg-white px-8 py-14 sm:px-16">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div><h2 className="font-display text-2xl text-ink-900">Office Hours</h2><div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div></div>
          <div>
            <h2 className="font-display text-2xl text-ink-900">Contact</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="px-8 py-14 sm:px-16" style={{ background: `${accent}05` }}>
          <h2 className="font-display text-3xl text-ink-900">FAQ</h2>
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <FooterDark demo={demo} />
    </div>
  );
}

/* ─── 12. WARM CAFE — cozy, brown, rounded, menu-forward ─── */

function WarmCafe({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div>
      {/* Cozy hero with warm overlay */}
      <div className="relative h-[400px] overflow-hidden sm:h-[460px]">
        <img src={demo.heroImage} alt={`${demo.businessName}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <div className="rounded-full border border-white/30 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em]">Specialty Coffee</div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl">{demo.businessName}</h1>
          <p className="mt-3 max-w-lg text-lg">{p.hero}</p>
          <p className="mt-1 max-w-md text-sm opacity-80">{p.subhero}</p>
          <button onClick={onBook} className="mt-6 rounded-full px-8 py-3 text-sm font-semibold text-ink-900 shadow-glow transition-transform hover:scale-105" style={{ background: '#fcd34d' }}>
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} />

      {/* Stats in warm tones */}
      <div className="bg-amber-50/30 px-6 py-10 sm:px-10">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: accent }}>{s.value}</div>
              <div className="mt-1 text-xs text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu as the centerpiece */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <div className="text-center">
          <h2 className="font-display text-3xl text-ink-900">Menu</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">Made fresh, every day.</p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl">
          {p.menu?.map((item) => (
            <div key={item.name} className="flex items-baseline justify-between gap-4 border-b border-amber-100 py-4">
              <div>
                <h3 className="text-base font-semibold text-ink-900">{item.name}</h3>
                <p className="mt-0.5 text-xs italic text-ink-500">{item.desc}</p>
              </div>
              <span className="shrink-0 text-base font-bold" style={{ color: accent }}>{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-amber-50/30 px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">Our Space</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {demo.galleryImages.map((img) => (
            <figure key={img.src} className="overflow-hidden rounded-2xl">
              <div className="relative h-44 overflow-hidden">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <figcaption className="absolute bottom-2 left-3 text-xs font-medium text-white drop-shadow">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="grid gap-8 bg-white px-6 py-14 sm:grid-cols-2 sm:px-10">
        <div className="overflow-hidden rounded-2xl">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-ink-900">Our Story</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.about}</p>
          <ContactInfo demo={demo} accent={accent} />
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-amber-50/30 px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">Meet the Roaster</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="w-44 text-center">
                <div className="h-40 w-44 overflow-hidden rounded-2xl">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-3 text-sm font-bold text-ink-900">{m.name}</h3>
                <p className="text-xs" style={{ color: accent }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="bg-white px-6 py-14 sm:px-10">
        <h2 className="text-center font-display text-3xl text-ink-900">What People Say</h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-2xl bg-amber-50/40 p-6">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="text-amber-500" fill="currentColor" />)}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-bold text-ink-900">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + visit */}
      <div className="bg-amber-50/30 px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div><h2 className="font-display text-2xl text-ink-900">Hours</h2><div className="mt-4"><HoursBlock hours={p.hours} accent={accent} /></div></div>
          <div className="rounded-2xl bg-white p-6">
            <h2 className="font-display text-xl text-ink-900">Visit Us</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-700"><MapPin size={16} style={{ color: accent }} /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-700 hover:text-ink-900"><Phone size={16} style={{ color: accent }} /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.02]" style={{ background: accent }}>{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-white px-6 py-14 sm:px-10">
          <h2 className="text-center font-display text-3xl text-ink-900">FAQ</h2>
          <FaqAccordion faqs={p.faqs} accent={accent} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      )}

      <div className="flex flex-col items-center gap-2 px-6 py-8 text-center" style={{ background: accent }}>
        <div className="text-sm font-bold text-white">{demo.businessName}</div>
        <div className="text-xs text-white/80">{p.address} · {p.phone}</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/70"><Star size={12} /> Demo · Built with WebsiteMagic.me</div>
      </div>
    </div>
  );
}

/* ─── 13. GALLERY PHOTOGRAPHY — monochrome, minimalist, image-focused ─── */

function GalleryPhotography({ demo, accent, openFaq, setOpenFaq, onBook }: LayoutComponentProps) {
  const p = demo.preview;
  return (
    <div className="bg-ink-900">
      {/* Minimal dark hero with image */}
      <div className="relative h-[400px] overflow-hidden sm:h-[480px]">
        <img src={demo.heroImage} alt={`${demo.businessName}`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 sm:p-16 text-white">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-ink-400">{demo.industry}</div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{demo.businessName}</h1>
          <p className="mt-2 max-w-md text-lg text-ink-300">{p.hero}</p>
          <button onClick={onBook} className="mt-5 rounded-lg border border-white/30 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink-900">
            {p.cta} <ExternalLink size={15} className="inline" />
          </button>
        </div>
      </div>

      <Nav items={p.navItems} accent={accent} dark />

      {/* Stats minimal */}
      <div className="bg-ink-900 px-8 py-8 sm:px-16">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services as clean list on dark */}
      <div className="bg-ink-900 px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-white">Services & Investment</h2>
        <div className="mt-8 max-w-2xl divide-y divide-white/10">
          {p.services.map((s) => (
            <div key={s.title} className="flex items-baseline justify-between gap-4 py-4">
              <div>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-0.5 text-sm text-ink-400">{s.desc}</p>
              </div>
              <span className="shrink-0 text-base font-bold" style={{ color: '#a3a3a3' }}>{s.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery as large images — the star */}
      <div className="bg-black px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-white">Portfolio</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {demo.galleryImages.map((img, i) => (
            <figure key={img.src} className={`overflow-hidden rounded-lg ${i === 0 ? 'sm:col-span-2' : ''}`}>
              <div className={`relative overflow-hidden ${i === 0 ? 'h-64 sm:h-80' : 'h-48'}`}>
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-all duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <figcaption className="absolute bottom-3 left-4 text-sm font-medium text-white">{img.caption}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="grid gap-8 bg-ink-900 px-8 py-14 sm:grid-cols-2 sm:px-16">
        <div className="overflow-hidden rounded-lg">
          <img src={p.aboutImage} alt={`About ${demo.businessName}`} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="font-display text-3xl text-white">About</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-300">{p.about}</p>
          <div className="mt-5 space-y-2.5 text-sm">
            <p className="flex items-center gap-2 text-ink-300"><MapPin size={15} className="text-ink-500" /> {p.address}</p>
            <p className="flex items-center gap-2 text-ink-300"><Phone size={15} className="text-ink-500" /> {p.phone}</p>
            <p className="flex items-center gap-2 text-ink-300"><Mail size={15} className="text-ink-500" /> {p.email}</p>
          </div>
        </div>
      </div>

      {/* Team */}
      {p.team.length > 0 && (
        <div className="bg-black px-8 py-14 sm:px-16">
          <h2 className="font-display text-3xl text-white">The Team</h2>
          <div className="mt-8 flex flex-wrap gap-8">
            {p.team.map((m) => (
              <div key={m.name} className="flex items-center gap-4">
                <div className="h-24 w-24 overflow-hidden rounded-lg grayscale">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{m.name}</h3>
                  <p className="text-xs text-ink-400">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="bg-ink-900 px-8 py-14 sm:px-16">
        <h2 className="font-display text-3xl text-white">Client Words</h2>
        <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {p.testimonials.map((t) => (
            <div key={t.author} className="rounded-xl border border-white/10 p-6">
              <Quote size={24} className="text-ink-600" />
              <p className="mt-3 text-sm leading-relaxed text-ink-200">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-bold text-white">{t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hours + booking */}
      <div className="bg-black px-8 py-14 sm:px-16">
        <div className="mx-auto grid max-w-2xl gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl text-white">Studio Hours</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {p.hours.map((h) => (
                <li key={h.day} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                  <span className="flex items-center gap-2 text-ink-300"><Clock size={14} className="text-ink-500" /> {h.day}</span>
                  <span className="font-medium text-white">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 p-6">
            <h2 className="font-display text-xl text-white">Book a Session</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-300"><MapPin size={16} className="text-ink-500" /> {p.address}</p>
            <a href={`tel:${p.phone}`} className="mt-2 flex items-center gap-2 text-sm text-ink-300 hover:text-white"><Phone size={16} className="text-ink-500" /> {p.phone}</a>
            <button onClick={onBook} className="mt-4 w-full rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink-900">{p.cta}</button>
          </div>
        </div>
      </div>

      {p.faqs && p.faqs.length > 0 && (
        <div className="bg-ink-900 px-8 py-14 sm:px-16">
          <h2 className="font-display text-3xl text-white">FAQ</h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-2.5">
            {p.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-xl border bg-ink-800" style={{ borderColor: isOpen ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left">
                    <span className="text-sm font-semibold text-white">{f.q}</span>
                    <ChevronDown size={16} className={`shrink-0 text-ink-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden"><p className="px-4 pb-4 text-sm text-ink-400">{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2 bg-ink-900 px-6 py-8 text-center border-t border-white/5">
        <div className="text-sm font-bold text-white">{demo.businessName}</div>
        <div className="text-xs text-ink-400">{p.address} · {p.phone}</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-ink-500"><Star size={12} /> Demo · Built with WebsiteMagic.me</div>
      </div>
    </div>
  );
}
