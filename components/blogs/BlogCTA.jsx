import Link from "next/link";

const BlogCTA = () => {
    return (
        <section className="my-10 overflow-hidden rounded-2xl bg-[var(--navy)] sm:my-12 sm:rounded-3xl">
            <div className="relative px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
                <div aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#3869D0]/30" />
                <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[#3869D0]/20" />
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[#C9A227]" />

                <div className="relative max-w-2xl">
                    <h2 className="text-balance text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                        Ready to start your defence preparation?
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 sm:mt-4 sm:text-base sm:leading-8">
                        Get the right guidance, preparation and support to take the next step towards your defence career.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-xl bg-[#C9A227] px-6 py-3 text-sm font-semibold text-[var(--navy)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Enquire now
                        </Link>

                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Explore courses
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogCTA;
