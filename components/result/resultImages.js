export const resultImageByYear = {
    "2026": {
        nda: "/images/NDA-II Result 2026 Slides 01.webp",
    },
};

export const resultImageByExam = {
    all: "/images/resultFirst.webp",
    "air-force": "/images/AirForceSelections.webp",
    army: "/images/ArmySelections.webp",
    navy: "/images/NavySelections.webp",
    nda: "/images/ndaSelections2.webp",
    other: "/images/SsbTotalSelections.webp",
};

export const getExamType = (item) => {
    const title = item.title.toLowerCase();

    if (title.includes("air force")) return "air-force";
    if (title.includes("army")) return "army";
    if (title.includes("navy")) return "navy";
    if (title.includes("nda")) return "nda";

    return "other";
};

export const getExamLabel = (exam) => {
    const labels = {
        all: "All Defence",
        "air-force": "Air Force",
        army: "Army",
        navy: "Navy",
        nda: "NDA",
        other: "Other Defence Services",
    };

    return labels[exam] || null;
};

export const getResultImage = (year, exam) =>
    resultImageByYear[year]?.[exam] || resultImageByExam[exam];
