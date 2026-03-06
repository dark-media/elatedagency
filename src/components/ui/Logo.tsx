export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e9c37f" />
          <stop offset="50%" stopColor="#d4a64a" />
          <stop offset="100%" stopColor="#c5a55a" />
        </linearGradient>
      </defs>
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="8"
        stroke="url(#logoGold)"
        strokeWidth="2"
        fill="#0a0a0c"
      />
      <path
        d="M12 10.5h16v3.5H16.5v4h9.5v3.5h-9.5v5h12V30H12V10.5z"
        fill="url(#logoGold)"
      />
    </svg>
  );
}

export function LogoFull({
  className = "h-8",
  textClassName = "",
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-full w-auto" />
      <span
        className={`text-lg font-bold tracking-[0.15em] text-white ${textClassName}`}
        style={{ lineHeight: 1 }}
      >
        ELATED
      </span>
    </div>
  );
}
