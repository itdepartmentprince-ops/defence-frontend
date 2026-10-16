
import "./globals.css";

import localFont from "next/font/local";
import { Navbar } from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import EnquiryModal from "@/components/common/EnquiryModal";
import { PhoneCall } from "lucide-react";
import Link from "next/link";
import Popup from "@/components/layouts/PopUp";
import { Toaster } from "react-hot-toast";
import VisitorTracker from "@/components/quiz/VisitorTracker";

// Fonts
const cinzel = localFont({
  src: "./fonts/Cinzel-Variable.woff2",
  variable: "--cinzel-fonts",
  weight: "400 900",
  display: "swap",
  preload: false,
  fallback: ["serif"],
});

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--inter-fonts",
  weight: "400 900",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
});

const montserrat = localFont({
  src: "./fonts/Montserrat-Variable.woff2",
  variable: "--montserrat-fonts",
  weight: "400 900",
  display: "swap",
  preload: false,
  fallback: ["sans-serif"],
});

// SEO Metadata
export const metadata = {
  metadataBase: new URL("https://www.princedefence.com"),
  title: "Prince Defence Academy | NDA, CDS & AFCAT Preparation",
  description:
    "Prepare for NDA, CDS and AFCAT with structured defence exam preparation, expert guidance and focused training.",
  openGraph: {
    title: "Prince Defence Academy | NDA, CDS & AFCAT Preparation",
    description:
      "Prepare for NDA, CDS and AFCAT with structured defence exam preparation, expert guidance and focused training.",
    url: "/",
    siteName: "Prince Defence Academy",
    type: "website",
  },
};

// 360 Degree Tour Icon
function Rotate360Icon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-12 w-12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top curved arrow */}
      <path
        d="M14 25 A20 20 0 0 1 47 20"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M41 14 L48 20 L41 24"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom curved arrow */}
      <path
        d="M50 39 A20 20 0 0 1 17 44"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M23 40 L16 44 L23 50"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 360 Degree Text */}
      <text
        x="32"
        y="35"
        textAnchor="middle"
        fill="white"
        fontSize="15"
        fontWeight="400"
      >
        360°
      </text>
    </svg>
  );
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cinzel.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">

        {/* Starting Popup */}

        <Popup/>

       {/* Floating Phone Button */}
<Link
  href="tel:+919610732222"
  aria-label="Call Prince Defence Academy"
  className="floating-gold-btn fixed bottom-6 left-4 z-50
    flex h-14 w-14 items-center justify-center
    rounded-full bg-(--green) text-white
    sm:bottom-8 sm:left-6 sm:h-16 sm:w-16"
>
  <PhoneCall size={22} className="text-white" />
</Link>

{/* Floating 360 Tour Button */}
<Link
  href="https://tour.princeeduhub.com/princt34/prince-defence/"
  aria-label="Explore 360 degree virtual tour"
  className="floating-gold-btn fixed bottom-6 right-4 z-50
    flex h-14 w-14 items-center justify-center
    rounded-full bg-(--gold) text-white
    sm:bottom-8 sm:right-6 sm:h-16 sm:w-16"
>
  <Rotate360Icon />
</Link>

        <VisitorTracker />
        <Navbar />
        <EnquiryModal />

        {/* Main Content */}
        <main className="w-full flex-1">
          {children}
        </main>

        <Footer />
         <Toaster position="top-right" />

      </body>
    </html>
  );
}