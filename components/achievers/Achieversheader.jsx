import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";



// Orbit layout: ek bada centre photo + 2 rings par chhote gol photos.
// r = ring radius, a = angle (deg, 0 = right, clockwise), s = size px
const CX = 260;
const CY = 240;

const place = (r, a, s) => {
    const rad = (a * Math.PI) / 180;
    return { x: Math.round(CX + r * Math.cos(rad) - s / 2), y: Math.round(CY + r * Math.sin(rad) - s / 2) };
};

const CENTER = { src: "/images/achiever1.webp", alt: "Achiever 1", tag: "NDA", s: 180 };

const ORBIT = [
    { src: "/images/achiever3.webp", alt: "Achiever 3", tag: "CDS", s: 88, r: 150, a: -90, dur: 9, d: 0, in: 0.15, priority: true },
    { src: "/images/achiever4.webp", alt: "Achiever 4", tag: "AFCAT", s: 84, r: 150, a: 30, dur: 10, d: 0.5, in: 0.25, priority: true },
    { src: "/images/achiever5.webp", alt: "Achiever 5", tag: "SSB", s: 90, r: 150, a: 150, dur: 9.5, d: 0.9, in: 0.35, priority: true },
    { src: "/images/achiever6.webp", alt: "Achiever 6", tag: "Agniveer", s: 72, r: 225, a: -135, dur: 10.5, d: 0.3, in: 0.45 },
    { src: "/images/achiever7.webp", alt: "Achiever 7", s: 66, r: 225, a: -45, dur: 9, d: 1.1, in: 0.55 },
    { src: "/images/achiever8.webp", alt: "Achiever 8", s: 76, r: 225, a: 45, dur: 10, d: 0.7, in: 0.65 },
    { src: "/images/achiever9.webp", alt: "Achiever 9", s: 68, r: 225, a: 135, dur: 9.2, d: 1.3, in: 0.75 },
].map((o) => ({ ...o, ...place(o.r, o.a, o.s) }));

const STATS = [
    { num: "25,000+", label: "Aspirants Trained" },
    { num: "3900+", label: "Selections Achieved" },
    { num: "40+", label: "Defence Mentors" },
];



function Icon({ name, className = "size-5" }) {
    const common = { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": true };
    if (name === "users")
        return (
            <svg {...common}>
                <circle cx="9" cy="8" r="4" />
                <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6z" />
                <circle cx="18" cy="9" r="2.5" />
                <path d="M17 14c3 0 5 1.8 5 4.5V20h-4" />
            </svg>
        );
    if (name === "shield")
        return (
            <svg {...common}>
                <path d="M12 2l8 3v6c0 5-3.4 9.2-8 11-4.6-1.8-8-6-8-11V5z" />
            </svg>
        );
    return (
        <svg {...common}>
            <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.1 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
    );
}

const Sparkle = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="block size-full" aria-hidden="true">
        <path d="M12 0c.8 6.5 5.5 11.2 12 12-6.5.8-11.2 5.5-12 12-.8-6.5-5.5-11.2-12-12 6.5-.8 11.2-5.5 12-12z" />
    </svg>
);



const CSS = `
@keyframes ah-pop{from{opacity:0;transform:scale(.55)}to{opacity:1;transform:scale(1)}}
@keyframes ah-float-a{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes ah-float-b{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
@keyframes ah-twinkle{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(.8);opacity:.7}}
@keyframes ah-spin{to{transform:rotate(360deg)}}
@keyframes ah-glow{0%,100%{opacity:.55}50%{opacity:.9}}
@keyframes ah-shimmer{0%{transform:translateX(-130%) skewX(-20deg)}100%{transform:translateX(330%) skewX(-20deg)}}
@keyframes ah-photo-pop{0%,15%{transform:scale(.9)}30%,100%{transform:scale(1)}}
.achievers-hero .ah-pop{animation:ah-pop .7s cubic-bezier(.2,.9,.3,1.2) both}
.achievers-hero .ah-photo-pop{animation:ah-photo-pop 5s ease-in-out infinite}
.achievers-hero .ah-float-a{animation:ah-float-a 9s ease-in-out infinite}
.achievers-hero .ah-float-b{animation:ah-float-b 9s ease-in-out infinite}
.achievers-hero .ah-twinkle{animation:ah-twinkle 5s ease-in-out infinite}
.achievers-hero .ah-spin{animation:ah-spin 90s linear infinite}
.achievers-hero .ah-glow{animation:ah-glow 6s ease-in-out infinite}
.achievers-hero .ah-shimmer{animation:ah-shimmer 2.8s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.achievers-hero *{animation:none!important}}
`;

const floatStyle = ({ dur, d }) => ({ animationDuration: `${dur}s`, animationDelay: `${d}s` });



export default function AchieversHeader() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />

            <header className="achievers-hero relative isolate overflow-hidden bg-[linear-gradient(155deg,#0b1c33_0%,#081527_48%,#0a2552_100%)] px-5 py-24 text-white sm:px-6 sm:py-28">
                {/* warm gold glow (top-left) + royal blue glow (bottom-right) */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(780px_520px_at_6%_0%,rgba(184,146,66,.30),transparent_62%),radial-gradient(900px_620px_at_100%_100%,rgba(37,99,235,.38),transparent_60%),radial-gradient(520px_360px_at_62%_12%,rgba(231,195,109,.10),transparent_70%)]"
                />
                {/* fine grid, fades toward the edges */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_40%_40%,black_35%,transparent_80%)]"
                />
                {/* big outline rings, top-right */}
                <div aria-hidden="true" className="pointer-events-none absolute -right-44 -top-52 -z-10 size-[620px] rounded-full border border-white/10" />
                <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 -z-10 size-[420px] rounded-full border border-[#e7c36d]/15" />
                {/* soft bottom vignette for depth */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/25 to-transparent"
                />
                {/* thin gold line at the bottom (flat edge) */}
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-[#d9ae4e] to-transparent"
                />

                <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 lg:grid-cols-[1fr_540px]">
                    {/* LEFT  */}
                    <ScrollReveal animation="up" duration={700}>


                        <h1 className="mt-5 text-center text-2xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-left">
                            Prince Defence Academy
                            <br />
                            <span className="bg-gradient-to-r from-[#fbeab0] via-[#f1d98f] to-[#d9ae4e] bg-clip-text text-transparent">
                                Achievers & Selections
                            </span>
                        </h1>

                        <p className="mt-5 max-w-[470px] text-base leading-relaxed text-[#d3defa] text-center md:text-left">
                            Behind every selection is a story of dedication, discipline and
                            determination. Discover the proud achievements of Prince Defence
                            Academy students who turned their dreams of serving the nation into reality.
                        </p>


                        <ul className="mt-8 grid max-w-[480px] grid-cols-3 gap-3">
                            {STATS.map((st) => (
                                <li
                                    key={st.num}
                                    className="rounded-2xl text-center border border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-3.5 backdrop-blur-md"
                                >
                                    <strong className="mt-2.5 block text-xl font-extrabold leading-none">{st.num}</strong>
                                    <span className="mt-1 block text-[12px] font-medium leading-tight text-[#c5d3f5]">
                                        {st.label}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/courses"
                            className="group relative mt-8 inline-flex min-h-12 w-fit max-w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-2xl bg-gradient-to-b from-[#e7c36d] to-[#b89242] px-5 py-3 text-sm font-extrabold text-[#071b32] shadow-[0_10px_30px_rgba(184,146,66,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(184,146,66,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e7c36d]/40 active:translate-y-0 active:scale-[0.98] sm:px-6 sm:text-base"
                        >
                            <span
                                aria-hidden="true"
                                className="ah-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                            />
                            <span className="relative">Explore Defence Courses</span>
                            <ArrowRight
                                size={18}
                                className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
                            />
                        </Link>
                    </ScrollReveal>

                    {/* RIGHT : orbit of circular photos  */}
                    <ScrollReveal animation="up" delay={120} duration={700} className="relative h-[300px] sm:h-[384px] lg:h-[480px]">
                        <div className="absolute left-1/2 top-0 h-[480px] w-[520px] origin-top -translate-x-1/2 scale-[.62] sm:scale-[.8] lg:scale-100">
                            {/* glow behind the centre */}
                            <div
                                aria-hidden="true"
                                className="ah-glow absolute rounded-full bg-[radial-gradient(circle,rgba(246,217,140,.45),transparent_68%)]"
                                style={{ left: CX - 170, top: CY - 170, width: 340, height: 340 }}
                            />

                            {/* orbit rings */}
                            <div
                                aria-hidden="true"
                                className="absolute rounded-full border border-white/25"
                                style={{ left: CX - 150, top: CY - 150, width: 300, height: 300 }}
                            />
                            <div
                                aria-hidden="true"
                                className="ah-spin absolute rounded-full border border-dashed border-white/30"
                                style={{ left: CX - 225, top: CY - 225, width: 450, height: 450 }}
                            />

                            {/* centre photo with gold ring */}
                            <div
                                className="ah-photo-pop absolute"
                                style={{ left: CX - CENTER.s / 2, top: CY - CENTER.s / 2, animationDelay: "0.05s" }}
                            >
                                <div className="ah-float-a relative" style={{ width: CENTER.s, height: CENTER.s, animationDuration: "10s" }}>
                                    <div className="size-full rounded-full bg-[conic-gradient(from_200deg,#fbeab0,#d9ae4e,#ffffff,#f1d98f,#fbeab0)] p-[5px] shadow-[0_20px_50px_rgba(0,8,60,.55),0_0_60px_rgba(246,217,140,.35)]">
                                        <div className="relative size-full overflow-hidden rounded-full border-4 border-[#0b1c33] bg-gradient-to-br from-[#dbe6ff] to-[#8aa5e6]">
                                            <Image
                                                src={CENTER.src}
                                                alt={CENTER.alt}
                                                fill
                                                sizes="180px"
                                                priority
                                                className="object-cover object-[center_40%]"
                                            />
                                        </div>
                                    </div>
                                    <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#f1d98f] px-3 py-1 text-[11px] font-extrabold text-[#0a1f6b] shadow-lg">
                                        {CENTER.tag} · Selected
                                    </span>
                                </div>
                            </div>

                            {/* orbiting photos */}
                            {ORBIT.map((o, i) => (
                                <div
                                    key={o.src}
                                    className="ah-photo-pop absolute"
                                    style={{ left: o.x, top: o.y, width: o.s, animationDelay: `${o.in}s` }}
                                >
                                    <div
                                        className={`${i % 2 === 0 ? "ah-float-a" : "ah-float-b"} relative`}
                                        style={{ width: o.s, height: o.s, ...floatStyle(o) }}
                                    >
                                        <div className="relative size-full overflow-hidden rounded-full border-[3px] border-white bg-gradient-to-br from-[#dbe6ff] to-[#8aa5e6] shadow-[0_12px_28px_rgba(0,8,60,.5)]">
                                            <Image
                                                src={o.src}
                                                alt={o.alt}
                                                fill
                                                sizes={`${o.s}px`}
                                                priority={o.priority}
                                                className="object-cover object-[center_40%]"
                                            />
                                        </div>
                                        {o.tag && (
                                            <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/40 bg-white/90 px-2.5 py-0.5 text-[10px] font-extrabold text-[#0a2a8a] shadow">
                                                {o.tag}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* glass badge */}
                            <div className="ah-pop absolute bottom-0 right-0" style={{ animationDelay: "0.9s" }}>
                                <div
                                    className="ah-float-b flex items-center gap-3 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 shadow-[0_14px_30px_rgba(0,8,60,.35)] backdrop-blur-xl"
                                    style={{ animationDuration: "10s" }}
                                >
                                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-b from-[#fbeab0] to-[#e9c466] text-[#0a1f6b]">
                                        <Icon name="shield" className="size-5" />
                                    </span>
                                    <div>
                                        <strong className="block text-lg font-extrabold leading-none">3900+</strong>
                                        <span className="text-[11px] font-medium text-[#dbe5ff]">Selections</span>
                                    </div>
                                </div>
                            </div>

                            {/* sparkles */}
                            <div aria-hidden="true" className="ah-twinkle absolute left-[300px] top-[4px] size-7 text-[#f6e3a4]">
                                <Sparkle />
                            </div>
                            <div
                                aria-hidden="true"
                                className="ah-twinkle absolute left-[18px] top-[330px] size-6 text-white/80"
                                style={{ animationDelay: "1.2s" }}
                            >
                                <Sparkle />
                            </div>
                        </div>
                        </ScrollReveal>
                    </div>
            </header>
        </>
    );
}
