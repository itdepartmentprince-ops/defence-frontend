import Image from "next/image";
import { Globe, Mail, MessageCircle, PhoneCall, Send } from "lucide-react";

const galleryImages = [
    { src: "/images/sport03.webp", alt: "Students posing together" },
    { src: "/images/event-01.webp", alt: "Academy event" },
    { src: "/images/vedio-labirary04.webp", alt: "Defence training" },
];

//  bg-gradient-to-r from-[#2fc96d] via-[#31c76c] to-[#1ca35a]


export default function GalleryHero() {
    return (
        <section className="relative overflow-hidden mt-5 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-full">
                <div className="relative overflow-hidden rounded-[2px] bg-[#F0F3F8] px-4 py-6 shadow-lg sm:px-6 lg:px-8 lg:py-7 rounded-xl">
                    <div className="absolute -left-20 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-gradient-to-bl from-[#192AB6] via-[#90CAF9] to-[#E3F2FD] sm:-left-16 sm:h-40 sm:w-40 lg:-left-40 lg:h-60 lg:w-60" />
                    <div className="absolute -right-20 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#192AB6] via-[#90CAF9] to-[#E3F2FD] sm:-right-16 sm:h-40 sm:w-40 lg:-right-40 lg:h-60 lg:w-60" />

                    <div className="relative flex flex-col gap-3 lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-center">
                        <div className="relative z-10 order-1 py-2 text-center text-center lg:text-left lg:order-1 lg:py-4 lg:pl-20">
                            <div className="mb-4 flex items-center justify-center gap-3 text-[#1f5c3b] lg:justify-start">
                                <span className="text-[18px] text-(--gold) tracking-[0.14em] uppercase sm:text-[22px]">OUR GALLERY</span>
                            </div>

                            <h1 className="text-3xl font-black leading-[0.9] tracking-[-0.08em] text-(--navy) uppercase sm:text-4xl lg:text-5xl">
                                Moments That
                                <span className="mt-2 block text-[#3B6CD1]">Inspire</span>
                            </h1>

                            <p className="mx-auto mt-4 max-w-lg text-xs leading-5 lg:leading-6 text-[#4e4e4e] mx-auto lg:mx-0 sm:text-base">
                                Explore campus life, training activities,
                                events and achievements at Prince Defence Academy.
                            </p>
                        </div>

                        <div className="relative z-10 order-2 flex min-h-[250px] items-center justify-center lg:min-h-[420px]">
                            <div className="relative flex h-[240px] w-full max-w-[460px] items-center justify-center sm:h-[300px] lg:h-[390px]">
                                <div className="absolute left-[0%] top-[50%] h-[140px] w-[140px] -translate-y-1/2 overflow-hidden rounded-full border-[5px] border-[#f3f3f3] bg-[#d9d7d3] shadow-lg sm:left-[0%] sm:h-[180px] sm:w-[180px] lg:left-[0%] lg:h-[220px] lg:w-[220px]">
                                    <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill sizes="220px" quality={100} className="object-cover" />
                                </div>

                                <div className="absolute z-10 left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[5px] border-[#f3f3f3] bg-[#d9d7d3] shadow-lg sm:h-[210px] sm:w-[210px] lg:h-[270px] lg:w-[270px]">
                                    <Image src={galleryImages[1].src} alt={galleryImages[1].alt} fill sizes="270px" quality={100} className="object-cover" />
                                </div>

                                <div className="absolute right-[0%] top-[50%] h-[140px] w-[140px] -translate-y-1/2 overflow-hidden rounded-full border-[5px] border-[#f3f3f3] bg-[#d9d7d3] shadow-lg sm:right-[0%] sm:h-[180px] sm:w-[180px] lg:right-[0%] lg:h-[220px] lg:w-[220px]">
                                    <Image src={galleryImages[2].src} alt={galleryImages[2].alt} fill sizes="220px" quality={100} className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}