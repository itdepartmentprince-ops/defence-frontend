import ScrollReveal from "../animations/ScrollReveal";

const routine = [
    {
        emoji: "🌄",
        title: "Morning Routine",
        time: "5:00 AM – 8:00 AM",
        activities: [
            ["Wake up", "5:00 AM"],
            ["Wash & change", "5:00 – 5:30 AM"],
            ["Physical training", "5:30 – 6:15 AM"],
            ["Bath & get ready", "6:15 – 7:00 AM"],
            ["Breakfast", "7:00 – 8:00 AM"],
        ],
    },
    {
        emoji: "📚",
        title: "Classes & Lunch",
        time: "8:00 AM – 3:15 PM",
        activities: [
            ["Assembly", "8:00 – 8:10 AM"],
            ["Classes", "8:10 – 10:40 AM"],
            ["Fruit break", "10:40 – 10:55 AM"],
            ["Classes", "10:55 AM – 1:00 PM"],
            ["Lunch", "1:00 – 1:45 PM"],
            ["Classes", "1:45 – 3:15 PM"],
        ],
    },
    {
        emoji: "🧘",
        title: "Rest & Doubt Session",
        time: "3:15 PM – 4:30 PM",
        description:
            "Recharge, clear doubts with faculty, or make use of the computer lab and library.",
    },
    {
        emoji: "🏏",
        title: "Ground, Sports & Dinner",
        time: "4:30 PM – 7:00 PM",
        activities: [
            ["Ground & sports", "4:30 – 6:00 PM"],
            ["Dinner", "6:00 – 7:00 PM"],
        ],
    },
    {
        emoji: "🌙",
        title: "Night Self-Study",
        time: "7:00 PM – 9:45 PM",
        description:
            "Dedicated evening study time to revise lessons and prepare for upcoming exams.",
    },
    {
        emoji: "🥛",
        title: "Milk & Lights Out",
        time: "9:45 PM – 10:00 PM",
        activities: [
            ["Milk time", "9:45 – 10:00 PM"],
            ["Lights out", "10:00 PM"],
        ],
    },
];

export default function DailyRoutine() {
    return (
        <section
            id="daily-routine"
            aria-labelledby="daily-routine-heading"
            className="bg-[#DFE7F1] px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
        >
            <div className="mx-auto max-w-6xl">
                <ScrollReveal>
                    <header className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-(--gold)/30 bg-white px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-(--green) sm:text-sm">
                            🕒 A DAY AT THE ACADEMY
                        </span>
                        <h2
                            id="daily-routine-heading"
                            className="mt-4 font-(--font-montserrat) text-2xl font-bold text-(--navy) sm:text-3xl lg:text-4xl"
                        >
                            A Routine Built for{" "}
                            <span className="text-(--gold)">Success</span>
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-(--muted) sm:text-base">
                            Every day balances fitness, focused learning, rest
                            and preparation for a future in the armed forces.
                        </p>
                    </header>
                </ScrollReveal>

                <ol className="relative mx-auto mt-10 max-w-4xl space-y-4 before:absolute before:bottom-7 before:left-[21px] before:top-7 before:w-0.5 before:bg-gradient-to-b before:from-(--navy) before:via-(--navy) before:to-(--navy) sm:space-y-5 sm:before:left-7">
                    {routine.map((item, index) => (
                        <li
                            key={item.title}
                            className="relative pl-12 sm:pl-16"
                        >
                            <span className="absolute left-0 top-5 z-[1] flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#DFE7F1] bg-(--navy) text-lg shadow-sm sm:top-6 sm:h-14 sm:w-14 sm:text-xl">
                                <span aria-hidden="true">{item.emoji}</span>
                            </span>

                            <ScrollReveal
                                className="h-full"
                                delay={Math.min(index * 60, 300)}
                                duration={550}
                            >
                            <article className="rounded-2xl border border-white/80 bg-white p-5 shadow-[0_8px_24px_rgba(16,42,67,0.06)] transition-shadow hover:shadow-[0_14px_34px_rgba(16,42,67,0.12)] sm:p-6">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                    <h3 className="font-(--font-montserrat) text-base font-bold text-(--navy) sm:text-lg">
                                        <span className="mr-2" aria-hidden="true">
                                            {item.emoji}
                                        </span>
                                        {item.title}
                                    </h3>
                                    <span className="w-fit shrink-0 rounded-full bg-[#EAF2EC] px-3 py-1 text-xs font-bold text-(--green)">
                                        {item.time}
                                    </span>
                                </div>

                                {item.activities ? (
                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {item.activities.map(
                                            ([activity, time]) => (
                                                <li
                                                    key={`${activity}-${time}`}
                                                    className="rounded-lg border border-slate-100 bg-[#F8FAFC] px-3 py-2 text-xs text-(--muted) sm:text-sm"
                                                >
                                                    <span className="font-semibold text-(--navy)">
                                                        {activity}
                                                    </span>
                                                    <span className="mx-1.5 text-(--gold)">
                                                        ·
                                                    </span>
                                                    {time}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                ) : (
                                    <p className="mt-3 text-sm leading-6 text-(--muted)">
                                        {item.description}
                                    </p>
                                )}
                            </article>
                            </ScrollReveal>
                        </li>
                    ))}
                </ol>

                <p className="mt-6 text-center text-xs text-(--muted)">
                    * Timings vary by batch and schedule.
                </p>
            </div>
        </section>
    );
}
