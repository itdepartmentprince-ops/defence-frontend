import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const FacilitiesContact = () => {
    return (
        <ScrollReveal animation="up" delay="50" duration="700">
            <section className="relative pb-10 max-w-7xl mx-auto mt-16 px-4 sm:px-6">
                <div className="relative overflow-hidden rounded-3xl border border-white/60
                    bg-gradient-to-br from-blue-50 via-white to-indigo-100
                    shadow-xl shadow-blue-900/5">
                    <div className="absolute -top-20 -right-20 h-64 w-64
                        rounded-full bg-blue-300/20 blur-3xl" />

                    <div className="absolute -bottom-20 -left-10 h-52 w-52
                        rounded-full bg-indigo-300/20 blur-3xl" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2
                        items-center gap-8 lg:gap-14 p-6 sm:p-10 lg:p-14">
                        <div className="flex items-center justify-center">
                            <div className="w-full max-w-lg lg:max-w-xl">
                                <DotLottieReact
                                    src="https://lottie.host/ef51d552-143d-4429-b61d-e0d61cc1a994/6O629bCZDv.json"
                                    loop
                                    autoplay
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-start">
                            <span className="inline-flex items-center gap-2 rounded-full
                                border border-white/80 bg-white/50 px-4 py-2
                                text-sm font-medium text-blue-900 shadow-sm
                                backdrop-blur-xl">
                                <span className="h-2 w-2 rounded-full bg-blue-900" />
                                CONTACT US
                            </span>

                            <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl
                                font-bold leading-tight tracking-tight text-gray-900">
                                Have Questions About Our Facilities?
                            </h2>

                            <p className="mt-4 text-sm sm:text-base leading-7 text-gray-600">
                                We&apos;re just a call away! Connect with our team to learn more
                                about our facilities, student support, and everything you need
                                to start your journey with Prince. Call us today and take the
                                first step toward your future.
                            </p>

                            <Link
                                href="tel:+919610742222"
                                className="group mt-7 inline-flex items-center
                                    rounded-xl bg-blue-900 pl-5 py-2 text-sm
                                    font-semibold text-white shadow-lg shadow-blue-700/20
                                    transition-all duration-300 hover:-translate-y-1
                                    hover:bg-blue-800 hover:shadow-xl"
                            >
                                Contact Us
                                <span className="transition-transform duration-300
                                    group-hover:translate-x-1 w-20 h-10">
                                    <DotLottieReact
                                        src="https://lottie.host/97c185c8-dadf-4191-b9b1-37db743a9292/CnS8qopvre.json"
                                        loop
                                        autoplay
                                    />
                                </span>
                            </Link>

                            <p className="mt-3 text-xs text-gray-500">
                                Have questions? We&apos;re just a call away.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
};

export default FacilitiesContact;
