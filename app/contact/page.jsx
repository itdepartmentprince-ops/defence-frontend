import {
    MapPin,
    Phone,
    Mail,
    ArrowUpRight,
    Navigation,
    MessageCircle,
} from "lucide-react";

import Link from "next/link";
import ContactForm from "@/components/common/ContactForm";
import EnquireButton from "@/components/common/EnquireButton";
import ScrollReveal from "@/components/animations/ScrollReveal";
import WhatsAppChannelCard from "@/components/layouts/WhatsAppChannelCard";

export const metadata = {
    title: "Contact Prince Defence Academy",
    description:
        "Contact Prince Institute for course enquiries, admissions and career guidance. Find our location and get directions on Google Maps.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact Prince Institute",
        description:
            "Get in touch with Prince Institute for admissions and course enquiries.",
        url: "/contact",
        type: "website",
    },
};


const INSTITUTE_ADDRESS =
    "Prince Defence Academy, Palwas Rd, Sikar, Palwas, Rajasthan 332042, India";

const MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=Prince%20Defence%20Academy%2C%20Palwas%20Rd%2C%20Sikar%2C%20Palwas%2C%20Rajasthan%20332042%2C%20India";

const MAP_EMBED_URL =
    "https://maps.google.com/maps?q=Prince%20Defence%20Academy%2C%20Palwas%20Rd%2C%20Sikar%2C%20Palwas%2C%20Rajasthan%20332042%2C%20India&z=16&output=embed";


const contactCards = [
    {
        icon: Phone,
        title: "Call Us",
        value: "+91 96107 42222",
        href: "tel:+919610742222",
    },
    {
        icon: Mail,
        title: "Email Us",
        value: "pdasikar@gmail.com",
        href: "mailto:pdasikar@gmail.com",
    },
];

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-[#000825]">

            {/* HERO SECTION */}
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#000825] via-[#001D87] to-[#002CCD] px-4 py-20 text-white sm:py-24 lg:py-32">

                {/* BACKGROUND GLOW */}
                <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />

                <ScrollReveal animation="right" delay={40} duration={300}>
                    <div className="mx-auto max-w-7xl">

                        <span className="inline-flex mt-15 sm:mt-10  lg:mt-5 items-center gap-3 text-xs font-bold tracking-[0.25em] text-[#D4AF37]">
                            <span className="h-[2px] w-8 bg-[#D4AF37]" />
                            GET IN TOUCH
                        </span>

                        <h1 className="mt-6 max-w-3xl text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-5xl">
                            Let&apos;s Start Your

                            <span className="block text-(--gold)">
                                Success Journey
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
                            Have questions about courses, admissions,
                            or career guidance? Our team is here to help
                            you take the next step toward your future.
                        </p>

                        <EnquireButton
                            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-(--gold) px-6 py-3.5 text-sm font-bold text-(--navy) transition-colors hover:bg-(--white)"
                        >
                            Contact Our Team
                        </EnquireButton>

                    </div>
                </ScrollReveal>
            </section>


            {/* CONTACT DETAILS SECTION */}
            <section

                className="px-4 py-16 sm:py-20 lg:py-24"
            >
                <div className="mx-auto max-w-7xl">

                    {/* SECTION HEADING */}

                    <ScrollReveal animation="up-zoom" delay={40} duration={500} >
                        <div className="mx-auto mb-12 max-w-2xl text-center">

                            <span className="text-xs lg:text-sm font-bold tracking-[0.2em] text-(--green) montserrat uppercase">
                                CONTACT INFORMATION
                            </span>

                            <h2 className="mt-4 text-3xl font-extrabold text-(--navy) sm:text-4xl montserrat">
                                We’d Love to{" "}
                                <span className="text-(--gold)">
                                    Hear From You
                                </span>
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base inter">
                                Reach out to us for admissions, course
                                details, or any other Enquiry.
                            </p>

                        </div>
                    </ScrollReveal>



                    {/* CONTACT FORM SECTION */}
                    <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-2  lg:gap-16">

                        {/* LEFT CONTENT */}
                        <ScrollReveal animation="right" delay={80} duration={500}>
                            <div>

                                <span className="text-xs font-bold tracking-[0.2em] text-(--gold) montserrat uppercase">
                                    SEND AN Enquiry
                                </span>

                                <h2 className="mt-4 text-3xl font-extrabold text-(--navy) sm:text-4xl">
                                    How Can We{" "}
                                    <span className="text-(--gold)">
                                        Help You?
                                    </span>
                                </h2>

                                <p className="mt-5 max-w-lg text-sm leading-7 inter text-(--muted) sm:text-base">
                                    Tell us what you are looking for.
                                    Contact our team for course information,
                                    admission guidance, and other enquiries.
                                </p>


                                {/* ADMISSION GUIDANCE CARD */}
                                <div className="mt-8 flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-[#A78312]">
                                        <MessageCircle size={23} />
                                    </div>

                                    <div>

                                        <h3 className="font-bold text-(--navy) sm:text-lg">
                                            Need Admission Guidance?
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-(--muted)">
                                            Share your details and course
                                            interest with our team.
                                        </p>

                                    </div>

                                </div>


                                {/* CONTACT CARDS */}
                                <ScrollReveal animation="up" delay={80} duration={500}>
                                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                        {contactCards.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <article
                                                    key={item.title}
                                                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-[#D4AF37]/60"
                                                >

                                                    {/* SMALL ICON */}
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-[#A78312]">
                                                        <Icon size={19} />
                                                    </div>


                                                    {/* CONTACT DETAILS */}
                                                    <div className="min-w-0">

                                                        <h3 className="text-sm font-semibold text-(--navy) sm:text-base">
                                                            {item.title}
                                                        </h3>

                                                        <Link
                                                            href={item.href}
                                                            className="mt-0.5 block break-all text-xs text-(--muted) hover:text-(--gold)"
                                                        >
                                                            {item.value}
                                                        </Link>

                                                    </div>

                                                </article>
                                            );
                                        })}

                                    </div>
                                </ScrollReveal>

                                {/* WHATSAPP CHANNEL CARD */}
                                <ScrollReveal animation="up" delay={80} duration={500}>
                                    <div className="mt-8">
                                        <WhatsAppChannelCard />
                                    </div>
                                </ScrollReveal>

                            </div>
                        </ScrollReveal>


                        {/* CONTACT FORM */}

                        <div className="w-full min-w-0">
                            <ScrollReveal animation="up-zoom" delay={80} duration={500}>
                                <ContactForm theme="light" size="md" id="contact-details" />
                            </ScrollReveal>
                        </div>

                    </div>




                    {/* LOCATION SECTION */}

                    <ScrollReveal animation="up" delay={80} duration={500}>
                        <div className="mt-16 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:mt-20 lg:grid-cols-2">

                            {/* LOCATION DETAILS */}
                            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">

                                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-(--gold) montserrat uppercase">
                                    <MapPin size={17} />
                                    OUR LOCATION
                                </span>

                                <h2 className="mt-5 text-3xl font-extrabold text-(--gold)  sm:text-4xl">
                                    Visit{" "}
                                    <span className="text-(--navy)">
                                        Prince Defence Academy
                                    </span>
                                </h2>

                                <p className="mt-5 text-sm leading-7 text-(--muted) sm:text-base">
                                    Planning to visit us? Find our institute
                                    on Google Maps and get directions with
                                    just one click.
                                </p>


                                {/* EXACT ADDRESS */}
                                <div className="mt-6 flex items-start gap-3 text-sm leading-7 inter text-(--muted)">

                                    <MapPin
                                        size={21}
                                        className="mt-1 shrink-0 text-(--gold)"
                                    />

                                    <span className="font-medium">
                                        Prince Defence Academy,
                                        <br />
                                        Palwas Rd, Sikar,
                                        <br />
                                        Palwas, Rajasthan 332042
                                    </span>

                                </div>


                                {/* GET DIRECTIONS BUTTON */}
                                <div className="mt-8">

                                    <Link
                                        href={MAPS_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 rounded-xl bg-(--gold) px-5 py-3.5 text-sm font-bold text-(--white) transition-colors hover:bg-(--navy)"
                                    >
                                        <Navigation size={18} />

                                        Get Directions

                                        <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Link>

                                </div>

                            </div>



                            {/* GOOGLE MAP */}
                            <div className="relative min-h-[300px] overflow-hidden bg-slate-200 sm:min-h-[400px]">


                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.7153712355757!2d75.0619223713875!3d27.60235267935045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca5ff6673e741%3A0xe571ca5e6e634584!2sPrince%20Defence%20Academy!5e0!3m2!1sen!2sus!4v1789900300909!5m2!1sen!2sus" allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="absolute inset-0 h-full w-full border-0"
                                ></iframe>

                                <Link
                                    href={MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-xs font-bold text-[#000825] shadow-lg hover:bg-amber-50"
                                >
                                    <MapPin size={16} />
                                    Open in Google Maps
                                    <ArrowUpRight size={15} />
                                </Link>

                            </div>

                        </div>
                    </ScrollReveal>




                </div>
            </section>

        </main>
    );
}