import Link from "next/link";
import Image from "next/image";
import {
    MapPin,
    Phone,
    Mail,
    ArrowUpRight,
    Send,
    ShieldCheck,
    ChevronRight,
} from "lucide-react";

import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";



const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "All Courses", href: "/courses" },
    {name:"Achievers", href:"/achievers"},
    { name: "Facilities", href: "/facilities" },
    { name: "Results", href: "/results" },
    { name: "Gallery", href: "/gallery " },
    { name: "Blogs", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
];

const courses = [
    { name: "NDA", href: "/courses/nda-application-form-2019" },
    { name: "Navy", href: "/courses/indian-navy-ssr-eligibility" },
    { name: "Army", href: "/courses/indian-army-selection-process" },
    { name: "Air Force", href: "/courses/indian-air-force-airmen-eligibility" },
    { name: "SSC", href: "/courses/ssc-selection-process" },
];

const socials = [
    {
        name: "FaFacebook",
        href: "https://www.facebook.com/PrinceEduHubSikar/",
        icon: FaFacebook,
    },
    {
        name: "FaInstagram",
        href: "https://www.instagram.com/prince_nda_academy_/?hl=en",
        icon: FaInstagram,
    },
    {
        name: "FaYoutube ",
        href: "https://www.youtube.com/@Prince_NDA_academy",
        icon: FaYoutube,
    },

    {
        name: "FaWhatsapp",
        href: "https://wa.me/919610732222",
        icon: FaWhatsapp,
    }
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden  bg-gradient-to-br
  from-[#000825]
  via-[#071943]
  to-[#001D87] text-white">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 rounded-full bg-(--green)/20 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-(--gold)/10 blur-[100px]" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

                {/* CTA Section */}
                <div className="flex flex-col gap-5 border-b border-white/10 py-10 sm:py-12 md:flex-row md:items-center md:justify-between">

                    <div className="max-w-2xl">
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-(--gold)/30 bg-(--gold)/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-(--gold)">
                            <ShieldCheck size={14} />
                            Shape Your Future
                        </span>

                        <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                            Your Defence Dream
                            <span className="text-(--gold)"> Starts Here.</span>
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
                            Join Prince Defence Academy and take the next step
                            towards your dream career.
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-xl bg-(--gold) px-5 py-3 text-sm font-bold text-[#071b16] transition hover:bg-white"
                    >
                        Enquire Now
                        <ArrowUpRight
                            size={18}
                            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </Link>
                </div>

                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-10 lg:py-16">

                    {/* Academy Info */}
                    <div className="lg:col-span-4">

                        <Link href="/" className="inline-flex items-center gap-3">
                            <Image
                                src="/logos/mainLogo.png"
                                alt="Prince Defence Academy logo"
                                width={48}
                                height={48}
                                className="h-12 w-12 rounded-xl object-contain"
                            />

                            <div>
                                <h3 className="text-lg font-extrabold tracking-wide">
                                    PRINCE DEFENCE  <br/> ACADEMY
                                </h3>
                               
                                    
                                
                            </div>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                            Established in 2011, Prince Defence Academy provides
                            guidance and preparation for defence and competitive
                            examinations, helping students work towards their
                            career goals.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-6 flex items-center gap-3">
                            {socials.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social?.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:border-(--gold) hover:bg-(--gold) hover:text-[#071b16]"
                                    >
                                        <Icon size={18} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col-2 gap-20 lg:col-span-4 lg:flex-row lg:gap-30">
                        {/* Quick Links */}
                        <div className="lg:col-span-2">
                            <h4 className="mb-5 text-base font-bold">
                                Quick Links
                            </h4>

                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group flex w-fit items-center gap-2 text-sm text-white/60 transition hover:text-(--gold)"
                                        >
                                            <ChevronRight
                                                size={15}
                                                className="text-(--gold) transition-transform group-hover:translate-x-1"
                                            />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Courses */}
                        <div className="lg:col-span-2">
                            <h4 className="mb-5 text-base font-bold">
                                Our Courses
                            </h4>

                            <ul className="space-y-3">
                                {courses.map((course) => (
                                    <li key={course.name}>
                                        <Link
                                            href={course.href}
                                            className="group flex w-fit items-center gap-2 text-sm text-white/60 transition hover:text-(--gold)"
                                        >
                                            <ChevronRight
                                                size={15}
                                                className="text-(--gold) transition-transform group-hover:translate-x-1"
                                            />
                                            {course.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Details */}
                    <div className="lg:col-span-4">
                        <h4 className="mb-5 text-base font-bold">
                            Get In Touch
                        </h4>

                        <div className="space-y-5">

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--gold)/10 text-(--gold)">
                                    <MapPin size={19} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">Our Location</p>
                                    <p className="mt-1 text-sm leading-6 text-white/60">
                                        Prince Defence Academy
                                        Palwas Rd, Sikar, Palwas, Rajasthan 332042, India
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--gold)/10 text-(--gold)">
                                    <Phone size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">Call Us</p>
                                    <Link
                                        href="tel:+919610732222"
                                        className="mt-1 block text-sm text-white/60 transition hover:text-(--gold)"
                                    >
                                        +91 9610-73-2222
                                    </Link>
                                    <Link
                                        href="tel:+919610742222"
                                        className="mt-1 block text-sm text-white/60 transition hover:text-(--gold)"
                                    >
                                        +91 9610-74-2222
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-(--gold)/10 text-(--gold)">
                                    <Mail size={18} />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-semibold">Email Us</p>
                                    <Link
                                        href="mailto:pdasikar@gmail.com"
                                        className="mt-1 block break-all text-sm text-white/60 transition hover:text-(--gold)"
                                    >
                                        pdasikar@gmail.com
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center sm:flex-row sm:text-left">

                    <p className="text-xs leading-5 text-white/50 sm:text-sm">
                        Copyright © 2011 - {new Date().getFullYear()} All Rights Reserved  <Link href="/" className="hover:text-(--gold)">
                            @Prince Defence Academy
                        </Link>
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/50 sm:gap-6 sm:text-sm">
                        <Link
                            href="/privacy-policy"
                            className="transition hover:text-(--gold)"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms-and-conditions"
                            className="transition hover:text-(--gold)"
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}