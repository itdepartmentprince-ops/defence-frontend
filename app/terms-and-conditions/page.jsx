import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata = {
    title: "Terms and Conditions | Prince Defence Academy",
    description:
        "Review the terms governing use of the Prince Defence Academy website, its information and enquiry services.",
    alternates: {
        canonical: "/terms-and-conditions",
    },
};

const sections = [
    {
        id: "general",
        num: "01",
        title: "General",
        text: "These Terms of Use are prepared in accordance with the Information Technology Act, 2000 and related rules. This is an electronic record and does not require a physical or digital signature.",
    },
    {
        id: "use",
        num: "02",
        title: "Use of website",
        items: [
            "Information on this website Home, About, Results, Gallery, Courses, Facilities, Contact is for general information only.",
            "Users may use this website only for lawful purposes.",
            "Posting false, offensive, or misleading content on this website is prohibited.",
        ],
    },
    {
        id: "admissions",
        num: "03",
        title: "Admissions & fees",
        items: [
            "All admissions are subject to the academy's rules and seat availability.",
            "The academy reserves the right to revise the fee structure, batch timings, and syllabus at any time.",
        ],
    },
    {
        id: "accuracy",
        num: "04",
        title: "Accuracy of results & content",
        items: [
            "Every effort is made to keep results, achievements, and gallery information accurate. The academy is not responsible for technical errors.",
            "For the most accurate, up-to-date information, please contact the academy directly.",
        ],
    },
    {
        id: "ip",
        num: "05",
        title: "Intellectual property",
        items: [
            "All content, logos, images, and material on this website belong to Prince Defence Academy.",
            "Copying, reproducing, or distributing any content without written permission is prohibited.",
        ],
    },
    {
        id: "links",
        num: "06",
        title: "Third-party links",
        text: "Our website may link to other sites. Prince Defence Academy is not responsible for the content, accuracy, or privacy practices of those sites.",
    },
    {
        id: "liability",
        num: "07",
        title: "Limitation of liability",
        text: "The academy is not liable for any direct or indirect loss arising from the use of this website.",
    },
    {
        id: "amendments",
        num: "08",
        title: "Amendments",
        text: "The academy reserves the right to modify these Terms and Conditions at any time, without prior notice.",
    },
    {
        id: "law",
        num: "09",
        title: "Governing law & jurisdiction",
        text: "These Terms are governed by Indian law the Indian Contract Act, 1872 and the Information Technology Act, 2000. Disputes are subject to the exclusive jurisdiction of the courts in [your city/district, e.g., Sikar, Rajasthan].",
    },
];

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-[#f7f6f2] text-[#20241f]">
            {/* Header */}
            <header className="w-full bg-[#22301f] pt-30 text-[#f2efe6]">
                <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
                    <p className="font-serif text-xl tracking-tight sm:text-2xl">
                        Prince Defence Academy
                    </p>
                    <p className="mt-1 text-xs text-[#c9c2a6] sm:text-sm">
                        Terms and Conditions
                    </p>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-[#8a6d2f] via-[#c9a54a] to-[#8a6d2f]" />
            </header>

            {/* Content */}
            <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
                <div className="mb-10 border-b border-[#ddd6bd] pb-8">
                    <p className="text-sm text-[#8a836b]">
                        Effective date: [30/09/2026]
                    </p>
                    <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#3c392f] sm:text-base">
                        This website, <a href="https://princedefence.com/" className="hover:text-(--gold)">www.princedefence.com </a>, is operated by Prince
                        Defence Academy. By using this website, you agree to the
                        following Terms and Conditions.
                    </p>
                </div>

                <div className="space-y-10">
                    {sections.map((section) => (
                        <ScrollReveal key={section.id}>
                          <section
                            id={section.id}
                            className="scroll-mt-10 border-b border-[#e6e1cd] pb-8 last:border-0"
                          >


                            <h2 className="font-serif text-lg text-[#20241f] sm:text-xl">
                                {section.title}
                            </h2>

                            {section.text && (
                                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#4a4738] sm:text-base">
                                    {section.text}
                                </p>
                            )}
                            {section.items && (
                                <ul className="mt-3 max-w-2xl space-y-2 text-[15px] leading-7 text-[#4a4738] sm:text-base">
                                    {section.items.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#a68a3f]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                          </section>
                        </ScrollReveal>
                    ))}

                </div>
            </main>
        </div>
    );
}