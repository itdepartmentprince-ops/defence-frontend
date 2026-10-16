import BlogCard from "./BlogCard";
import ScrollReveal from "../animations/ScrollReveal";

const BlogGrid = ({ blogs = [] }) => {
    if (!Array.isArray(blogs) || blogs.length === 0) {
        return (
            <div className="flex min-h-56 items-center justify-center rounded-2xl border border-dashed border-[#C8D5EA] bg-[#F8FAFF] px-6 py-10">
                <div className="text-center">
                    <p className="text-base font-semibold text-[var(--navy)] sm:text-lg">
                        No blogs found
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                        Try a different search or choose another category.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-8">
            {blogs.map((blog, index) => (
                <ScrollReveal
                    key={blog._id}
                    className="h-full"
                    animation="up"
                    delay={(index % 3) * 80}
                    duration={650}
                    distance={24}
                >
                    <BlogCard blog={blog} />
                </ScrollReveal>
            ))}
        </div>
    );
};

export default BlogGrid;
