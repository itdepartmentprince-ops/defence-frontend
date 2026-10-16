const BlogTable = ({ headers = [], rows = [] }) => {
    if (!Array.isArray(headers) || !Array.isArray(rows)) return null;
    if (headers.length === 0 && rows.length === 0) return null;

    return (
        <div className="my-8 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,35,65,0.08)] sm:my-10">
            <table className="w-full table-auto border-collapse text-left">
                <thead>
                    <tr className="bg-gradient-to-r from-[var(--navy)] to-[#234779] text-white">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                scope="col"
                                className="min-w-0 break-words border-b-2 border-r border-amber-400/50 px-3 py-3 text-xs font-bold leading-5 last:border-r-0 sm:px-4 sm:py-3.5 sm:text-sm md:px-5"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={`transition-colors duration-150 hover:bg-amber-50/70 ${
                                rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/80"
                            }`}
                        >
                            {Array.isArray(row) &&
                                row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`min-w-0 break-words border-b border-r border-slate-200/80 px-3 py-3 align-top text-xs leading-5 text-slate-700 last:border-r-0 sm:px-4 sm:py-3.5 sm:text-sm sm:leading-6 md:px-5 ${
                                            rowIndex === rows.length - 1
                                                ? "border-b-0"
                                                : ""
                                        }`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogTable;
