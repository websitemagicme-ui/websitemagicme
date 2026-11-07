interface BrowserMockupProps {
  url: string;
  accent?: string;
  variant?: 'full' | 'compact';
  children: React.ReactNode;
}

export default function BrowserMockup({ url, accent = '#3361f5', variant = 'full', children }: BrowserMockupProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl2 border border-ink-200/70 bg-white shadow-card transition-shadow ${
        variant === 'full' ? 'shadow-glow' : ''
      }`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-ink-200/70 bg-ink-50/80 px-3 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex w-full max-w-[220px] items-center justify-center gap-1.5 rounded-md border border-ink-200/70 bg-white px-3 py-1 text-[11px] text-ink-400">
          <span className="text-accent-500">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
          </span>
          {url}
        </div>
        <div className="hidden sm:block" style={{ width: 44 }} />
      </div>
      {/* Body */}
      <div className="bg-white" style={{ borderTop: `2px solid ${accent}` }}>
        {children}
      </div>
    </div>
  );
}
