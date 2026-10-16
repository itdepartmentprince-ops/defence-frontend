"use client";

import {
    ArrowUpRight,
    Send,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { createContact } from "@/services/contactService";

const themeStyles = {
    light: {
        wrapper:
            "border border-slate-200 bg-white text-(--navy) shadow-xl shadow-slate-900/5",
        input:
            "border-slate-300 bg-white focus:border-(--green)",
        icon:
            "border-(--gold)/30 bg-(--gold)/10 text-(--gold)",
    },

    glass: {
        wrapper:
            "glass-card border-white/70 bg-white/70 text-white shadow-2xl shadow-slate-900/10",
        input:
            "border-slate-300/70 bg-white focus:border-(--green)",
        icon:
            "border-(--gold)/30 bg-(--gold)/10 text-(--gold)",
    },

    dark: {
        wrapper:
            "border border-white/10 bg-(--navy) text-white shadow-2xl shadow-black/20",
        input:
            "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-(--gold)",
        icon:
            "border-(--gold)/30 bg-(--gold)/10 text-(--gold)",
    },
};

const sizeStyles = {
    sm: {
        wrapper: "max-w-lg p-5 sm:p-6",
        title: "text-xl sm:text-2xl",
        input: "px-3.5 py-2.5 text-sm",
    },

    md: {
        wrapper: "max-w-xl p-6 sm:p-8",
        title: "text-2xl sm:text-3xl",
        input: "px-4 py-3 text-sm",
    },

    lg: {
        wrapper: "max-w-2xl p-7 sm:p-10",
        title: "text-3xl sm:text-4xl",
        input: "px-4 py-3.5 text-sm",
    },
};

export default function ContactForm({
    action = "",
    method = "POST",
    theme = "glass",
    size = "md",
    title = "Send an Enquiry",
    description = "Fill in your details and our team will get in touch.",
    buttonText = "Submit Enquiry",
    id,
    onSuccess,
}) {
    const themeClass =
        themeStyles[theme] || themeStyles.glass;

    const sizeClass =
        sizeStyles[size] || sizeStyles.md;

    const inputClass = `
        w-full rounded-xl border outline-none
        text-(--navy)
        placeholder:text-slate-400
        transition-colors duration-200
        focus:ring-2 focus:ring-(--green)/10
        ${themeClass.input}
        ${sizeClass.input}
    `;

    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const submitButton = form.querySelector(
            'button[type="submit"]'
        );

        try {
            if (submitButton) {
                submitButton.disabled = true;
            }

            const formData = new FormData(form);

            const contactData = {
                name: formData.get("name")?.trim(),
                number: formData.get("phone")?.trim(),
                course: formData.get("course")?.trim(),
                message: formData.get("message")?.trim(),
            };

            if (action) {
                const response = await fetch(action, {
                    method,
                    body: formData,
                });

                let data = null;

                const contentType =
                    response.headers.get(
                        "content-type"
                    );

                if (
                    contentType?.includes(
                        "application/json"
                    )
                ) {
                    data = await response.json();
                }

                if (!response.ok) {
                    throw new Error(
                        data?.message ||
                            "Form submission failed"
                    );
                }
            } else {
                await createContact(contactData);
            }

            toast.success(
                "Your enquiry has been submitted successfully!"
            );

            form.reset();

            onSuccess?.();
        } catch (error) {
            console.error(
                "Contact form submission error:",
                error
            );

            toast.error(
                error?.message ||
                    "Something went wrong. Please try again."
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    }

    return (
        <div
            id={id}
            className={`
                relative isolate w-full overflow-hidden rounded-3xl
                ${themeClass.wrapper}
                ${sizeClass.wrapper}
            `}
        >
            {/* Small decorative glow */}
            {theme === "glass" && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-20 -z-10 h-48 w-48 rounded-full bg-(--gold)/15 blur-3xl"
                />
            )}

            {/* Header */}
            <header className="mb-7">
                <div
                    aria-hidden="true"
                    className={`
                        mb-4 flex h-11 w-11 items-center justify-center
                        rounded-xl border
                        ${themeClass.icon}
                    `}
                >
                    <Send size={20} />
                </div>

                <h2
                    className={`
                        font-(--font-montserrat)
                        font-extrabold tracking-tight
                        ${sizeClass.title}
                    `}
                >
                    {title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-(--gold)">
                    {description}
                </p>
            </header>

            {/* Form */}
            <form
                action={action || undefined}
                method={method}
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Name + Phone */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="contact-name"
                            className="mb-2 block text-sm font-medium"
                        >
                            Full Name{" "}
                            <span aria-hidden="true">*</span>
                        </label>

                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            autoComplete="name"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="contact-phone"
                            className="mb-2 block text-sm font-medium"
                        >
                            Phone Number{" "}
                            <span aria-hidden="true">*</span>
                        </label>

                        <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            placeholder="Your phone"
                            autoComplete="tel"
                            required
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Course */}
                <div>
                    <label
                        htmlFor="contact-course"
                        className="mb-2 block text-sm font-medium"
                    >
                        Interested Course
                    </label>

                    <select
                        id="contact-course"
                        name="course"
                        defaultValue=""
                        className={inputClass}
                    >
                        <option value="" disabled>
                            Select a course
                        </option>

                        <option value="NDA">
                            NDA
                        </option>

                        <option value="AFCAT">
                            AIRFORCE
                        </option>

                        <option value="Army">
                            Army
                        </option>

                        <option value="Navy">
                            Navy
                        </option>

                        <option value="SSC">
                            SSC
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>

                {/* Message */}
                <div>
                    <label
                        htmlFor="contact-message"
                        className="mb-2 block text-sm font-medium"
                    >
                        Your Message{" "}
                        <span aria-hidden="true">*</span>
                    </label>

                    <textarea
                        id="contact-message"
                        name="message"
                        rows={2}
                        placeholder="Write your Enquiry..."
                        required
                        className={`${inputClass} resize-y`}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="
                        group flex w-full items-center justify-center gap-2
                        rounded-xl bg-(--gold) px-5 py-3.5
                        text-sm font-bold text-white
                        transition-all duration-200
                        hover:bg-(--navy)
                        hover:-translate-y-0.5
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {buttonText}

                    <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="
                            transition-transform duration-200
                            group-hover:translate-x-1
                            group-hover:-translate-y-1
                        "
                    />
                </button>

                <p className="text-center text-xs text-(--gold)">
                    Your information is used only to respond
                    to your Enquiry.
                </p>
            </form>
        </div>
    );
}