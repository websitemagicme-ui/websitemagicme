import { Server, Headphones, Building2, TrendingUp } from 'lucide-react';

const BENEFITS = [
  {
    icon: Server,
    title: 'We manage everything',
    desc: 'Hosting, SSL, security, backups, and website maintenance are handled by our team.',
  },
  {
    icon: Headphones,
    title: 'Real human support',
    desc: 'Need a change? Talk to a real person who can help.',
  },
  {
    icon: Building2,
    title: 'Built for your business',
    desc: 'Your website reflects your brand, services, and business goals.',
  },
  {
    icon: TrendingUp,
    title: 'Ready to grow',
    desc: 'Add new pages, booking tools, integrations, and features as your business evolves.',
  },
];

export default function Benefits() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-7xl container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">Managed service</span>
          <h2 className="heading-2 mt-4 text-ink-900">
            A managed website. Not another thing on your to-do list.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
