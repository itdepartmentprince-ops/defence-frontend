import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const BlogHero = () => {
    return (
        <section className="relative flex w-full items-center overflow-hidden bg-[#EEF3FF] pt-20 md:min-h-[520px] lg:min-h-[600px] lg:pt-0">
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#3869D0]/10 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#102A43]/10 blur-3xl" />

            <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 lg:px-10">
                <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-10">
                    {/* Text */}
                    <div className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
                        <span className="mb-3 inline-flex items-center rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-3.5 py-1 text-[11px] font-semibold tracking-wide text-[#9A7A12] sm:text-xs">
                            Prince Defence Academy
                        </span>

                        <h1 className="max-w-xl text-balance text-2xl font-extrabold leading-[1.4] tracking-tight text-[var(--navy)] sm:text-4xl lg:text-5xl">
                            Defence knowledge &amp;{" "}
                            <span className="inline-block rounded-sm bg-gradient-to-r from-[#C9A227] via-[#E8C95A] to-[#B8901C] px-2.5 py-0.5 text-[var(--white)] sm:px-3">
                                guidance
                            </span>
                        </h1>

                        <p className="mt-3 max-w-md text-xs leading-6 text-[var(--muted)] sm:mt-4 sm:text-sm sm:leading-7 lg:text-base">
                            Explore defence exam updates, preparation tips, career guidance and useful insights for aspiring defence candidates.
                        </p>
                    </div>

                    {/* Lottie */}
                    <div className="relative flex w-full items-center justify-center md:w-1/2">
                        <div aria-hidden="true" className="absolute h-56 w-56 rounded-full bg-[#3869D0]/10 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
                        <div className="relative aspect-square w-full max-w-[18rem] sm:max-w-[22rem] lg:max-w-[28rem]">
                            <DotLottieReact
                                src="https://lottie.host/c2752204-0cec-41df-a3ff-40e47ec9fc89/er8HN6i2ly.lottie"
                                loop
                                autoplay
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
