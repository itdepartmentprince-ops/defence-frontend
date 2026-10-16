import ScrollReveal from "@/components/animations/ScrollReveal";

export const metadata = {
  title: "Privacy Policy | Prince Defence Academy",
  description:
    "Learn how Prince Defence Academy collects, uses and protects information submitted through its website.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

const sections = [
  {
    id: "collect",
    title: "Information we collect",
    items: [
      "Name, address, phone number, email ID",
      "Date of birth, photograph",
      "Details submitted via admission and Enquiry forms academic qualifications, previous exam scores, and similar records",
      "Payment-related information, where online payment is used",
      "Technical data from website usage IP address, browser type, cookies",
    ],
  },
  {
    id: "use",
    title: "How we use it",
    items: [
      "To process admissions",
      "To send results, notices, and updates",
      "To communicate about fees and payments",
      "To administer daily quizzes, save quiz progress, and associate quiz results with the participant",
      "To improve our website and services",
      "To resolve queries or complaints",
    ],
  },
  {
    id: "share",
    title: "Sharing of information",
    items: [
      "With staff who assist with admissions and teaching",
      "Quiz participant mobile numbers are available only to authorized staff and are not shown publicly",
      "With payment gateway providers, for fee collection",
      "With government or legal authorities, when required by law",
      "We do not sell your information to third parties for marketing",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    text: "Our website may use cookies to improve your browsing experience. You can disable cookies through your browser settings at any time.",
  },
  {
    id: "security",
    title: "Data security",
    text: "We follow reasonable security practices secure servers, restricted access, and regular reviews. No method of transmission over the internet can be guaranteed 100% secure.",
  },
  {
    id: "retention",
    title: "Data retention",
    text: "We retain your information for as long as necessary for academic records or legal requirements.",
  },
  {
    id: "rights",
    title: "Your rights",
    items: [
      "Obtain a copy of your information",
      "Correct inaccurate information",
      "Request deletion, where legally permissible",
      "Withdraw your consent",
    ],
  },
  {
    id: "links",
    title: "Third-party links",
    text: "Our website may link to other sites, including social media. We are not responsible for the privacy practices of those sites.",
  },
  {
    id: "changes",
    title: "Changes to this policy",
    text: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#20241f]">
      {/* Header */}
      <header className="w-full bg-[#22301f] pt-30 text-[#f2efe6]">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
          <p className="font-serif text-xl tracking-tight sm:text-2xl">
            Prince Defence Academy
          </p>
          <p className="mt-1 text-xs text-[#c9c2a6] sm:text-sm">
            Privacy Policy
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
            Prince Defence Academy we respects your privacy.
            This policy explains how we collect, use, store, and protect the
            information of visitors and students who use <a href="https://princedefence.com" className="hover:text-(--gold)">www.princedefence.com</a> , in compliance with the Information
            Technology Act, 2000 and the IT (Reasonable Security Practices
            and Procedures and Sensitive Personal Data or Information)
            Rules, 2011.
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