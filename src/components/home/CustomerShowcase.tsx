import { ArrowUpRight, Star } from 'lucide-react';

interface ClientShowcase {
  name: string;
  url: string;
  industry: string;
  description: string;
  testimonial: string;
  author: string;
  role: string;
  accentColor: string;
}

const CLIENTS: ClientShowcase[] = [
  {
    name: 'MathMind',
    url: 'https://mindmathla.com/',
    industry: 'Private Math Tutoring',
    description:
      'A private math tutoring service in Glendale, CA, helping students from algebra through calculus build real understanding and confidence.',
    testimonial:
      'Our new website brought in more tutoring inquiries in the first month than we got all of last year. It looks professional and works perfectly on phones.',
    author: 'MathMind Tutoring',
    role: 'Glendale, CA',
    accentColor: '#0e7490',
  },
  {
    name: 'GoPro Limo',
    url: 'https://goprolimo.com/',
    industry: 'Limousine Service',
    description:
      'A Los Angeles-based limousine service offering airport transfers, corporate travel, weddings, and special event transportation across Southern California.',
    testimonial:
      'We went from getting most of our bookings by phone to a website that sells for us 24/7. The booking flow is clean and our fleet looks incredible online.',
    author: 'GoPro Limo',
    role: 'Los Angeles, CA',
    accentColor: '#111827',
  },
];

export default function CustomerShowcase() {
  return (
    <section id="customers" className="section-y bg-ink-50/50">
      <div className="mx-auto max-w-7xl container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">Our clients</span>
          <h2 className="heading-2 mt-4 text-ink-900">Businesses we built websites for.</h2>
          <p className="mt-4 text-lg text-ink-500">
            Real businesses. Real websites. Real results. Here are two clients who trust us with their online presence.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {CLIENTS.map((client) => (
            <article
              key={client.name}
              className="group flex flex-col overflow-hidden rounded-xl2 border border-ink-200/70 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
            >
              {/* Browser bar mockup */}
              <div className="border-b border-ink-200/70 bg-ink-50/80 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs text-ink-400">
                    {client.url.replace('https://', '')}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: client.accentColor }}
                  >
                    {client.name.charAt(0)}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink-900">{client.name}</h3>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-400">{client.industry}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink-500">{client.description}</p>

                {/* Snippet preview */}
                <div className="mt-4 rounded-xl border border-ink-100 bg-ink-50/50 p-4">
                  <div className="flex items-center gap-1 text-xs font-medium text-ink-400">
                    <Star size={12} className="text-warning" />
                    What they said
                  </div>
                  <p className="mt-2 text-sm italic leading-relaxed text-ink-700">
                    &ldquo;{client.testimonial}&rdquo;
                  </p>
                  <p className="mt-2 text-xs font-semibold text-ink-500">
                    — {client.author}, {client.role}
                  </p>
                </div>

                <div className="mt-auto pt-5">
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-800 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    Visit live website <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Additional short testimonials */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {SHORT_TESTIMONIALS.map((t) => (
            <div key={t.author} className="rounded-xl border border-ink-200/70 bg-white p-5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-warning" fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-xs font-semibold text-ink-500">— {t.author}</p>
              <p className="text-xs text-ink-400">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SHORT_TESTIMONIALS = [
  {
    quote: 'We got our website in days, not months. It looks better than anything our old agency ever made.',
    author: 'Marcus R.',
    detail: 'Barbershop owner',
  },
  {
    quote: 'The monthly maintenance means I never have to think about updates. They just handle it.',
    author: 'Sofia L.',
    detail: 'Salon owner',
  },
  {
    quote: 'Best investment we made this year. New patients find us online every single week now.',
    author: 'Dr. Patel',
    detail: 'Dental clinic',
  },
];
