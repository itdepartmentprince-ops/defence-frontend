import BlogRichText from "./BlogRichText";

const BlogList = ({ items = [], listType = "unordered" }) => {
    if (!Array.isArray(items)) return null;

    const isOrdered = listType === "ordered";
    const ListTag = isOrdered ? "ol" : "ul";

    return (
        <ListTag
            className={`my-6 space-y-3 pl-5 text-[15px] leading-7 text-gray-700 marker:font-bold marker:text-[#C9A227] sm:my-8 sm:pl-6 sm:text-lg sm:leading-8 ${
                isOrdered ? "list-decimal" : "list-disc"
            }`}
        >
            {items.map((item, index) => (
                <li key={index} className="pl-2">
                    <BlogRichText items={item} />
                </li>
            ))}
        </ListTag>
    );
};

export default BlogList;
