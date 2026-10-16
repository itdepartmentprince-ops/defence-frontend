"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function EnquireButton({
    children = "Enquire Now",
    variant = "arrow",
    className = "",
    onClick,
}) {
    const Icon = variant === "right" ? ArrowRight : ArrowUpRight;

    const openModal = () => {
        window.dispatchEvent(new CustomEvent("open-Enquiry-modal"));
        onClick?.();
    };

    return (
        <button
            type="button"
            onClick={openModal}
            className={className}
        >
            {children}
            <Icon
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
            />
        </button>
    );
}
