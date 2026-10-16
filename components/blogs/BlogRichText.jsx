import { getSafeBlogUrl } from "./safeBlogUrl";

const BlogRichText = ({ items = [] }) => {
    if (!Array.isArray(items)) {
        return null;
    }

    return (
        <>
            {items.map((item, index) => {
                if (
                    !item ||
                    typeof item.text !==
                        "string"
                ) {
                    return null;
                }

                let content = item.text;

                if (item.bold) {
                    content = (
                        <strong>
                            {content}
                        </strong>
                    );
                }

                if (item.italic) {
                    content = (
                        <em>
                            {content}
                        </em>
                    );
                }

                if (item.underline) {
                    content = (
                        <u>
                            {content}
                        </u>
                    );
                }

                const safeUrl = getSafeBlogUrl(item.url);

                if (safeUrl) {
                    content = (
                        <a
                            href={safeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium underline underline-offset-2 transition hover:opacity-70"
                        >
                            {content}
                        </a>
                    );
                }

                return (
                    <span
                        key={index}
                        style={
                            item.color
                                ? {
                                      color: item.color,
                                  }
                                : undefined
                        }
                    >
                        {content}
                    </span>
                );
            })}
        </>
    );
};

export default BlogRichText;