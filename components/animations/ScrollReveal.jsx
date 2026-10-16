"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
    children,
    animation = "up",
    delay = 0,
    duration = 700,
    distance = 40,
    className = "",
    once = true,
}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (
            reduceMotion ||
            typeof IntersectionObserver === "undefined"
        ) {
            const frameId = requestAnimationFrame(() => setVisible(true));
            return () => cancelAnimationFrame(frameId);
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);

                    if (once) {
                        observer.unobserve(element);
                    }
                } else if (!once) {
                    setVisible(false);
                }
            },
            {
                threshold: 0.05,
                rootMargin: "0px 0px -40px 0px",
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [once]);

    const getTransform = () => {
        if (visible) {
            return "translate3d(0, 0, 0)";
        }

        switch (animation) {
            case "up":
                return `translate3d(0, ${distance}px, 0)`;

            case "down":
                return `translate3d(0, -${distance}px, 0)`;

            case "left":
                return `translate3d(${distance}px, 0, 0)`;

            case "right":
                return `translate3d(-${distance}px, 0, 0)`;

            case "zoom":
                return "scale(0.94)";

            case "up-zoom":
                return `translate3d(0, ${distance}px, 0) scale(0.96)`;

            default:
                return `translate3d(0, ${distance}px, 0)`;
        }
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: getTransform(),
                transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1),
                             transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}