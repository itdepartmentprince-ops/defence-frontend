"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { API_URL, apiRequest } from "@/services/api";

const VISITOR_STORAGE_KEY = "pd_visitor_id";

const getOrCreateId = (storage, key) => {
  let id = storage.getItem(key);
  if (!id) {
    id = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    storage.setItem(key, id);
  }
  return id;
};

export default function VisitorTracker() {
  const pathname = usePathname();
  const lastPathRef = useRef("");

  useEffect(() => {
    if (!pathname || typeof window === "undefined" || !API_URL || lastPathRef.current === pathname) {
      return;
    }

    if (/^\/admin(?:\/|$)/i.test(pathname)) {
      return;
    }

    if (/bot|crawl|spider|slurp/i.test(navigator.userAgent)) {
      return;
    }

    lastPathRef.current = pathname;
    const visitorId = getOrCreateId(window.localStorage, VISITOR_STORAGE_KEY);
    const landingPage = window.sessionStorage.getItem("pd_landing_page") || pathname;
    if (!window.sessionStorage.getItem("pd_landing_page")) {
      window.sessionStorage.setItem("pd_landing_page", pathname);
    }

    const payload = {
      visitorId,
      path: pathname,
      referrer: document.referrer || "",
      landingPage,
      device: /iPad|Tablet/i.test(navigator.userAgent)
        ? "tablet"
        : /Mobi|Android|iPhone/i.test(navigator.userAgent)
          ? "mobile"
          : "desktop",
      browser: navigator.userAgent.slice(0, 80),
      os: navigator.platform || "unknown",
      country: "",
      utm: Object.fromEntries(
        [...new URLSearchParams(window.location.search).entries()]
          .filter(([key]) => key.startsWith("utm_"))
          .map(([key, value]) => [key, value.slice(0, 100)])
      ),
    };

    const timer = window.setTimeout(() => {
      apiRequest("/analytics/track", {
        method: "POST",
        keepalive: true,
        body: JSON.stringify(payload),
      }).catch(() => {});
    }, 180);

    return () => {
      window.clearTimeout(timer);
      if (lastPathRef.current === pathname) lastPathRef.current = "";
    };
  }, [pathname]);

  return null;
}
