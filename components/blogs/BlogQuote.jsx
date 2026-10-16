import { Quote } from "lucide-react";
import BlogRichText from "./BlogRichText";

const BlogQuote = ({ content = [] }) => {
    return (
        <blockquote className="relative my-8 overflow-hidden rounded-xl border border-[#DCE5F5] bg-[#F7F9FD] px-5 pb-7 pt-6 sm:my-10 sm:rounded-2xl sm:px-8 sm:pb-9 sm:pt-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#3869D0] text-white sm:h-11 sm:w-11">
                <Quote size={20} />
            </div>

            <div className="text-base font-medium leading-7 text-[var(--navy)] sm:text-xl sm:leading-9">
                <BlogRichText items={content} />
            </div>

            <div aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#3869D0] to-[#C9A227]" />
        </blockquote>
    );
};

export default BlogQuote;
