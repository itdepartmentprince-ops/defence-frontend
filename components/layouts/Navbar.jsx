
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
    Menu,
    X,
    ArrowRight,
    Phone,
} from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Quiz", href: "/quiz" },
    { name: "Facilities", href: "/facilities" },
    { name: "Results", href: "/results" },
    { name: "Achievers", href: "/achievers" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blogs", href: "/blog" },
    { name: "News", href: "/news" },
    { name: "Contact", href: "/contact" },

];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScroll, setIsScroll] = useState(true);

    const menuRef = useRef(null);
    const pathname = usePathname();

    // Check current active page
    const isActive = (href) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    // Close menu on outside click and Escape
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const closeMenu = () => {
        setIsOpen(false);
    };

    // Navbar scroll handling
    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY <= 50);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            ref={menuRef}
            className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-8"
        >
            {/* TOP NAVBAR / ANNOUNCEMENT */}
            <div
                className={`overflow-hidden whitespace-nowrap
                    text-white text-sm py-1
                    transition-all duration-300
                    ${isScroll
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
            >
                <div className="animate-sequential-scroll gap-4 text-center font-medium py-1 px-2">
                    <span
                        className="font-bold text-(--gold)"
                    >
                        📌 Turn Your Defence Dream into Reality, Join
                        Prince Defence Academy | Limited Seats
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Total Selections : 3965
                    </span>
                </div>
            </div>

            {/* MAIN NAVBAR */}
            <nav
                className="
                    glass mx-auto flex max-w-full items-center
                    justify-between gap-2 rounded-2xl px-3 py-2.5
                    sm:px-4 lg:gap-3 xl:px-5
                "
                aria-label="Main navigation"
            >
                {/* LOGO */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex shrink-0 items-center gap-2 xl:gap-3"
                    aria-label="Defence Academy Home"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                        <Image
                            src="/images/PrinceDefenceLogo.webp"
                            alt="Prince Defence Academy Logo"
                            width={40}
                            height={40}
                            className="rounded-xl object-cover"
                        />
                    </div>

                    <div>
                        <p
                            className="
                                cinzel text-xs font-extrabold
                                tracking-normal text-(--navy)
                                xl:text-sm xl:tracking-wide
                                2xl:text-base
                            "
                        >
                            PRINCE DEFENCE ACADEMY
                        </p>

                        <p
                            className="
                                text-[7px] font-medium
                                tracking-[0.08em]
                                text-(--muted)
                                hidden whitespace-nowrap lg:block
                                xl:text-[8px] xl:tracking-[0.12em]
                                2xl:text-[9px] 2xl:tracking-[0.16em]
                                text-center
                            "
                        >
                            DISCIPLINE • DEDICATION • SUCCESS
                        </p>
                    </div>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden min-w-0 items-center gap-1 xl:flex 2xl:gap-3">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                aria-current={active ? "page" : undefined}
                                className={`
                                    whitespace-nowrap rounded-xl px-2 py-2
                                    text-xs font-medium inter
                                    px-2.5 text-sm 2xl:px-3 2xl:text-base
                                    transition-all duration-200

                                    ${active
                                        ? "bg-(--gold) text-white shadow-md shadow-(--gold)/20"
                                        : "text-(--foreground) hover:bg-(--gold) hover:text-white"
                                    }
                                `}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* DESKTOP CTA */}
                <Link
                    href="/contact"
                    className="gold-shimmer-cta group relative isolate
                        hidden shrink-0 items-center gap-1.5
                        xl:flex
                        rounded-xl bg-(--gold)
                        px-3 py-2.5 text-xs font-semibold
                        text-white shadow-sm
                        transition duration-300
                        hover:-translate-y-0.5
                        hover:shadow-lg
                        2xl:gap-2 2xl:px-4 2xl:text-sm
                        2xl:text-base
                    "
                >
                    <span
                        aria-hidden="true"
                        className="gold-cta-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
                    />
                    <span className="relative">Enquire Now</span>
                    <ArrowRight
                        size={16}
                        strokeWidth={2}
                        className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                </Link>

                {/* MOBILE MENU BUTTON */}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl border border-(--glass-border)
                        bg-white/50 text-(--navy)
                        backdrop-blur-md transition-colors
                        hover:bg-white/80 xl:hidden
                    "
                    aria-label={
                        isOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={isOpen}
                    aria-controls="mobile-navigation"
                >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                        <Menu
                            size={22}
                            strokeWidth={2}
                            className={`
                                absolute transition-all duration-200
                                ${isOpen
                                    ? "rotate-90 scale-0 opacity-0"
                                    : "rotate-0 scale-100 opacity-100"
                                }
                            `}
                        />

                        <X
                            size={22}
                            strokeWidth={2}
                            className={`
                                absolute transition-all duration-200
                                ${isOpen
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "-rotate-90 scale-0 opacity-0"
                                }
                            `}
                        />
                    </span>
                </button>

                {/* MOBILE MENU */}
                <div
                    id="mobile-navigation"
                    className={`
                        absolute left-0 right-0 top-[calc(100%+10px)]
                        origin-top px-1 transition-all duration-200
                        xl:hidden
                        ${isOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-2 opacity-0"
                        }
                    `}
                >
                    <div className="rounded-2xl bg-[rgba(255,255,255,0.95)] p-3 shadow-xl backdrop-blur-xl">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={closeMenu}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={`
                                            rounded-xl px-4 py-3
                                            text-base font-semibold
                                            border-b border-b-(--gold)
                                            transition-all duration-200

                                            ${active
                                                ? "bg-(--gold) text-white shadow-sm"
                                                : "text-(--navy) hover:bg-(--gold) hover:text-white"
                                            }
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <div className="my-2 h-px bg-slate-200/70" />

                            {/* MOBILE CTA */}
                            <Link
                                href="/contact"
                                onClick={closeMenu}
                                className="gold-shimmer-cta group relative isolate
                                    flex items-center justify-center gap-2
                                    rounded-xl bg-(--gold)
                                    px-4 py-3 text-sm font-semibold
                                    text-white shadow-sm transition duration-300
                                    hover:-translate-y-0.5 hover:shadow-lg
                                "
                            >
                                <span
                                    aria-hidden="true"
                                    className="gold-cta-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
                                />
                                <Phone
                                    size={16}
                                    strokeWidth={2}
                                    className="relative"
                                />
                                <span className="relative">Enquire Now</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};