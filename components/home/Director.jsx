
import Image from "next/image";
import ScrollReveal from "../animations/ScrollReveal";


const Directorpage = () => {
  return (
    <section
      id="Director-Message"
      className="[content-visibility:auto] [contain-intrinsic-size:900px] bg-(--background) px-5 py-16 sm:px-8 lg:px-12 lg:pt-24 lg:pb-5"
      aria-labelledby="director-message-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="p-2 sm:p-3 lg:p-4">

          {/* Director's Message */}
          <ScrollReveal animation="up" duration={700}>
            <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:gap-5">

              {/* Director Image */}
              <div className="relative w-full shrink-0 overflow-hidden rounded-2xl shadow-[-5px_0px_40px_rgba(15,23,42,0.50)] lg:w-[420px]">
                <div className="relative aspect-[4/4] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/DirectorSir.webp"
                    alt="Prince Director Image"
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    quality={85}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Director Content */}
              <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl p-4 sm:p-5 lg:p-4">

                <span className="inline-flex rounded-full montserrat py-1 text-lg font-bold text-[var(--navy)]">
                  Director&apos;s Message
                </span>

                <p className="m-0 text-sm leading-6 text-[var(--muted)] sm:text-[15px] lg:text-base inter text-justify">
                  Dear Parents &amp; Students,

                  After Class 12, the right direction, discipline and guidance
                  play a vital role in shaping a student’s future. At Prince
                  Defence Academy, our aim is to provide an environment that
                  combines quality education with Defence &amp; Competitive
                  Exam Preparation, Physical Fitness, Personality Development
                  and Discipline.

                  In just a few years of establishment, thousands of our
                  students have been selected in the NDA, Army, Navy, Air
                  Force, Police and other Government Services, bringing pride
                  to their families and the institution.

                  We believe that the right environment, guidance and hard
                  work together build the foundation for a brighter future.
                </p>

                <div className="border-t border-slate-200 pt-3">
                  <p className="m-0 montserrat text-lg font-bold text-[var(--navy)] sm:text-xl">
                    Mr. Jogendra Sunda
                  </p>

                  <p className="mt-1 m-0 text-xs font-medium inter text-slate-500 sm:text-sm">
                    Director – Prince Eduhub
                  </p>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Chairman's Message */}
          <ScrollReveal animation="up" delay={100} duration={700}>
            <div className="mt-10 flex flex-col-reverse items-stretch gap-4 lg:flex-row lg:gap-5">

              {/* Chairman Content */}
              <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-2xl p-4 sm:p-5 lg:p-4">

                <span className="inline-flex rounded-full montserrat py-1 text-lg font-bold text-[var(--navy)]">
                  Chairman&apos;s Message
                </span>

                <p className="m-0 text-sm leading-6 text-[var(--muted)] sm:text-[15px] lg:text-base inter text-justify">
                  Dear Parents &amp; Students,

                  At Prince Defence Academy, our aim is to provide the right
                  guidance, discipline, quality education, and defence exam
                  preparation to help students achieve their dreams.

                  Since our establishment in 2012, thousands of our students
                  have been selected in the NDA, Army, Navy, Air Force, and
                  other Defence Services, bringing pride to their families
                  and the institution.

                  We believe that the right guidance, dedication, and hard
                  work build the foundation for a successful future.
                </p>

                <div className="border-t border-slate-200 pt-3">
                  <p className="m-0 montserrat text-lg font-bold text-[var(--navy)] sm:text-xl">
                    Dr. Piyush Sunda (Pediatrician)
                  </p>

                  <p className="mt-1 m-0 text-xs font-medium inter text-slate-500 sm:text-sm">
                    Chairman – Prince Eduhub
                  </p>
                </div>

              </div>

              {/* Chairman Image */}
              <div className="relative w-full shrink-0 overflow-hidden rounded-2xl shadow-[0px_0px_40px_rgba(15,23,42,0.50)] lg:w-[420px]">
                <div className="relative aspect-[4/4] w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/ChairmanSir.webp"
                    alt="Prince Chairman Image"
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    quality={85}
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>

      
    </section>
  );
};

export default Directorpage;