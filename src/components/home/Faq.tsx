import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/data/faqs';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-y">
      <div className="mx-auto max-w-3xl container-px">
        <div className="text-center">
          <span className="eyebrow justify-center">FAQ</span>
          <h2 className="heading-2 mt-4 text-ink-900">Questions, answered.</h2>
          <p className="mt-4 text-lg text-ink-500">
            Everything you need to know about working with WebsiteMagic.me.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-xl border bg-white transition-all ${
                  isOpen ? 'border-brand-200 shadow-soft' : 'border-ink-200/70'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-ink-900">{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ink-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
