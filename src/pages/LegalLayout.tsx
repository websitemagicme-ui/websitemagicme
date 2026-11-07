import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl container-px py-14">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 transition-colors hover:text-brand-600">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className="mt-6 font-display text-4xl text-ink-900">{title}</h1>
      <p className="mt-2 text-sm text-ink-400">Last updated: {lastUpdated}</p>
      <div className="prose mt-8 max-w-none space-y-5 text-sm leading-relaxed text-ink-600 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink-900">
        {children}
      </div>
    </div>
  );
}
