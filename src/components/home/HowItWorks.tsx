import { useNavigate } from 'react-router-dom';
import { Palette, ClipboardList, PenTool, Rocket, ShieldCheck, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: Palette,
    title: 'Choose your design',
    desc: 'Browse our website gallery and choose a style you love.',
  },
  {
    icon: ClipboardList,
    title: 'Tell us about your business',
    desc: 'Complete a simple questionnaire covering your services, branding, hours, and goals.',
  },
  {
    icon: PenTool,
    title: 'We build your website',
    desc: 'Our team creates your website and configures the features your business needs.',
  },
  {
    icon: Rocket,
    title: 'Approve and launch',
    desc: 'Review your website, request revisions, and approve the final design.',
  },
  {
    icon: ShieldCheck,
    title: 'We keep it running',
    desc: 'Hosting, security, backups, maintenance, and ongoing support are handled for you.',
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  return (
    <section id="how-it-works" className="section-y bg-white">
      <div className="mx-auto max-w-7xl container-px">
        <div className="max-w-2xl">
          <span className="eyebrow">How it works</span>
          <h2 className="heading-2 mt-4 text-ink-900">From idea to live website. We handle everything.</h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="relative">
                <div className="card h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon size={20} />
                    </span>
                    <span className="text-3xl font-bold text-ink-200">0{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                    <ArrowRight size={18} className="text-ink-300" />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex justify-center">
          <button onClick={() => navigate('/get-started')} className="btn-primary">
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
