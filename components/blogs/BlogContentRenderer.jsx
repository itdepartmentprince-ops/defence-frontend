import Image from "next/image";
import BlogRichText from "./BlogRichText";
import BlogQuote from "./BlogQuote";
import BlogList from "./BlogList";
import BlogTable from "./BlogTable";
import BlogFaq from "./BlogFaq";
import BlogCTA from "./BlogCTA";
import ScrollReveal from "../animations/ScrollReveal";
import { getSafeBlogUrl } from "./safeBlogUrl";

const BlogContentRenderer = ({
    content = [],
    fluidImages = false,
}) => {
    if (!Array.isArray(content)) return null;

    const renderBlock = (block, index) => {
        switch (block.type) {
            case "heading":
                return (
                    <h2
                        id={`blog-heading-${index}`}
                        className="mb-4 mt-10 scroll-mt-28 border-l-4 border-[#C9A227] pl-4 text-xl font-extrabold leading-snug tracking-tight text-[var(--navy)] sm:mb-5 sm:mt-12 sm:text-2xl lg:text-3xl"
                    >
                        <BlogRichText items={block.content} />
                    </h2>
                );

            case "paragraph":
                return (
                    <p className="mb-5 text-[15px] leading-7 text-gray-700 sm:mb-6 sm:text-lg sm:leading-9">
                        <BlogRichText items={block.content} />
                    </p>
                );

            case "quote":
                return <BlogQuote content={block.content} />;

            case "list":
                return (
                    <BlogList
                        items={block.items}
                        listType={block.listType || "unordered"}
                    />
                );

            case "table":
                return (
                    <BlogTable
                        headers={block.headers}
                        rows={block.rows}
                    />
                );

            case "faq":
                return <BlogFaq items={block.items} />;

            case "link": {
                const safeLinkUrl = getSafeBlogUrl(block.url);

                return (
                    <div className="my-6">
                        {safeLinkUrl ? (
                            <a
                                href={safeLinkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-[#3869D0] underline underline-offset-4 transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3869D0]"
                            >
                                {block.text}
                            </a>
                        ) : (
                            block.text
                        )}
                    </div>
                );
            }

            case "image": {
                const safeImageLink = getSafeBlogUrl(block.link);
                const image = fluidImages ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={block.url}
                        alt={block.alt || ""}
                        loading="lazy"
                        className="h-auto w-full rounded-xl object-contain shadow-sm sm:rounded-2xl"
                    />
                ) : (
                    <Image
                        src={block.url}
                        alt={block.alt || ""}
                        width={1200}
                        height={800}
                        sizes="(max-width: 768px) 100vw, 800px"
                        quality={85}
                        className="h-auto w-full rounded-xl object-contain shadow-sm sm:rounded-2xl"
                    />
                );

                return (
                    <figure className="my-8 sm:my-10">
                        {block.url &&
                            (safeImageLink ? (
                                <a
                                    href={safeImageLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    {image}
                                </a>
                            ) : (
                                image
                            ))}

                        {block.caption && (
                            <figcaption className="mt-3 text-center text-xs text-gray-500 sm:text-sm">
                                {block.caption}
                            </figcaption>
                        )}
                    </figure>
                );
            }

            default:
                return null;
        }
    };

    return (
        <div className="w-full min-w-0 break-words">
            {content.map((block, index) => {
                if (!block) return null;

                return (
                    <ScrollReveal
                        key={index}
                        animation="up"
                        delay={(index % 3) * 70}
                        duration={600}
                        distance={22}
                    >
                        {renderBlock(block, index)}
                    </ScrollReveal>
                );
            })}

            <ScrollReveal animation="up" duration={650} distance={24}>
                <BlogCTA />
            </ScrollReveal>
        </div>
    );
};

export default BlogContentRenderer;