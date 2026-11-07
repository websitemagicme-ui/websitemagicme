import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const NAV = [
  { label: 'Explore Designs', to: '/#showroom' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Client Support', to: '/support' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-ink-200/70 bg-white">
      <div className="mx-auto max-w-7xl container-px py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
              WebsiteMagic.me is a managed website service for small businesses. We build it, we
              manage it, and you run your business — no technical skills required.
            </p>
            <a
              href="mailto:hello@websitemagic.me"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-600"
            >
              <Mail size={16} /> hello@websitemagic.me
            </a>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-400">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.to.startsWith('/#') ? (
                    <button
                      onClick={() => {
                        const hash = item.to.slice(2);
                        if (window.location.pathname !== '/') {
                          navigate('/');
                          setTimeout(
                            () => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }),
                            100,
                          );
                        } else {
                          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-sm text-ink-600 transition-colors hover:text-ink-900"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link to={item.to} className="text-sm text-ink-600 transition-colors hover:text-ink-900">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-400">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/privacy" className="text-sm text-ink-600 transition-colors hover:text-ink-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-ink-600 transition-colors hover:text-ink-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm text-ink-600 transition-colors hover:text-ink-900">
                  Admin Login
                </Link>
              </li>
              <li>
                <Link to="/admin/signup" className="text-sm text-ink-600 transition-colors hover:text-ink-900">
                  Create Admin Account
                </Link>
              </li>
            </ul>
            <button
              onClick={() => navigate('/get-started')}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              Get started <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-200/70 pt-6">
          <p className="text-xs text-ink-400">
            © 2026 WebsiteMagic.me. All rights reserved. Demo businesses shown on this site are
            fictional and for illustration only.
          </p>
        </div>
      </div>
    </footer>
  );
}
