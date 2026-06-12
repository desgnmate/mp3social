export function TornEdgeBottom({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 z-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-[60px] w-full md:h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="rough-b" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02 0.04"
              numOctaves="2"
              seed="7"
            />
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>
        </defs>
        <path
          d="M0,80 L0,32 Q60,46 120,28 T240,36 T360,22 T480,38 T600,28 T720,42 T840,30 T960,36 T1080,24 T1200,40 T1320,30 T1440,38 L1440,80 Z"
          fill="currentColor"
          filter="url(#rough-b)"
        />
      </svg>
    </div>
  );
}
