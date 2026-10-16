
"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "../animations/ScrollReveal";





const SCRIPT_URL =
  "https://app.coachingsinsikar.com/embed/reviews.js";

const GOOGLE_URL = "https://share.google/ci1XBgkfweJLeCgqq";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.7a14.5 14.5 0 010-9.4l-7.9-6.1a24 24 0 000 21.6l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

function ReviewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-2.5 w-16 animate-pulse rounded bg-gray-100" />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-2.5 animate-pulse rounded bg-gray-100" />
            <div className="h-2.5 animate-pulse rounded bg-gray-100" />
            <div className="h-2.5 w-2/3 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GoogleReviews({
  title = "Google Reviews",
  googleUrl = GOOGLE_URL,
}) {
  const widgetRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;

    let active = true;
    let timeout;
    let observer;

    const checkWidget = () => {
      if (!active) return;

      const hasContent =
        widget.childElementCount > 0 ||
        widget.textContent.trim().length > 0;

      if (hasContent) {
        setLoaded(true);
        setFailed(false);
        clearTimeout(timeout);
        observer?.disconnect();
      }
    };

    observer = new MutationObserver(checkWidget);

    observer.observe(widget, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const handleScriptError = () => {
      if (active) setFailed(true);
    };

    let script = document.querySelector(
      `script[src="${SCRIPT_URL}"]`
    );

    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.addEventListener("error", handleScriptError);
      document.body.appendChild(script);
    } else {
      script.addEventListener("error", handleScriptError);
    }

    timeout = setTimeout(() => {
      if (active) setFailed(true);
    }, 12000);

    checkWidget();

    return () => {
      active = false;
      clearTimeout(timeout);
      observer?.disconnect();
      script?.removeEventListener("error", handleScriptError);
    };
  }, []);

  return (
    <section
      aria-labelledby="google-reviews-title"
      className="bg-white px-4 py-6 sm:px-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm">
              <GoogleIcon />
            </div>

            <div className="min-w-0">
              <h2
                id="google-reviews-title"
                className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
              >
                {title}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                Feedback from our students and visitors
              </p>
            </div>
          </div>

          {googleUrl && (
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-2 text-xs font-semibold text-gray-800 transition hover:border-gray-400 hover:bg-gray-50 sm:text-sm"
            >
              View all
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M11 3a1 1 0 100 2h2.6l-6.3 6.3a1 1 0 101.4 1.4L15 6.4V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          )}
        </header>

        <div className="relative w-full min-w-0">
          {!loaded && !failed && (
            <div
              className="absolute inset-0 z-10 overflow-hidden bg-white"
              aria-hidden="true"
            >
              <ReviewSkeleton />
            </div>
          )}

          {failed && !loaded && (
            <div className="absolute inset-x-0 top-0 z-20 flex flex-col items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                Reviews are temporarily unavailable.
              </p>

              {googleUrl && (
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-700 hover:underline"
                >
                  Read reviews on Google
                </a>
              )}
            </div>
          )}

          <div className="h-[480px] w-full min-w-0 md:h-[400px]">
            <div
              id="google-reviews-widget"
              ref={widgetRef}
              data-location="accounts/113869565307694473678/locations/1004355570809401037"
              data-theme="light"
              data-layout="carousel"
              data-min-rating="4"
              data-hide-header="false"
              data-height="480px"
              className="h-[480px] w-full min-w-0 md:h-[400px] [&>iframe]:!h-[480px] [&>iframe]:!max-h-[480px] md:[&>iframe]:!h-[400px] md:[&>iframe]:!max-h-[400px]"
            />
          </div>
        </div>
      </div>
       
    </section>
  );
}
