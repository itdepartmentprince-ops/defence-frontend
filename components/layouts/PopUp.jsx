// EnquiryPopup.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EnquireButton from "../common/EnquireButton";

export default function EnquiryPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 15000);
    const closePopup = () => setShow(false);

    window.addEventListener("open-Enquiry-modal", closePopup);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-Enquiry-modal", closePopup);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={() => setShow(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-lg bg-[#f7f6f2] shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          aria-label="Close popup"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#22301f] hover:bg-white"
        >
          ✕
        </button>

        {/* Image */}
        <div className="relative h-48 w-full sm:h-56">
          <Image
            src="/images/campusbg-2.webp"
            alt="Prince Defence Academy Admissions Open"
            fill
             loading="eager"
            quality={40}
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
          />
        </div>

        {/* Gold divider */}
        <div className="h-1 w-full bg-gradient-to-r from-[#8a6d2f] via-[#c9a54a] to-[#8a6d2f]" />

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="font-serif text-xl text-[#20241f]">
            Admissions Open 2026
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#4a4738]">
            Join Prince Defence Academy and start your journey towards Navy,
            
            Army, and other Defence exams. Limited seats available!
          </p>

          
       <EnquireButton     
            className="mt-5 group inline-flex rounded-md bg-(--gold) px-6 py-2.5 text-sm font-medium text-white hover:shadow-[0_10px_25px_-5px_rgba(34,48,31,0.5)] transition"
            onClick={()=>{setShow(false)}}
          >
            Enquiry Now
          </EnquireButton>

         
        </div>
      </div>
    </div>
  );
}
