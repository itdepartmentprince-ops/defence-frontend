"use client";

import { useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error("Page rendering error:", error);
        toast.error("Something went wrong. Please try again.");
    }, [error]);

    return (
        <main className="flex min-h-[60vh] items-center justify-center px-5 py-16">
            <section
                className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg"
                aria-labelledby="error-heading"
            >
                <h1
                    id="error-heading"
                    className="text-2xl font-bold text-(--navy)"
                >
                    This page could not be loaded
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    Please try again. If the problem continues, return to the
                    home page and try later.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                        type="button"
                        onClick={reset}
                        className="rounded-xl bg-(--navy) px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-(--navy) transition hover:bg-slate-50"
                    >
                        Go home
                    </Link>
                </div>
            </section>
        </main>
    );
}
