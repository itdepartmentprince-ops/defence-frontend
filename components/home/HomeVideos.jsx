"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import ScrollReveal from "../animations/ScrollReveal";

const videos = [
    {
        id: "discipline-stamina",
        title: "Discipline & Stamina",
        source: "Prince NDA Academy",
        videoId: "A6n7DrlVc40",
    },
    {
        id: "morning-zumba",
        title: "Morning Zumba Workout",
        source: "Prince NDA Academy",
        videoId: "O4qTh88AP3E",
    },
    {
        id: "morning-physical-training",
        title: "Morning Physical Training",
        source: "Prince NDA Academy",
        videoId: "D0YhNnBCsxo",
        startSeconds: 27,
    },
    {
        id: "sunday-at-academy",
        title: "Sunday at the Academy",
        source: "Prince NDA Academy",
        videoId: "d5s-04bLjtA",
    },
    {
        id: "academy-highlights",
        title: "Academy Highlights",
        source: "Prince Defence Academy Sikar",
        videoId: "6M3p1_FytPg",
    },
    {
        id: "defence-academy",
        title: "Prince Defence Academy",
        source: "Prince Defence Academy Sikar",
        videoId: "wc9e0wBroSE",
    },
];

export default function HomeVideos() {
    const videosTrackRef = useRef(null);
    const [activeVideoId, setActiveVideoId] = useState(videos[0].id);
    const [playingVideoId, setPlayingVideoId] = useState(null);
    const [canScrollVideos, setCanScrollVideos] = useState(false);

    useEffect(() => {
        const track = videosTrackRef.current;

        if (!track) return;

        const updateScrollState = () => {
            setCanScrollVideos(
                track.scrollWidth > track.clientWidth + 1
            );
        };

        const frameId = requestAnimationFrame(updateScrollState);
        const observer = new ResizeObserver(updateScrollState);

        observer.observe(track);
        track.addEventListener("scroll", updateScrollState, {
            passive: true,
        });

        return () => {
            cancelAnimationFrame(frameId);
            observer.disconnect();
            track.removeEventListener("scroll", updateScrollState);
        };
    }, []);

    useEffect(() => {
        if (!playingVideoId) return;

        const stopPlaybackOnScroll = () => {
            setPlayingVideoId(null);
        };

        window.addEventListener("scroll", stopPlaybackOnScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", stopPlaybackOnScroll);
        };
    }, [playingVideoId]);

    const openVideo = (video) => {
        setActiveVideoId(video.id);
        setPlayingVideoId(video.videoId ? video.id : null);
    };

    return (
        <section
            className="relative isolate overflow-hidden bg-gradient-to-br from-[#07182B] via-[#102A43] to-[#07111F] px-4 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20"
            aria-labelledby="home-videos-title"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -top-36 -z-10 h-96 w-96 rounded-full bg-(--gold)/10 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-48 -left-28 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"
            />

            <div className="mx-auto max-w-7xl">
                <ScrollReveal>
                <header className="mx-auto mb-7 max-w-2xl px-1 text-center sm:mb-10 sm:px-0">
                    <span className="inline-flex items-center gap-2 rounded-full border border-(--gold)/30 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-(--gold) sm:px-4 sm:text-xs sm:tracking-[0.2em]">
                        <span className="h-1.5 w-1.5 rounded-full bg-(--gold)" />
                        Academy in action
                    </span>
                    <h2
                        id="home-videos-title"
                        className="mt-3 text-[1.65rem] font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl"
                    >
                        Academy Videos
                    </h2>
                    <p className="mx-auto mt-3 max-w-[34rem] px-2 text-xs leading-5 text-slate-300 sm:px-0 sm:text-base sm:leading-6">
                        <span className="sm:hidden">Swipe to explore, tap a panel to play.</span>
                        <span className="hidden sm:inline">
                            Explore life, discipline and training in India&apos;s armed forces.
                        </span>
                    </p>
                </header>
                </ScrollReveal>

                <ScrollReveal animation="up" delay={100} duration={700}>
                <div className="relative">
                    <div
                        ref={videosTrackRef}
                        className="flex h-[320px] snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-2 [&::-webkit-scrollbar]:hidden sm:h-[380px] sm:gap-3 lg:h-[440px] lg:pb-2"
                        style={{ scrollbarWidth: "none" }}
                    >
                    {videos.map((video, index) => {
                        const isActive = activeVideoId === video.id;
                        const isPlaying = playingVideoId === video.id;

                        return (
                            <article
                                key={video.id}
                                aria-label={`${video.title} by ${video.source}`}
                                onMouseEnter={() => {
                                    setActiveVideoId(video.id);
                                }}
                                className={`group relative min-w-0 snap-start overflow-hidden rounded-2xl border bg-[#102A43] transition-[flex-basis,border-color,box-shadow] duration-500 ease-out sm:rounded-3xl ${
                                    isActive
                                        ? "flex-[0_0_68%] border-(--gold) shadow-[0_22px_60px_rgba(0,0,0,0.45)] lg:flex-[0_0_calc(54.3478%_-_19.565px)]"
                                        : "flex-[0_0_68%] border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.25)] lg:flex-[0_0_calc(15.2174%_-_5.478px)]"
                                }`}
                            >
                                {isPlaying ? (
                                    <iframe
                                        src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0${video.startSeconds ? `&start=${video.startSeconds}` : ""}`}
                                        title={video.title}
                                        className="absolute inset-0 h-full w-full bg-black"
                                        loading="eager"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => openVideo(video)}
                                        aria-label={`Play ${video.title} from ${video.source}`}
                                        className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-[#102A43] p-3 text-center transition-transform sm:p-5"
                                    >
                                        <Image
                                            src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                                            alt=""
                                            fill
                                            sizes="(max-width: 640px) 25vw, (max-width: 1280px) 25vw, 320px"
                                            quality={70}
                                            loading="lazy"
                                            fetchPriority="low"
                                            aria-hidden="true"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 bg-gradient-to-b from-[#07182B]/10 via-[#07182B]/35 to-[#07182B]/95"
                                        />
                                        <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-(--gold) text-white shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-110 sm:h-16 sm:w-16">
                                            <Play size={24} fill="currentColor" />
                                        </span>

                                        <span
                                            className={`relative z-10 min-w-0 ${
                                                isActive
                                                    ? "w-full"
                                                    : "hidden sm:block sm:[writing-mode:vertical-rl]"
                                            }`}
                                        >
                                            <span className="block truncate text-sm font-bold text-white sm:text-base">
                                                {video.title}
                                            </span>
                                            {isActive && (
                                                <span className="mt-1 block text-xs leading-5 text-white/75">
                                                    {video.source} · Click to watch
                                                </span>
                                            )}
                                        </span>

                                        {!isActive && (
                                            <span className="relative z-10 text-xs font-bold text-(--gold)">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                        )}
                                        {!isActive && (
                                            <span className="sr-only">{video.title}</span>
                                        )}
                                    </button>
                                )}
                            </article>
                        );
                    })}
                    </div>

                    {canScrollVideos && (
                        <>
                            <button
                                type="button"
                                onClick={() =>
                                    videosTrackRef.current?.scrollBy({
                                        left: -videosTrackRef.current.clientWidth * 0.7,
                                        behavior: "smooth",
                                    })
                                }
                                aria-label="Scroll videos left"
                                className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#07182B]/85 text-white shadow-lg backdrop-blur transition hover:bg-(--gold) sm:left-3 sm:flex"
                            >
                                <ArrowLeft size={20} aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    videosTrackRef.current?.scrollBy({
                                        left: videosTrackRef.current.clientWidth * 0.7,
                                        behavior: "smooth",
                                    })
                                }
                                aria-label="Scroll videos right"
                                className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#07182B]/85 text-white shadow-lg backdrop-blur transition hover:bg-(--gold) sm:right-3 sm:flex"
                            >
                                <ArrowRight size={20} aria-hidden="true" />
                            </button>
                        </>
                    )}
                </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
