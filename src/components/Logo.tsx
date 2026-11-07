interface LogoProps {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}

export default function Logo({ className = '', markClassName = '', wordClassName = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink-900 shadow-soft ${markClassName}`}
        aria-hidden="true"
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 22L12 10L16 17L20 10L26 22"
            stroke="#4a9eff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="25" r="1.8" fill="#4a9eff" />
        </svg>
      </span>
      <span className={`text-[15px] font-semibold tracking-tight text-ink-900 ${wordClassName}`}>
        WebsiteMagic
        <span className="text-brand-500">.me</span>
      </span>
    </span>
  );
}
