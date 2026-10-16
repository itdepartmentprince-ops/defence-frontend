// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { CalendarDays, ChevronLeft, ChevronRight, FileText } from "lucide-react";
// import { getQuizArchiveDates } from "@/services/quizService";

// const PAGE_SIZE = 10;

// const formatDate = (dateKey) =>
//   new Date(`${dateKey}T12:00:00+05:30`).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

// export default function QuizArchiveDates({ fullPage = false }) {
//   const [dates, setDates] = useState([]);
//   const [page, setPage] = useState(1);
//   const [pageCount, setPageCount] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     const loadDates = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const response = await getQuizArchiveDates({
//           page,
//           limit: PAGE_SIZE,
//         });

//         if (cancelled) return;
//         setDates(response.dates || []);
//         setPageCount(response.pagination?.totalPages || 0);
//         setTotal(response.pagination?.total || 0);
//       } catch (loadError) {
//         if (!cancelled) {
//           setError(loadError.message || "Unable to load previous quizzes.");
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     void loadDates();
//     return () => {
//       cancelled = true;
//     };
//   }, [page]);

//   return (
//     <section
//       className={`mx-auto max-w-7xl px-4 md:px-6 ${
//         fullPage ? "pb-20 pt-8 md:pt-10" : "pb-16 pt-10"
//       }`}
//     >
//       <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="text-xs font-bold tracking-[0.16em] text-[#3869D0]">
//             QUIZ ARCHIVE
//           </p>
//           <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)]">
//             {fullPage ? "Previous Quiz Days" : "Previous Quizzes"}
//           </h2>
//           <p className="mt-2 text-sm text-slate-500">
//             Choose a date to attempt its published quiz.
//             {total > 0 ? ` ${total} quiz dates available.` : ""}
//           </p>
//         </div>
//         {!fullPage && (
//           <Link
//             href="/quiz/archive"
//             className="inline-flex items-center gap-2 text-sm font-extrabold text-[#3869D0] hover:text-[#244A9A]"
//           >
//             View all quiz dates <FileText size={16} />
//           </Link>
//         )}
//       </div>

//       {loading ? (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {Array.from({ length: PAGE_SIZE }, (_, index) => (
//             <div
//               key={index}
//               className="h-36 animate-pulse rounded-3xl border border-[#D8E2F0] bg-white"
//             />
//           ))}
//         </div>
//       ) : error ? (
//         <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
//           {error}
//         </div>
//       ) : dates.length === 0 ? (
//         <div className="rounded-3xl border border-dashed border-[#C8D5EA] bg-white p-10 text-center text-sm text-slate-500">
//           Previous quizzes will appear here after questions are published for earlier dates.
//         </div>
//       ) : (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {dates.map((day) => (
//             <Link
//               key={day.dateKey}
//               href={`/quiz/archive/${day.dateKey}`}
//               className="group rounded-3xl border border-[#D8E2F0] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#3869D0]/40 hover:shadow-lg"
//             >
//               <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3869D0]/10 text-[#3869D0]">
//                 <CalendarDays size={21} />
//               </span>
//               <h3 className="mt-5 text-lg font-extrabold text-[var(--navy)]">
//                 {formatDate(day.dateKey)}
//               </h3>
//               <p className="mt-1 text-sm text-slate-500">
//                 {day.questionCount} questions
//               </p>
//               <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-[#3869D0]">
//                 Attempt this quiz <FileText size={14} />
//               </span>
//             </Link>
//           ))}
//         </div>
//       )}

//       {pageCount > 1 && (
//         <nav
//           className="mt-8 flex items-center justify-center gap-3"
//           aria-label="Quiz archive pages"
//         >
//           <button
//             type="button"
//             onClick={() => setPage((current) => Math.max(1, current - 1))}
//             disabled={loading || page <= 1}
//             className="inline-flex items-center gap-2 rounded-xl border border-[#D8E2F0] bg-white px-4 py-2.5 text-sm font-extrabold text-[#3869D0] disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             <ChevronLeft size={16} /> Previous
//           </button>
//           <span className="text-sm font-bold text-slate-500">
//             Page {page} of {pageCount}
//           </span>
//           <button
//             type="button"
//             onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
//             disabled={loading || page >= pageCount}
//             className="inline-flex items-center gap-2 rounded-xl border border-[#D8E2F0] bg-white px-4 py-2.5 text-sm font-extrabold text-[#3869D0] disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             Next <ChevronRight size={16} />
//           </button>
//         </nav>
//       )}
//     </section>
//   );
// }
