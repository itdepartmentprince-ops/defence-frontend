"use client";

import { useEffect, useMemo, useState } from "react";

export function getBlogHeadings(content = []) {
    if (!Array.isArray(content)) return [];

    return content
        .map((block, index) => {
            if (
                !block ||
                block.type !== "heading" ||
                !Array.isArray(block.content)
            ) {
                return null;
            }

            const text = block.content
                .map((item) => item?.text || "")
                .join("")
                .trim();

            return text ? { id: `blog-heading-${index}`, text } : null;
        })
        .filter(Boolean);
}

export default function useActiveBlogHeading(content) {
    const headings = useMemo(() => getBlogHeadings(content), [content]);
    const [activeId, setActiveId] = useState(headings[0]?.id || "");

    useEffect(() => {
        const headingElements = headings
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        if (!headingElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleHeadings = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            first.boundingClientRect.top -
                            second.boundingClientRect.top
                    );

                if (visibleHeadings[0]) {
                    setActiveId(visibleHeadings[0].target.id);
                }
            },
            {
                rootMargin: "-20% 0px -65% 0px",
                threshold: 0,
            }
        );

        headingElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [headings]);

    return {
        headings,
        activeHeading: headings.find(({ id }) => id === activeId) || headings[0],
        activeId,
    };
}
