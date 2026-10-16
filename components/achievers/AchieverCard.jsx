
const THEMES = {
    nda: {
        background: "from-[#0b2148] via-[#194d91] to-[#4788d1]",
        accent: "#173f75",
        panel: "from-[#f7faff] to-[#e0ebfb]",
        text: "text-[#173153]",
        muted: "text-[#647994]",
        chip: "text-[#204b80]",
        label: "text-[#71849d]",
    },
    ssc: {
        background: "from-[#172554] via-[#344d91] to-[#8296d0]",
        accent: "#263d7e",
        panel: "from-[#fafaff] to-[#e5e9f9]",
        text: "text-[#202d51]",
        muted: "text-[#59678a]",
        chip: "text-[#273d7b]",
        label: "text-[#69779b]",
    },
    airforce: {
        background: "from-[#103b46] via-[#087f8c] to-[#43b9b4]",
        accent: "#087781",
        panel: "from-[#f4fffe] to-[#d6f3ee]",
        text: "text-[#123e45]",
        muted: "text-[#426c70]",
        chip: "text-[#08656c]",
        label: "text-[#4e797d]",
    },
    
army: {
    background: "from-[#172f20] via-[#3f612e] to-[#91a85b]",
    accent: "#35552a",
    panel: "from-[#fbfcf1] to-[#e7edcf]",
    text: "text-[#203b24]",
    muted: "text-[#5e7147]",
    chip: "text-[#35552a]",
    label: "text-[#718354]",
},

    navy: {
        background: "from-[#082746] via-[#075b88] to-[#35a4c7]",
        accent: "#075782",
        panel: "from-[#f5fcff] to-[#d9f0fa]",
        text: "text-[#12344d]",
        muted: "text-[#486a80]",
        chip: "text-[#07547d]",
        label: "text-[#557a91]",
    },
    afcat: {
        background: "from-[#183765] via-[#366db4] to-[#91baf0]",
        accent: "#315fa4",
        panel: "from-[#f7faff] to-[#e0eaff]",
        text: "text-[#1b3153]",
        muted: "text-[#5a7092]",
        chip: "text-[#28548e]",
        label: "text-[#687fa1]",
    },

    default: {
        background: "from-[#0b2148] via-[#194d91] to-[#4788d1]",
        accent: "#173f75",
        panel: "from-[#f7faff] to-[#e0ebfb]",
        text: "text-[#173153]",
        muted: "text-[#647994]",
        chip: "text-[#204b80]",
        label: "text-[#71849d]",
    },
};

function getThemeForValue(value) {
    const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

    if (/\bnda\b/.test(normalized)) return THEMES.nda;
    if (/\bcds\b/.test(normalized)) return THEMES.cds;
    if (/\bafcat\b/.test(normalized)) return THEMES.afcat;
    if (/\bnavy\b|\bssr\b|\bagniveer\s+navy\b/.test(normalized))
        return THEMES.navy;
    if (/\bair\s*force\b|\bairforce\b|\bagniveer\s+vayu\b/.test(normalized))
        return THEMES.airforce;
    if (/\barmy\b|\bagniveer\b|\btechnical\b|\bgd\b|\bclerk\b/.test(normalized))
        return THEMES.army;
    if (/\bpolice\b|\bconstable\b|\bsub\s*inspector\b|\bsi\b/.test(normalized))
        return THEMES.default;

    return null;
}

function getTheme(category, exam = "") {
    const categoryValue =
        typeof category === "string"
            ? category
            : [category?.slug, category?.name].filter(Boolean).join(" ");

    return getThemeForValue(categoryValue) || getThemeForValue(exam) || THEMES.default;
}

function getInitials(name = "") {
    return (
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0]?.toUpperCase())
            .join("") || "?"
    );
}

function cleanFatherName(value = "") {
    return value
        .trim()
        .replace(/^(?:(?:s\/o)\s+)?(?:(?:shri|sh)\.?\s+)/i, "")
        .trim();
}

function AchieverChip({
    label,
    value,
    theme,
    accent,
    uppercase = false,
}) {
    if (!value) return null;

    return (
        <div
            className="min-w-0 rounded-lg border border-slate-200/80 bg-white px-1.5 py-1.5 shadow-sm sm:rounded-xl sm:px-3 sm:py-2.5"
            style={{ borderTop: `2px solid ${accent}` }}
        >
            <span
                className={`block truncate text-[8px] font-bold uppercase tracking-[0.07em] sm:text-[10px] sm:tracking-[0.09em] ${theme.label}`}
            >
                {label}
            </span>

            <span
                title={value}
                className={`mt-0.5 block truncate text-[10px] font-extrabold leading-tight sm:mt-1 sm:text-sm ${theme.chip} ${
                    uppercase ? "uppercase" : "capitalize"
                }`}
            >
                {value}
            </span>
        </div>
    );
}

export default function AchieverCard({ student = {} }) {
    const name = (student.name || "Achiever").trim();
    const exam = (student.examName || "").trim();
    const year = student.year ? String(student.year) : "";
    const father = cleanFatherName(student.fatherName || "");
    const address = (student.address || "").trim();
    const batch = (student.batch || "Target").trim();
    const photoUrl = student.photo?.url;
    const theme = getTheme(student.categoryId, exam);

    const nameSize =
        name.length > 25
            ? "text-xs sm:text-sm"
            : name.length > 17
              ? "text-sm sm:text-base"
              : "text-sm sm:text-lg";

    return (
        <article
            className={`group relative isolate flex aspect-[3/5.5] w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br ${theme.background} font-sans shadow-[0_6px_22px_rgba(20,50,100,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(20,50,100,0.2)] motion-reduce:transform-none motion-reduce:transition-none sm:aspect-[3/5]`}
        >
            {/* Student Photo */}
            <div className="absolute inset-x-0 top-0 h-[70%] overflow-hidden">
                {photoUrl ? (
                    <img
                        src={photoUrl}
                        alt={`${name}${exam ? ` - ${exam}` : ""}${year ? ` ${year}` : ""}`}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-full w-full object-cover object-top"
                    />
                ) : (
                    <div className="grid h-full w-full place-items-center">
                        <span className="grid size-20 place-items-center rounded-full border border-white/40 bg-white/15 text-3xl font-extrabold text-white">
                            {getInitials(name)}
                        </span>
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071a38]/65 via-[#071a38]/10 to-transparent" />
            </div>

            {/* Selection Year */}
            {year && (
                <span className="absolute right-2 top-3 z-20 rounded-lg border border-amber-200/70 bg-gradient-to-br from-[#fff0bb] to-[#e5bd59] px-2 py-1 text-[10px] font-extrabold tracking-wide text-[#243958] shadow-md sm:right-4 sm:top-4 sm:px-2.5 sm:py-1.5 sm:text-sm">
                    {year}
                </span>
            )}

            {/* Name: Centered on Photo and Details Boundary */}
            <div
                className="absolute inset-x-3 top-[60%] md:top-[68%] z-30 flex min-h-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/40 px-3 py-2 shadow-lg sm:inset-x-4 sm:rounded-2xl sm:py-2.5"
                style={{
                    background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent}ed)`,
                }}
            >
                <h3
                    title={name}
                    className={`m-0 max-w-full truncate text-center font-extrabold uppercase leading-tight tracking-wide text-white ${nameSize}`}
                >
                    {name}
                </h3>
            </div>

            {/* Student Details */}
            <div
                className={`absolute inset-x-0 bottom-0 z-20 flex h-[40%] flex-col justify-between bg-gradient-to-br ${theme.panel} px-2.5 pb-2.5 pt-7 sm:h-[32%] sm:px-4 sm:pb-4 sm:pt-8`}
            >
                <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1.5 text-center">
                    {father && (
                        <p
                            className={`relative m-0 max-w-full line-clamp-2 break-words text-[11px] font-bold sm:top-0 sm:text-sm ${theme.text}`}
                        >
                            S/o Sh.{" "}
                            <span className="capitalize">{father}</span>
                        </p>
                    )}

                    {address && (
                        <p
                            title={address}
                            className={`relative m-0 max-w-full line-clamp-2 break-words text-[10px] font-medium sm:top-0 sm:text-xs ${theme.muted}`}
                        >
                            {address}
                        </p>
                    )}
                </div>

                <div
                    className={`grid w-full gap-1.5 sm:gap-2 ${
                        exam ? "grid-cols-[1.15fr_1fr]" : "grid-cols-1"
                    }`}
                >
                    {exam && (
                        <AchieverChip
                            label="Selected in"
                            value={exam}
                            theme={theme}
                            accent={theme.accent}
                            uppercase
                        />
                    )}

                    <AchieverChip
                        label="Batch"
                        value={batch}
                        theme={theme}
                        accent={theme.accent}
                    />
                </div>
            </div>
        </article>
    );
}

export function AchieverCardSkeleton() {
    return (
        <div className="relative aspect-[3/5.5] w-full animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:aspect-[3/5]">
            <div className="absolute inset-x-0 top-0 h-[70%] bg-slate-300" />
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-slate-100 sm:h-[32%]" />
            <div className="absolute inset-x-3 top-[70%] h-10 -translate-y-1/2 rounded-xl bg-slate-300 sm:inset-x-4" />
        </div>
    );
}
