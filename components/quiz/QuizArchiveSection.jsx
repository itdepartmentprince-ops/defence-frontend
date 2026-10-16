// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, FileText } from "lucide-react";

// import { getQuizArchive } from "@/services/quizService";

// const getIndiaDateKey = (offsetDays = 0) => {
//   const parts = new Intl.DateTimeFormat("en-CA", {
//     timeZone: "Asia/Kolkata",
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   }).formatToParts(new Date());
//   const values = Object.fromEntries(
//     parts
//       .filter((part) => part.type !== "literal")
//       .map((part) => [part.type, part.value])
//   );
//   const date = new Date(
//     Date.UTC(
//       Number(values.year),
//       Number(values.month) - 1,
//       Number(values.day) + offsetDays
//     )
//   );
//   return date.toISOString().slice(0, 10);
// };

// const formatDate = (dateKey) =>
//   new Date(`${dateKey}T00:00:00`).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

// export default function QuizArchiveSection() {
//   const [archive, setArchive] = useState([]);
//   const [archivePage, setArchivePage] = useState(1);
//   const [archivePageCount, setArchivePageCount] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const archivePageSize = 3;

//   useEffect(() => {
//     let cancelled = false;

//     const loadArchive = async () => {
//       const dates = Array.from({ length: 7 }, (_, index) => getIndiaDateKey(-index));

//       try {
//         const results = await Promise.all(
//           dates.map(async (date) => {
//             const payload = await getQuizArchive(date);
//             return { date, questions: payload.questions || [] };
//           })
//         );

//         if (cancelled) return;

//         const completedArchive = results
//           .filter((result) => result.questions.length)
//           .map((result) => ({
//             date: result.date,
//             questions: result.questions,
//           }));

//         setArchive(completedArchive);
//         setArchivePageCount(
//           Math.max(1, Math.ceil(completedArchive.length / archivePageSize))
//         );
//         setArchivePage(1);
//       } catch (loadError) {
//         if (!cancelled) {
//           setError(loadError.message || "Unable to load previous quiz questions.");
//         }
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     loadArchive();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return (
//     <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
//       <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <p className="text-xs font-bold tracking-[0.16em] text-[#3869D0]">QUESTION ARCHIVE</p>
//           <h2 className="mt-2 text-3xl font-extrabold text-[var(--navy)]">Previous Day Questions</h2>
//           <p className="mt-2 text-sm text-slate-500">Review questions, correct answers, and explanations from the last seven days.</p>
//         </div>
//         <Link href="/quiz/archive" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#3869D0] hover:text-[#244A9A]">
//           View full archive <FileText size={16} />
//         </Link>
//       </div>

//       {loading ? (
//         <div className="grid gap-5 md:grid-cols-2">
//           {Array.from({ length: 4 }).map((_, index) => (
//             <div key={index} className="h-48 animate-pulse rounded-3xl border border-[#D8E2F0] bg-white" />
//           ))}
//         </div>
//       ) : error ? (
//         <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">{error}</div>
//       ) : archive.length === 0 ? (
//         <div className="rounded-3xl border border-dashed border-[#C8D5EA] bg-white p-10 text-center text-sm text-slate-500">
//           Previous quiz questions will appear here after they are published.
//         </div>
//       ) : (
//         <div className="space-y-8">
//           {archive
//             .slice(
//               (archivePage - 1) * archivePageSize,
//               archivePage * archivePageSize
//             )
//             .map((day) => (
//             <div key={day.date} className="rounded-3xl border border-[#D8E2F0] bg-white p-5 shadow-sm md:p-7">
//               <div className="flex flex-col gap-4 border-b border-[#EDF1F7] pb-5 sm:flex-row sm:items-center sm:justify-between">
//                 <div className="flex items-center gap-3">
//                   <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3869D0]/10 text-[#3869D0]"><CalendarDays size={21} /></span>
//                   <div>
//                     <h3 className="text-lg font-extrabold text-[var(--navy)]">{formatDate(day.date)}</h3>
//                     <p className="text-xs text-slate-500">{day.questions.length} questions</p>
//                   </div>
//                 </div>
//                 <Link href={`/quiz/archive/${day.date}`} className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#F4F7FC] px-4 py-2.5 text-xs font-extrabold text-[#3869D0] transition hover:bg-[#3869D0] hover:text-white">
//                   Open day <FileText size={15} />
//                 </Link>
//               </div>

//               <div className="mt-5 grid gap-4">
//                 {day.questions.map((question, questionIndex) => (
//                   <article key={question._id} className="rounded-2xl border border-[#E5EBF4] bg-[#FBFCFF] p-5">
//                     <div className="flex flex-wrap items-center justify-between gap-3">
//                       <span className="rounded-full bg-[#3869D0]/10 px-3 py-1 text-xs font-bold text-[#3869D0]">Q{questionIndex + 1}</span>
//                       <span className="text-xs font-bold text-slate-500">{question.subject || question.category || "General Knowledge"}</span>
//                     </div>
//                     <h4 className="mt-4 text-base font-extrabold leading-7 text-[var(--navy)]">{question.text?.en || question.text || "Question text unavailable"}</h4>
//                     {question.text?.hi && <p className="mt-2 text-sm leading-6 text-slate-500">{question.text.hi}</p>}
//                     <div className="mt-4 grid gap-2 sm:grid-cols-2">
//                       {(question.options || []).map((option, optionIndex) => (
//                         <div key={`${question._id}-${optionIndex}`} className={`flex gap-3 rounded-xl border p-3 text-sm ${optionIndex === question.correctIndex ? "border-green-200 bg-green-50 text-green-800" : "border-[#E5EBF4] bg-white text-slate-700"}`}>
//                           <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-xs font-extrabold shadow-sm">{String.fromCharCode(65 + optionIndex)}</span>
//                           <span className="leading-6">{option}</span>
//                           {optionIndex === question.correctIndex && <CheckCircle2 size={17} className="ml-auto shrink-0" />}
//                         </div>
//                       ))}
//                     </div>
//                     {question.explanation && (
//                       <div className="mt-4 rounded-xl bg-[#F4F7FC] p-4 text-sm leading-6 text-slate-600">
//                         <strong className="text-[var(--navy)]">Explanation:</strong> {question.explanation}
//                       </div>
//                     )}
//                   </article>
//                 ))}
//               </div>
//             </div>
//           ))}

//           {archivePageCount > 1 && (
//             <nav className="flex items-center justify-center gap-3" aria-label="Question archive pages">
//               <button
//                 type="button"
//                 onClick={() => setArchivePage((page) => Math.max(1, page - 1))}
//                 disabled={archivePage === 1}
//                 className="inline-flex items-center gap-2 rounded-xl border border-[#D8E2F0] bg-white px-4 py-2.5 text-sm font-extrabold text-[#3869D0] disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 <ChevronLeft size={16} /> Previous
//               </button>
//               <span className="text-sm font-bold text-slate-500">
//                 Page {archivePage} of {archivePageCount}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => setArchivePage((page) => Math.min(archivePageCount, page + 1))}
//                 disabled={archivePage === archivePageCount}
//                 className="inline-flex items-center gap-2 rounded-xl border border-[#D8E2F0] bg-white px-4 py-2.5 text-sm font-extrabold text-[#3869D0] disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 Next <ChevronRight size={16} />
//               </button>
//             </nav>
//           )}
//         </div>
//       )}
//     </section>
//   );
// }
