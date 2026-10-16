import ScrollReveal from "../animations/ScrollReveal";





const questions = [
  {
    question: "Which are the courses offered by Prince Defence Academy?",
    answer:
      "Prince Defence Academy offers multiple courses such as NDA, Air Force, Navy, Army, SSC and SSB interviews, along with other competitive recruitment exams.",
  },
  {
    question: "Who can join Prince Defence Academy?",
    answer:
      "Students from Class 10, Class 12 or graduates can apply, depending on the course. Our team will help you pick the right one.",
  },
  {
    question: "Is hostel facility available at Prince Defence Academy?",
    answer:
      "Yes. We have a safe, comfortable hostel and a mess that serves fresh, healthy meals.",
  },
  {
    question: "Do Prince Defence provide physical training and SSB preparation?",
    answer:
      "Yes. Daily physical training, a gym and sports are part of the routine, and SSB students get regular guidance and mock practice.",
  },
  {
    question: "How can I take admission at Prince Defence Academy Sikar?",
    answer:
      "Visit our campus, call us or fill in the enquiry form on our website. We’ll guide you through every step.",
  },
];

export default function HomeFAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#DFE7F1] px-5 pb-12 pt-16 sm:px-8 lg:px-12 lg:pb-20 lg:pt-20"
    >
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <header className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-[rgba(35,79,61,0.25)] bg-white px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-(--green) sm:text-sm">
              FAQ
            </span>

            <h2
              id="faq-heading"
              className="mt-4 font-(--font-montserrat) text-2xl font-bold text-(--navy) sm:text-3xl lg:text-4xl"
            >
              Frequently Asked{" "}
              <span className="text-(--gold)">Questions</span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-(--muted) sm:text-base">
              Helpful information about courses, admissions and the
              academy.
            </p>
          </header>
        </ScrollReveal>

        <div className="home-faq-accordion mt-8 space-y-3">
          {questions.map((item, index) => (
            <ScrollReveal
              key={item.question}
              delay={Math.min(index * 60, 240)}
              duration={500}
            >
              <details
                name="home-faq"
                className="group rounded-2xl border border-slate-200 bg-white px-5 shadow-sm open:border-(--gold)/50 sm:px-6"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-(--navy) marker:hidden sm:text-base">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="text-xl font-normal text-(--gold) transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-7 text-(--muted)">
                  {item.answer}
                </p>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>


     
    </section>
  );
}
