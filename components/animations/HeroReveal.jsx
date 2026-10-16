
export default function HeroReveal({
  children,
  className = "",
  delay = 0,
  duration = 1200,
  type = "fade-up", // "fade-up" | "zoom"
}) {
  return (
    <div
      className={`hero-reveal hero-reveal--${type} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}

      <style jsx>{`
        .hero-reveal {
          opacity: 0;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: forwards;
        }

        /* Variant 1: fade + slide up */
        .hero-reveal--fade-up {
          transform: translateY(28px);
          animation-name: heroFadeUp;
        }
        @keyframes heroFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Variant 2: fade + scale (zoom-in) */
        .hero-reveal--zoom {
          transform: scale(0.94);
          animation-name: heroZoomIn;
        }
        @keyframes heroZoomIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
