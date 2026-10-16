"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
    X,
    ChevronLeft,
    ChevronRight,
    Images,
    ArrowUpRight,
} from "lucide-react";

import ScrollReveal from "../animations/ScrollReveal";
import GalleryHeader from "./GalleryHeader";

import {
    getGallery,
    getGalleryCategories,
} from "@/services/galleryService";

const Gallery = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] =
        useState(null);
    const [selectedImage, setSelectedImage] =
        useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    const fetchAllGalleryImages = useCallback(
        async (categoryId) => {
            let page = 1;
            let allImages = [];
            let hasNextPage = true;

            while (hasNextPage) {
                const galleryResponse =
                    await getGallery({
                        category: categoryId,
                        page,
                        limit: 50,
                    });

                const images =
                    galleryResponse?.data || [];

                allImages = [
                    ...allImages,
                    ...images,
                ];

                hasNextPage =
                    galleryResponse?.pagination
                        ?.hasNextPage || false;

                page++;
            }

            return allImages;
        },
        []
    );

    useEffect(() => {
        let isActive = true;

        const loadGalleryData = async () => {
            try {
                const categoryResponse =
                    await getGalleryCategories();

                const backendCategories =
                    categoryResponse?.data || [];

                const activeCategories =
                    backendCategories.filter(
                        (category) =>
                            category.isActive
                    );

                const categoryData =
                    await Promise.all(
                        activeCategories.map(
                            async (category) => {
                                const images =
                                    await fetchAllGalleryImages(
                                        category._id
                                    );

                                return {
                                    id: category._id,
                                    name: category.name,
                                    description:
                                        category.alt ||
                                        `Explore ${category.name} gallery`,
                                    cover:
                                        images[0]
                                            ?.imageUrl || "",
                                    coverAlt:
                                        images[0]?.alt ||
                                        category.name,
                                    images: images.map(
                                        (image) => ({
                                            src:
                                                image.imageUrl,
                                            alt:
                                                image.alt ||
                                                image.title ||
                                                category.name,
                                        })
                                    ),
                                };
                            }
                        )
                    );

                const categoriesWithImages =
                    categoryData.filter(
                        (category) =>
                            category.images.length > 0
                    );

                if (isActive) {
                    setCategories(categoriesWithImages);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch gallery:",
                    error
                );

                const message =
                    error?.message || "Failed to load gallery";
                if (isActive) {
                    setError(message);
                    toast.error(message);
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        loadGalleryData();

        return () => {
            isActive = false;
        };
    }, [fetchAllGalleryImages, retryCount]);

    const retryGalleryData = () => {
        setError("");
        setLoading(true);
        setRetryCount((count) => count + 1);
    };

    useEffect(() => {
        if (!selectedCategory) return;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedCategory]);

    const handlePreviousImage = useCallback(
        () => {
            if (
                !selectedImage ||
                !selectedCategory
            )
                return;

            const images =
                selectedCategory.images;

            const currentIndex =
                images.findIndex(
                    (image) =>
                        image.src ===
                        selectedImage.src
                );

            const previousIndex =
                currentIndex <= 0
                    ? images.length - 1
                    : currentIndex - 1;

            setSelectedImage(
                images[previousIndex]
            );
        },
        [selectedImage, selectedCategory]
    );

    const handleNextImage = useCallback(
        () => {
            if (
                !selectedImage ||
                !selectedCategory
            )
                return;

            const images =
                selectedCategory.images;

            const currentIndex =
                images.findIndex(
                    (image) =>
                        image.src ===
                        selectedImage.src
                );

            const nextIndex =
                currentIndex ===
                images.length - 1
                    ? 0
                    : currentIndex + 1;

            setSelectedImage(
                images[nextIndex]
            );
        },
        [selectedImage, selectedCategory]
    );

    useEffect(() => {
        if (!selectedImage) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setSelectedImage(null);
            }

            if (event.key === "ArrowLeft") {
                handlePreviousImage();
            }

            if (event.key === "ArrowRight") {
                handleNextImage();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        selectedImage,
        handlePreviousImage,
        handleNextImage,
    ]);

    const handleCategoryClose = () => {
        setSelectedCategory(null);
        setSelectedImage(null);
    };

    const getImageIndex = () => {
        if (
            !selectedImage ||
            !selectedCategory
        ) {
            return 0;
        }

        return (
            selectedCategory.images.findIndex(
                (image) =>
                    image.src ===
                    selectedImage.src
            ) + 1
        );
    };

    return (
        <section
            className="bg-[#F2F6FF] py-16 sm:py-20 lg:py-24"
            aria-labelledby="gallery-heading"
        >
            <div className="container mx-auto px-4">

                <GalleryHeader />

                {/* Loading */}
                {loading && (
                    <div
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        aria-label="Loading gallery"
                    >
                        {Array.from({
                            length: 6,
                        }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-2xl border border-[#C8D5EA]/60 bg-white/70 shadow-[0_8px_30px_rgba(16,42,67,0.06)]"
                                >
                                    <div className="aspect-[4/3] animate-pulse bg-[#DDE7F5]" />

                                    <div className="space-y-3 p-5">
                                        <div className="h-6 w-2/3 animate-pulse rounded-md bg-[#DDE7F5]" />

                                        <div className="h-4 w-full animate-pulse rounded-md bg-[#E7EEF8]" />

                                        <div className="h-4 w-4/5 animate-pulse rounded-md bg-[#E7EEF8]" />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="mx-auto flex min-h-[320px] max-w-xl items-center justify-center">
                        <div className="w-full rounded-2xl border border-red-200 bg-white/80 p-8 text-center shadow-[0_8px_30px_rgba(16,42,67,0.08)] backdrop-blur-xl">

                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
                                <Images
                                    size={26}
                                />
                            </div>

                            <h3 className="text-xl font-bold text-[#102A43]">
                                Gallery could not
                                be loaded
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={retryGalleryData}
                                className="mt-6 rounded-full bg-[#102A43] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#244A9A]"
                            >
                                Try Again
                            </button>

                        </div>
                    </div>
                )}

                {/* Empty */}
                {!loading &&
                    !error &&
                    categories.length === 0 && (
                        <div className="mx-auto flex min-h-[320px] max-w-xl items-center justify-center">
                            <div className="w-full rounded-2xl border border-[#C8D5EA]/70 bg-white/75 p-8 text-center shadow-[0_8px_30px_rgba(16,42,67,0.07)] backdrop-blur-xl">

                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E7EEF8] text-[#3869D0]">
                                    <Images
                                        size={26}
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-[#102A43]">
                                    Gallery is
                                    coming soon
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    No gallery images
                                    are currently
                                    available.
                                </p>

                            </div>
                        </div>
                    )}

                {/* Gallery Cards */}
                {!loading &&
                    !error &&
                    categories.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {categories.map(
                                (
                                    category,
                                    index
                                ) => (
                                    <ScrollReveal
                                        key={
                                            category.id
                                        }
                                        delay={
                                            index *
                                            80
                                        }
                                    >

                                        <article className="group relative overflow-hidden rounded-2xl border border-[#C8D5EA]/70 bg-white/80 shadow-[0_10px_35px_rgba(16,42,67,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#3869D0]/30 hover:shadow-[0_18px_45px_rgba(16,42,67,0.14)]">

                                            {/* Cover */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        category
                                                    )
                                                }
                                                aria-label={`Open ${category.name} gallery`}
                                                className="relative block w-full overflow-hidden text-left"
                                            >

                                                <div className="relative aspect-[4/3] overflow-hidden">

                                                    <Image
                                                        src={
                                                            category.cover
                                                        }
                                                        alt={
                                                            category.coverAlt
                                                        }
                                                        fill
                                                        priority={
                                                            index <
                                                            2
                                                        }
                                                        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 32px), 400px"
                                                        quality={100}
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />

                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#07192B]/80 via-[#07192B]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />


                                                    {/* Photo count */}
                                                    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/30 bg-white/85 px-3 py-1.5 text-xs font-semibold text-[#102A43] shadow-sm backdrop-blur-md">

                                                        <Images
                                                            size={
                                                                14
                                                            }
                                                        />

                                                        {
                                                            category
                                                                .images
                                                                .length
                                                        }{" "}
                                                        Photos

                                                    </div>



                                                </div>

                                            </button>


                                            {/* Title + Description + Arrow */}
                                            <div className="flex items-center justify-between gap-4 px-5 py-5">

                                                <div className="min-w-0 flex-1">

                                                    <h3 className="text-xl font-bold tracking-tight text-[#102A43] sm:text-2xl">
                                                        {
                                                            category.name
                                                        }
                                                    </h3>

                                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                                                        {
                                                            category.description
                                                        }
                                                    </p>

                                                </div>


                                                {/* Right Arrow */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedCategory(
                                                            category
                                                        )
                                                    }
                                                    aria-label={`View ${category.name} gallery`}
                                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C8D5EA] bg-[#F2F6FF] text-[#102A43] transition-all duration-300 hover:border-[#3869D0]/40 hover:bg-[#3869D0] hover:text-white"
                                                >
                                                    <ArrowUpRight
                                                        size={
                                                            19
                                                        }
                                                    />
                                                </button>

                                            </div>

                                        </article>

                                    </ScrollReveal>
                                )
                            )}

                        </div>
                    )}


                {/* Category Images Modal */}
                {selectedCategory && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedCategory.name} gallery`}
                    >

                        <div className="relative flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl">

                            {/* Header */}
                            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6">

                                <div>

                                    <h2 className="text-xl font-bold text-[#102A43] sm:text-2xl">
                                        {
                                            selectedCategory.name
                                        }
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {
                                            selectedCategory
                                                .images
                                                .length
                                        }{" "}
                                        Photos
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        handleCategoryClose
                                    }
                                    aria-label="Close gallery"
                                    className="rounded-full border border-slate-200 bg-[#F2F6FF] p-2.5 text-slate-500 transition-all duration-300 hover:border-[#3869D0]/30 hover:bg-[#3869D0]/10 hover:text-[#102A43]"
                                >
                                    <X size={23} />
                                </button>

                            </div>


                            {/* Images */}
                            <div className="overflow-y-auto bg-[#F2F6FF] p-4 sm:p-5">

                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">

                                    {selectedCategory.images.map(
                                        (
                                            image,
                                            index
                                        ) => (
                                            <button
                                                key={`${image.src}-${index}`}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedImage(
                                                        image
                                                    )
                                                }
                                                aria-label={`View image ${index + 1}`}
                                                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/70 bg-white shadow-[0_8px_25px_rgba(16,42,67,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(16,42,67,0.15)]"
                                            >

                                                <Image
                                                    src={
                                                        image.src
                                                    }
                                                    alt={
                                                        image.alt
                                                    }
                                                    fill
                                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                                    quality={100}
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />

                                                <div className="absolute inset-0 bg-[#102A43]/0 transition-all duration-500 group-hover:bg-[#102A43]/25" />

                                                <div className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/80 px-2.5 py-1 text-xs font-semibold text-[#102A43] opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                                                    {String(
                                                        index +
                                                            1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>

                                                <div className="absolute inset-0 flex items-center justify-center">

                                                    <div className="flex h-11 w-11 scale-75 items-center justify-center rounded-full border border-white/40 bg-white/80 text-[#102A43] opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">

                                                        <Images
                                                            size={
                                                                19
                                                            }
                                                        />

                                                    </div>

                                                </div>

                                            </button>
                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>
                )}


                {/* Fullscreen Viewer */}
                {selectedImage &&
                    selectedCategory && (
                        <div
                            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07192B]/95 p-4 backdrop-blur-md"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Full screen gallery image"
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedImage(
                                        null
                                    )
                                }
                                aria-label="Close image viewer"
                                className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:right-7 sm:top-7"
                            >
                                <X size={24} />
                            </button>


                            <button
                                type="button"
                                onClick={
                                    handlePreviousImage
                                }
                                aria-label="Previous image"
                                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:left-7 sm:h-12 sm:w-12"
                            >
                                <ChevronLeft
                                    size={27}
                                />
                            </button>


                            <div className="relative h-[78vh] w-full max-w-6xl">

                                <Image
                                    src={
                                        selectedImage.src
                                    }
                                    alt={
                                        selectedImage.alt
                                    }
                                    fill
                                    sizes="100vw"
                                    quality={100}
                                    className="object-contain"
                                />

                            </div>


                            <button
                                type="button"
                                onClick={
                                    handleNextImage
                                }
                                aria-label="Next image"
                                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:right-7 sm:h-12 sm:w-12"
                            >
                                <ChevronRight
                                    size={27}
                                />
                            </button>


                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                                {getImageIndex()}{" "}
                                /{" "}
                                {
                                    selectedCategory
                                        .images
                                        .length
                                }
                            </div>

                        </div>
                    )}

            </div>
        </section>
    );
};

export default Gallery;