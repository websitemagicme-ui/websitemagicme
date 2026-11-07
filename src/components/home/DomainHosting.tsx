import { ArrowUpRight, Globe2, Server } from 'lucide-react';

export default function DomainHosting() {
  return (
    <section className="border-y border-ink-200/70 bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-xl2 border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-7 shadow-soft sm:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Globe2 size={21} />
            </span>
            <p className="eyebrow mt-5">Domain names</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink-900">Need a domain for your business?</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
              Purchase your domain through GoDaddy, or tell us what you need and we can help you choose a strong name for your website.
            </p>
            <a
              href="https://www.godaddy.com/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6"
            >
              Search domains on GoDaddy <ArrowUpRight size={16} />
            </a>
            <p className="mt-3 text-xs text-ink-400">Domain registration and renewal fees are paid to the registrar.</p>
          </div>

          <div className="rounded-xl2 border border-ink-200/70 bg-ink-50/50 p-7 sm:p-8">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-400/15 text-accent-700">
              <Server size={21} />
            </span>
            <p className="eyebrow mt-5">Hosting included</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink-900">Your website hosting is covered.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-600">
              Hosting is included at no extra charge with every website plan. If you choose ongoing monthly maintenance, hosting can remain included as part of that service.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-ink-200 bg-white p-4">
                <p className="text-sm font-semibold text-ink-900">All website plans</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">Secure hosting and SSL included.</p>
              </div>
              <div className="rounded-xl border border-ink-200 bg-white p-4">
                <p className="text-sm font-semibold text-ink-900">Monthly maintenance</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">Hosting can be included with your ongoing service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
