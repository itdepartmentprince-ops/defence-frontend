"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ContactForm from "../common/ContactForm";

export default function EnquiryModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const openModal = () => setIsOpen(true);
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("open-Enquiry-modal", openModal);
        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("open-Enquiry-modal", openModal);
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/70 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-10"
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry form"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    setIsOpen(false);
                }
            }}
        >
            <div className="relative mx-auto w-full max-w-xl">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close Enquiry form"
                    className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--navy) shadow-md transition hover:rotate-90 hover:bg-slate-100"               
                >
                    <X size={21} />
                </button>

                <ContactForm
                    theme="light"
                    size="md"
                    title="Start Your Enquiry"
                    onSuccess={() => {
                        window.setTimeout(() => setIsOpen(false), 2000);
                    }}
                />
            </div>
        </div>
    );
}
