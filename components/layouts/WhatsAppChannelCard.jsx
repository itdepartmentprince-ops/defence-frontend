import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";

export default function WhatsAppChannelCard() {
  const channelUrl = "https://whatsapp.com/channel/0029VaBwXM1IyPtJUs87cq2v";

  const features = [
    "Latest Updates",
    "Results & Announcements",
    "Defence Career Guidance",
  ];

  return (
    <div className="w-full px-4 py-8">
      {/* Control the box size here: width = max-w, height = aspect ratio. */}
      <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl sm:aspect-[5/2]">
        {/* Symmetrical trapezoid shape with a longer left side and shorter right side. */}
        <svg
          className="absolute inset-0 h-full w-full drop-shadow-[0_18px_30px_rgba(7,33,58,0.15)]"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="channelCardFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f7f8f9" />
            </linearGradient>
          </defs>
          <path
            d="M 24,0 L 960,64 Q 1000,67 1000,104 L 1000,296 Q 1000,333 960,336 L 24,400 Q 0,400 0,376 L 0,24 Q 0,0 24,0 Z"
            fill="url(#channelCardFill)"
            stroke="#b89242"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Center the content vertically inside the shape. */}
        <div className="absolute inset-0 z-10 flex items-center pl-[6%] pr-[7%]">
          {/* Left: heading */}
          <div className="w-[42%]">
            <h3 className="mt-1 text-[clamp(1.8rem,2.2vw,3.1rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--navy)]">
              Our
              <span className="block text-[var(--gold)]">WhatsApp</span>
              <span className="block">Channel!</span>
            </h3>
            <div className="mt-2 h-1 w-12 rounded-full bg-[var(--gold)] sm:mt-3 sm:w-16" />
          </div>

          {/* Divider */}
          <div
            className="mx-[3%] h-[45%] w-px bg-gradient-to-b from-transparent via-[var(--gold)]/60 to-transparent"
            aria-hidden="true"
          />

          {/* Right: list + button */}
          <div className="flex w-[50%] flex-col items-start gap-3 sm:gap-5">
            <ul className="space-y-2 sm:space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-[10px] font-medium leading-tight tracking-[0.01em] text-[var(--foreground)] sm:text-base"
                >
                  <FaCheckCircle className="shrink-0 text-[var(--gold)]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--green)] px-3 py-1.5 text-[11px] font-bold text-white shadow-md transition hover:bg-[var(--navy)] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <FaWhatsapp className="text-sm sm:text-lg" />
              Join Channel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}