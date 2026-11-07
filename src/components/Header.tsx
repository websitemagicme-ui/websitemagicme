import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const NAV = [
  { label: 'Explore Designs', to: '/#showroom' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'AI Receptionist', to: '/#ai-receptionist' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'SEO Services', to: '/#seo-services' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Client Support', to: '/support' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNav = (to: string) => {
    setOpen(false);
    if (to.startsWith('/#')) {
      const hash = to.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(to);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-200/70 bg-[#fbfcfe]/85 backdrop-blur-lg'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between container-px lg:h-18">
        <Link to="/" className="flex items-center" aria-label="WebsiteMagic.me home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.to)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100/60 hover:text-ink-900"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button onClick={() => handleNav('/#showroom')} className="btn-ghost">
            Explore Designs
          </button>
          <button onClick={() => navigate('/get-started')} className="btn-primary">
            Get My Website
          </button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-ink-200/70 bg-[#fbfcfe] md:hidden ${
          open ? 'max-h-96' : 'max-h-0'
        } transition-all duration-300`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.to)}
              className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink-700 hover:bg-ink-100"
            >
              {item.label}
            </button>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <button onClick={() => handleNav('/#showroom')} className="btn-secondary w-full">
              Explore Designs
            </button>
            <button onClick={() => navigate('/get-started')} className="btn-primary w-full">
              Get My Website
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
