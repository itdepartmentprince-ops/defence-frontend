"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import {
  startQuizAttempt,
  saveQuizAnswer,
  submitQuizAttempt,
  // getPublicQuizCategories,
  // getLeaderboard,
} from "@/services/quizService";
// import QuizArchiveDates from "@/components/quiz/QuizArchiveDates";

// Lottie animation shown in the quiz header. Replace the URL with any .lottie / .json animation.
const QUIZ_LOTTIE_SRC =
  "https://lottie.host/c2752204-0cec-41df-a3ff-40e47ec9fc89/er8HN6i2ly.lottie";

const VISITOR_KEY = "pd_visitor_id";
const NAME_KEY = "pd_quiz_name";
const PHONE_KEY = "pd_quiz_phone";

const getVisitorId = () => {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem(VISITOR_KEY);

  if (!id) {
    id =
      window.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`;

    localStorage.setItem(VISITOR_KEY, id);
  }

  return id;
};

const formatTime = (seconds) => {
  const safe = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safe / 60);
  const secondsLeft = safe % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    secondsLeft
  ).padStart(2, "0")}`;
};

const getQuestionText = (question) => {
  if (!question) return "";

  if (typeof question === "string") {
    return question;
  }

  if (typeof question.text === "string") {
    return question.text;
  }

  return question.text?.en || question.text?.hi || "";
};

const getQuestionHindi = (question) => {
  if (!question || typeof question === "string") {
    return "";
  }

  return question.text?.hi || "";
};

const getCategory = (question) =>
  question?.subject ||
  question?.category ||
  "General Knowledge";

// const getInitials = (name = "") =>
//   name
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((part) => part[0])
//     .join("")
//     .toUpperCase();

const getDisplayError = (error) => {
  if (error?.isConfigurationError) {
    return "Quiz API configuration is missing. Set NEXT_PUBLIC_API_URL and refresh the page.";
  }

  if (error?.isNetworkError) {
    return "The quiz server is not reachable. Check your connection and try again.";
  }

  return error?.message || "Unable to load the quiz.";
};

/* ------------------------------------------------------------------ */
/* Shared animation styles                                             */
/* ------------------------------------------------------------------ */
function QuizStyles() {
  return (
    <style>{`
      @keyframes pc-shimmer { 0% { transform: translateX(-130%) skewX(-20deg); } 100% { transform: translateX(330%) skewX(-20deg); } }
      @keyframes pc-bob { 0%, 100% { transform: translateY(-2px); } 50% { transform: translateY(3px); } }
      @keyframes pc-float { 0%, 100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-18px,0); } }
      @keyframes pc-pop { 0% { transform: scale(.4); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
      @keyframes pc-rise { 0% { transform: translateY(14px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
      .pc-shimmer { animation: pc-shimmer 2.8s ease-in-out infinite; }
      .pc-bob { animation: pc-bob 1.6s ease-in-out infinite; }
      .group:hover .pc-bob { animation-duration: .7s; }
      .pc-float { animation: pc-float 9s ease-in-out infinite; }
      .pc-pop { animation: pc-pop .4s ease-out both; }
      .pc-rise { animation: pc-rise .45s ease-out both; }
      @media (prefers-reduced-motion: reduce) {
        .pc-shimmer, .pc-bob, .pc-float, .pc-pop, .pc-rise { animation: none !important; }
      }
    `}</style>
  );
}

/* Gold shimmer button (primary CTA) */
const Shimmer = () => (
  <span
    aria-hidden="true"
    className="pc-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent"
  />
);

export default function DailyQuizClient() {
  // Previous quiz support is temporarily disabled.
  // export default function DailyQuizClient({ archiveDate = "" }) {
  // const isArchive = Boolean(archiveDate);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [starting, setStarting] = useState(false);

  const [started, setStarted] = useState(false);
  const [attemptId, setAttemptId] = useState("");
  const [visitorId, setVisitorId] = useState("");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const expiresAtRef = useRef(null);

  const [result, setResult] = useState(null);

  // const [categories, setCategories] = useState([]);
  // const [leaderboard, setLeaderboard] = useState([]);

  // const [dataError, setDataError] = useState("");

  const [savingAnswer, setSavingAnswer] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submittingRef = useRef(false);
  const nameInputRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  const answeredCount = Object.keys(answers).length;

  const totalQuestions = questions.length;

  const selectedIndex = currentQuestion
    ? answers[String(currentQuestion._id)]
    : undefined;

  useEffect(() => {
    const id = getVisitorId();

    setVisitorId(id);

    const savedName = localStorage.getItem(NAME_KEY);
    const savedPhone = localStorage.getItem(PHONE_KEY);

    if (savedName) setName(savedName);
    if (savedPhone) setPhoneNumber(savedPhone);
  }, []);

  useEffect(() => {
    if (!showForm) return;

    const timer = setTimeout(() => {
      nameInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [showForm]);

  useEffect(() => {
    if (!showForm) return;

    const handleEscape = (event) => {
      if (event.key === "Escape" && !starting) {
        setShowForm(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showForm, starting]);

  useEffect(() => {
    if (!started || !expiresAtRef.current) {
      return;
    }

    const updateTimer = () => {
      const expiresAt = new Date(
        expiresAtRef.current
      ).getTime();

      const seconds = Math.max(
        0,
        Math.ceil((expiresAt - Date.now()) / 1000)
      );

      setRemainingSeconds(seconds);

      if (seconds <= 0 && !submittingRef.current) {
        submitQuiz(true);
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [started]);

  const handleStartClick = (subject = "all") => {
    setSelectedSubject(subject);

    if (visitorId && name && phoneNumber) {
      void handleStart(null, subject);
      return;
    }

    setShowForm(true);
  };

  const handleStart = async (event, subject = selectedSubject) => {
    event?.preventDefault();

    if (starting) return;

    const cleanName = name.trim();
    const cleanPhone = phoneNumber.trim();

    if (cleanName.length < 2 || cleanName.length > 50) {
      toast.error(
        "Name must be between 2 and 50 characters."
      );
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      toast.error(
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    try {
      setStarting(true);
      const activeVisitorId = visitorId || getVisitorId();

      localStorage.setItem(NAME_KEY, cleanName);
      localStorage.setItem(PHONE_KEY, cleanPhone);
      localStorage.setItem(VISITOR_KEY, activeVisitorId);
      setName(cleanName);
      setPhoneNumber(cleanPhone);
      setVisitorId(activeVisitorId);

      const response = await startQuizAttempt({
        name: cleanName,
        phoneNumber: cleanPhone,
        visitorId: activeVisitorId,
        subject,
        // dateKey: archiveDate,
      });

      if (response?.alreadyCompleted) {
        toast.error(
          "You have already completed today's quiz."
        );
        return;
      }

      if (!response?.questions?.length) {
        toast.error(
          "No quiz questions are available today."
        );
        return;
      }

      setAttemptId(
        response.attemptId ||
          response.attempt?._id ||
          ""
      );

      setVisitorId(
        response.visitorId ||
          visitorId ||
          getVisitorId()
      );

      setQuestions(response.questions || []);
      setAnswers(response.answers || {});
      setSelectedSubject(response.subject || subject);

      const firstUnanswered = (
        response.questions || []
      ).findIndex(
        (question) =>
          response.answers?.[
            String(question._id)
          ] === undefined
      );

      setCurrentIndex(
        firstUnanswered >= 0
          ? firstUnanswered
          : 0
      );

      expiresAtRef.current =
        response.expiresAt ||
        response.attempt?.expiresAt;

      const remaining = expiresAtRef.current
        ? Math.max(
            0,
            Math.ceil(
              (new Date(
                expiresAtRef.current
              ).getTime() -
                Date.now()) /
                1000
            )
          )
        : 0;

      if (!expiresAtRef.current) {
        toast.error(
          "Quiz expiry time was not received from server."
        );
        return;
      }

      if (remaining <= 0) {
        toast.error(
          "This quiz session has already expired."
        );
        return;
      }

      setRemainingSeconds(remaining);
      setStarted(true);
      setShowForm(false);
    } catch (error) {
      const payload = error?.payload || {};

      if (payload.alreadyCompleted) {
        toast.error(
          "You have already completed today's quiz."
        );
        return;
      }

      if (payload.expired) {
        toast.error(
          "Your quiz session has expired."
        );
        return;
      }

      toast.error(getDisplayError(error));
    } finally {
      setStarting(false);
    }
  };

  const handleAnswer = async (index) => {
    if (
      savingAnswer ||
      submitting ||
      !currentQuestion
    ) {
      return;
    }

    if (remainingSeconds <= 0) {
      await submitQuiz(true);
      return;
    }

    try {
      setSavingAnswer(true);

      const questionId = String(
        currentQuestion._id
      );

      await saveQuizAnswer({
        attemptId,
        visitorId,
        questionId,
        selected: index,
      });

      setAnswers((previous) => ({
        ...previous,
        [questionId]: index,
      }));
      setCurrentIndex((previous) =>
        Math.min(previous + 1, totalQuestions - 1)
      );
    } catch (error) {
      const payload = error?.payload || {};

      if (payload.expired) {
        await submitQuiz(true);
        return;
      }

      toast.error(getDisplayError(error));
    } finally {
      setSavingAnswer(false);
    }
  };

  const submitQuiz = async (automatic = false) => {
    if (
      submittingRef.current ||
      !attemptId
    ) {
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const response =
        await submitQuizAttempt({
          attemptId,
          visitorId,
          timeTakenMs: 0,
        });

      setResult(response?.result || null);
      setStarted(false);
      setRemainingSeconds(0);
      expiresAtRef.current = null;

      if (automatic) {
        toast.success(
          "Quiz submitted automatically."
        );
      }
    } catch (error) {
      toast.error(
        error?.message ||
          "Unable to submit quiz."
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setStarted(false);
    setResult(null);
    setQuestions([]);
    setAnswers({});
    setAttemptId("");
    setCurrentIndex(0);
    setRemainingSeconds(0);
    expiresAtRef.current = null;
    setShowForm(false);
  };

  if (result) {
    return (
      <QuizResult
        result={result}
        onRestart={resetQuiz}
      />
    );
  }

  if (started && currentQuestion) {
    return (
      <QuizScreen
        question={currentQuestion}
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        selectedIndex={selectedIndex}
        answeredCount={answeredCount}
        remainingSeconds={remainingSeconds}
        savingAnswer={savingAnswer}
        submitting={submitting}
        onAnswer={handleAnswer}
        onPrevious={() =>
          setCurrentIndex(
            (previous) =>
              Math.max(0, previous - 1)
          )
        }
        onNext={() =>
          setCurrentIndex(
            (previous) =>
              Math.min(
                totalQuestions - 1,
                previous + 1
              )
          )
        }
        onSubmit={() =>
          submitQuiz(false)
        }
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F7FC]">
      <QuizStyles />

      {/*  HERO  */}
      <section className="relative isolate overflow-hidden bg-[#071b32]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_15%,rgba(184,146,66,0.22),transparent_34%),radial-gradient(ellipse_at_88%_82%,rgba(56,105,208,0.28),transparent_38%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/10 sm:h-[28rem] sm:w-[28rem]" />
        <div className="pointer-events-none absolute -right-10 -top-14 h-56 w-56 rounded-full border border-[#b89242]/20 sm:h-96 sm:w-96" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-30 sm:px-8 md:min-h-[640px] md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:pb-24 md:pt-32 lg:px-10">
          {/* Left */}
          <div className="max-w-2xl">
            <span className="pc-rise inline-flex items-center gap-2 rounded-full border border-[#b89242]/35 bg-[#b89242]/10 px-3.5 py-1.5 text-[10px] font-extrabold tracking-[0.18em] text-[#e7c36d] sm:px-4 sm:py-2 sm:text-[11px]">
              <span className="h-2 w-2 rounded-full bg-[#e7c36d] motion-safe:animate-pulse" />
              DAILY DEFENCE CHALLENGE
            </span>

            <h1 className="pc-rise mt-5 text-[2.5rem] font-black leading-[1.08] tracking-tight text-white [animation-delay:80ms] sm:mt-6 sm:text-6xl lg:text-[4.25rem]">
              Today&apos;s
              <span className="mt-1 block bg-gradient-to-r from-[#e7c36d] to-[#b89242] bg-clip-text text-transparent">
                Quiz
              </span>
            </h1>

            <p className="pc-rise mt-5 max-w-xl text-[15px] leading-7 text-white/70 [animation-delay:160ms] sm:mt-6 sm:text-lg sm:leading-8">
              Take today&apos;s timed challenge and review every answer when
              you finish.
            </p>

            <div className="pc-rise mt-8 flex flex-col items-stretch gap-4 [animation-delay:240ms] sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => handleStartClick()}
                className="group relative inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-2xl bg-gradient-to-b from-[#e7c36d] to-[#b89242] px-8 py-4 text-base font-extrabold text-[#071b32] shadow-[0_10px_30px_rgba(184,146,66,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(184,146,66,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e7c36d]/40 active:translate-y-0 active:scale-[0.98] sm:w-auto"
              >
                <Shimmer />
                <span className="relative">
                  Start Today&apos;s Quiz
                </span>
                <ArrowRight
                  size={19}
                  className="relative transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </button>

              <span className="flex items-center gap-2 text-sm font-medium text-white/60">
                <ShieldCheck size={17} className="shrink-0 text-[#e7c36d]" />
                One attempt per day
              </span>
            </div>

            <div className="pc-rise mt-9 grid grid-cols-1 gap-3 border-t border-white/10 pt-6 text-sm font-semibold text-white/80 [animation-delay:320ms] sm:mt-10 sm:flex sm:flex-wrap sm:gap-x-7">
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} className="text-[#e7c36d]" />
                Timed challenge
              </span>
              <span className="inline-flex items-center gap-2">
                <BookOpenCheck size={16} className="text-[#e7c36d]" />
                Answer review
              </span>
              <span className="inline-flex items-center gap-2">
                <Target size={16} className="text-[#e7c36d]" />
                Built for focus
              </span>
            </div>
          </div>

          {/* Right: preview card */}
          <div className="relative mx-auto w-full max-w-[430px] md:justify-self-end">
            <div className="pc-float absolute -inset-3 rounded-[2rem] border border-[#e7c36d]/20 bg-[#e7c36d]/5" />
            <div className="pc-float relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl [animation-delay:-2s] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#e7c36d]">
                    TODAY’S MISSION
                  </p>
                  <h2 className="mt-1 text-lg font-extrabold text-white">
                    Ready. Focus. Answer.
                  </h2>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-[#071b32]/70 p-4 sm:mt-7 sm:p-5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white/55">QUESTION 01</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-white/80">
                    <Clock3 size={13} />
                    On the clock
                  </span>
                </div>
                <p className="mt-4 text-base font-bold leading-7 text-white sm:text-lg">
                  Every question is a chance to move closer to your goal.
                </p>
                <div className="mt-5 space-y-2.5" aria-hidden="true">
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[10px] font-bold text-white/65">
                      A
                    </span>
                    <span className="h-2 w-2/3 rounded-full bg-white/25" />
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-[#e7c36d]/50 bg-[#b89242]/15 px-3.5 py-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e7c36d] text-[10px] font-extrabold text-[#071b32]">
                      B
                    </span>
                    <span className="h-2 w-1/2 rounded-full bg-[#e7c36d]/70" />
                    <CheckCircle2
                      size={16}
                      className="ml-auto text-[#e7c36d]"
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[10px] font-bold text-white/65">
                      C
                    </span>
                    <span className="h-2 w-3/4 rounded-full bg-white/25" />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#b89242]/15 text-[#e7c36d]">
                  <Trophy size={19} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Finish strong</p>
                  <p className="mt-0.5 text-xs text-white/55">
                    Your score and answer review are waiting at the end.
                  </p>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-5 -left-5 hidden h-20 w-20 rounded-3xl border border-[#e7c36d]/20 bg-[#b89242]/10 blur-[1px] sm:block" />
          </div>
        </div>
      </section>

      {/*  FEATURES  */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-8 md:py-16 lg:px-10">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-xs font-extrabold tracking-[0.18em] text-[#9b772f]">
            HOW IT WORKS
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#102a43] sm:text-3xl">
            Practice smarter, every single day
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {[
            {
              icon: Clock3,
              title: "Stay sharp under time",
              text: "A date-based timer keeps your daily practice focused.",
            },
            {
              icon: BookOpenCheck,
              title: "Learn from each answer",
              text: "Review the questions and correct answers after you finish.",
            },
            {
              icon: ShieldCheck,
              title: "Your daily attempt",
              text: "Enter your name and mobile number, then begin today’s quiz.",
            },
          ].map((feature, i) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-[#dfe6ef] bg-white p-5 shadow-[0_12px_35px_rgba(16,42,67,0.05)] transition duration-300 hover:-translate-y-1.5 hover:border-[#b89242]/50 hover:shadow-[0_22px_50px_rgba(16,42,67,0.12)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-3 text-5xl font-black text-[#102a43]/[0.05] transition-colors group-hover:text-[#b89242]/20"
                >
                  0{i + 1}
                </span>

                <h3 className="relative mt-5 text-base font-extrabold text-[#102a43] sm:text-lg">
                  {feature.title}
                </h3>

                <p className="relative mt-2 text-sm leading-6 text-slate-600">
                  {feature.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Previous quiz category-load error display is temporarily disabled.
      {dataError && (
        <div className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {dataError}
          </div>
        </div>
      )}
      */}

      {/* Previous quiz subject selection is temporarily disabled.
      {isArchive && (
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="mb-7">
          <p className="text-xs font-bold tracking-[0.16em] text-[#3869D0]">
            ARCHIVED QUIZ
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[var(--navy)] md:text-3xl">
            Choose a Subject
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Attempt all subjects or select one subject from this archived quiz.
          </p>
        </div>

        {categories.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={`rounded-3xl border p-5 text-left shadow-sm transition ${selectedSubject === "all" ? "border-[#3869D0] bg-[#3869D0] text-white ring-4 ring-[#3869D0]/10" : "border-[#D8E2F0] bg-white text-[var(--navy)]"}`}>
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${selectedSubject === "all" ? "bg-white/15" : "bg-[#3869D0]/10 text-[#3869D0]"}`}>
                <Trophy size={20} />
              </div>
              <h3 className="mt-5 font-extrabold">All Subjects</h3>
              <p className={`mt-1 text-xs ${selectedSubject === "all" ? "text-white/70" : "text-slate-500"}`}>
                {categories.reduce((total, category) => total + (category.questionCount || 0), 0)} questions
              </p>
              <button
                type="button"
                onClick={() => handleStartClick("all")}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#fbbf24] px-4 py-2.5 text-xs font-extrabold text-[#102a43] transition hover:bg-[#facc15]"
              >
                Start Quiz <ArrowRight size={15} />
              </button>
            </div>

            {categories.map((category, index) => {
              const subject = category.subject || category.category;
              const selected = selectedSubject === subject;

              return (
                <div
                  key={`${category._id || subject || index}`}
                  className={`rounded-3xl border p-5 text-left shadow-sm transition ${selected ? "border-[#3869D0] bg-[#3869D0] text-white ring-4 ring-[#3869D0]/10" : "border-[#D8E2F0] bg-white text-[var(--navy)]"}`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedSubject(subject)}
                    className="w-full text-left"
                    aria-label={`Select ${subject}`}
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${selected ? "bg-white/15" : "bg-[#3869D0]/10 text-[#3869D0]"}`}>
                      <Trophy size={20} />
                    </div>
                    <h3 className="mt-5 font-extrabold">{subject}</h3>
                    <p className={`mt-1 text-xs ${selected ? "text-white/70" : "text-slate-500"}`}>
                      {category.questionCount || 0} questions
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartClick(subject)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#fbbf24] px-4 py-2.5 text-xs font-extrabold text-[#102a43] transition hover:bg-[#facc15]"
                  >
                    Start Quiz <ArrowRight size={15} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-[#D8E2F0] bg-white p-8 text-center">
            <p className="font-bold text-[var(--navy)]">
              No subjects available yet.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Please check again later.
            </p>
          </div>
        )}
      </section>
      )}
      */}

      {/* Previous quiz dates are temporarily disabled; restore this component to re-enable.
      {!isArchive && <QuizArchiveDates />}
      */}

      {/* Frontend leaderboard is temporarily disabled. Backend API remains enabled.
      <section className="border-t border-[#D8E2F0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
          <h2 className="text-2xl font-extrabold text-[var(--navy)]">
            {isArchive ? "Archived Leaderboard" : "Today's Leaderboard"}
          </h2>

          <div className="mt-6 overflow-hidden rounded-3xl border border-[#D8E2F0]">
            {leaderboard.length ? (
              leaderboard
                .slice(0, 10)
                .map((player, index) => (
                  <div
                    key={
                      player.attemptId ||
                      player._id ||
                      index
                    }
                    className="flex items-center gap-4 border-b border-[#EDF1F7] px-4 py-4 last:border-0"
                  >
                    <span className="w-6 text-sm font-extrabold text-slate-400">
                      {index + 1}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3869D0]/10 text-xs font-extrabold text-[#3869D0]">
                      {getInitials(
                        player.name
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-bold text-[var(--navy)]">
                        {player.name ||
                          "Anonymous"}
                      </p>
                    </div>

                    <span className="text-sm font-extrabold text-[#3869D0]">
                      {player.percentage ?? 0}%
                    </span>
                  </div>
                ))
            ) : (
              <div className="p-8 text-center text-sm text-slate-500">
                No completed quizzes with 70% or higher yet.
              </div>
            )}
          </div>
        </div>
      </section>
      */}

      {showForm && (
        <QuizStartModal
          name={name}
          phoneNumber={phoneNumber}
          inputRef={nameInputRef}
          loading={starting}
          onNameChange={setName}
          onPhoneChange={setPhoneNumber}
          onClose={() => setShowForm(false)}
          onSubmit={handleStart}
        />
      )}
    </main>
  );
}

/* START MODAL                                                             */
function QuizStartModal({
  name,
  phoneNumber,
  inputRef,
  loading,
  onNameChange,
  onPhoneChange,
  onClose,
  onSubmit,
}) {
  // Previous quiz subject selection is temporarily disabled:
  // const subjects = [
  //   { subject: "all", label: "All Subjects" },
  //   ...categories.map((category) => ({
  //     subject: category.subject || category.category,
  //     label: category.subject || category.category,
  //   })),
  // ];

  const fieldClass =
    "w-full rounded-xl border border-[#D8E2F0] bg-[#F8FAFD] py-3.5 text-sm text-[var(--navy)] outline-none transition placeholder:text-slate-400 focus:border-[#3869D0] focus:bg-white focus:ring-4 focus:ring-[#3869D0]/10";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#07142d]/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-start-title"
    >
      <div
        className="pc-rise max-h-[94vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden bg-[#071b32] p-5 text-white sm:p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#b89242]/25 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-[0.18em] text-[#e7c36d]">
                <Sparkles size={13} />
                START QUIZ
              </p>

              <h2
                id="quiz-start-title"
                className="mt-1.5 text-xl font-extrabold sm:text-2xl"
              >
                Enter Your Details
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-white/60">
                Your details are used to record today’s attempt.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20 disabled:opacity-40"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5 p-5 sm:p-6"
        >
          <div>
            <label
              htmlFor="quiz-name"
              className="mb-2 block text-sm font-bold text-[var(--navy)]"
            >
              Name
            </label>

            <div className="relative">
              <UserRound
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="quiz-name"
                ref={inputRef}
                value={name}
                onChange={(event) =>
                  onNameChange(
                    event.target.value
                  )
                }
                maxLength={50}
                autoComplete="name"
                placeholder="Enter your name"
                className={`${fieldClass} pl-11 pr-3`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="quiz-phone"
              className="mb-2 block text-sm font-bold text-[var(--navy)]"
            >
              Mobile Number
            </label>

            <input
              id="quiz-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              autoComplete="tel"
              value={phoneNumber}
              onChange={(event) =>
                onPhoneChange(
                  event.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="10-digit mobile number"
              className={`${fieldClass} px-4`}
            />
          </div>

          {/* Previous quiz subject selection is temporarily disabled.
          {isArchive && (
            <div>
              <label className="mb-2 block text-sm font-bold text-[var(--navy)]">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(event) =>
                  onSubjectChange(event.target.value)
                }
                className="w-full rounded-xl border border-[#D8E2F0] bg-[#F8FAFD] px-3 py-3 text-sm outline-none focus:border-[#3869D0]"
              >
                {subjects.map((item) => (
                  <option key={item.subject} value={item.subject}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          */}

          <div className="flex items-start gap-2.5 rounded-xl border border-[#b89242]/25 bg-[#b89242]/10 p-3 text-xs leading-5 text-[#7a5d1f]">
            <ShieldCheck size={16} className="mt-0.5 shrink-0" />
            <span>
              One attempt is allowed per mobile number per day.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-[#4a7be0] to-[#3869D0] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(56,105,208,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(56,105,208,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3869D0]/30 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
          >
            {!loading && <Shimmer />}

            {loading ? (
              <>
                <RefreshCw
                  size={17}
                  className="animate-spin"
                />
                Starting...
              </>
            ) : (
              <>
                <span className="relative">
                  Start Quiz
                </span>
                <ArrowRight
                  size={17}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/* QUIZ SCREEN                                                             */
function QuizScreen({
  question,
  currentIndex,
  totalQuestions,
  selectedIndex,
  answeredCount,
  remainingSeconds,
  savingAnswer,
  submitting,
  onAnswer,
  onPrevious,
  onNext,
  onSubmit,
}) {
  const last =
    currentIndex === totalQuestions - 1;

  const answeredPercent =
    totalQuestions > 0
      ? Math.round(
          (answeredCount / totalQuestions) * 100
        )
      : 0;

  const timerState =
    remainingSeconds <= 60
      ? "danger"
      : remainingSeconds <= 180
        ? "warn"
        : "ok";

  const timerClass = {
    ok: "border-[#D8E2F0] bg-[#F4F7FC] text-[var(--navy)]",
    warn: "border-amber-300 bg-amber-50 text-amber-700",
    danger:
      "border-red-300 bg-red-50 text-red-600 motion-safe:animate-pulse",
  }[timerState];

  const busy = savingAnswer || submitting;

  const prevButton = (
    <button
      type="button"
      onClick={onPrevious}
      disabled={currentIndex === 0 || busy}
      aria-label="Previous question"
      className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#D8E2F0] bg-white px-3 text-xs font-bold text-[var(--navy)] transition hover:border-[#3869D0]/40 hover:bg-[#F8FAFD] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 sm:h-12 sm:gap-2 sm:px-4 sm:text-sm lg:px-5"
    >
      <ArrowLeft
        size={17}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
      <span className="hidden lg:inline">
        Previous
      </span>
    </button>
  );

  const nextButton = !last && (
    <button
      type="button"
      onClick={onNext}
      disabled={busy}
      className="group inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#3869D0]/30 bg-[#3869D0]/5 px-3 text-xs font-bold text-[#3869D0] transition hover:bg-[#3869D0]/10 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 sm:h-12 sm:gap-2 sm:px-5 sm:text-sm lg:flex-none"
    >
      <span>
        {selectedIndex !== undefined
          ? "Next Question"
          : "Skip & Next"}
      </span>

      <ArrowRight
        size={17}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );

  const submitButton = (
    <button
      type="button"
      onClick={onSubmit}
      disabled={busy}
      className="group relative inline-flex h-10 flex-1 items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-b from-[#e7c36d] to-[#b89242] px-4 text-[9px] font-extrabold text-[#071b32] shadow-[0_10px_25px_rgba(184,146,66,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(184,146,66,0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#e7c36d]/40 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 sm:h-12 sm:gap-2 sm:px-6 sm:text-sm lg:flex-none lg:px-7"
    >
      {!submitting && <Shimmer />}

      <span className="relative">
        {submitting ? "Submitting..." : "Submit"}
      </span>

      {!submitting && (
        <CheckCircle2
          size={17}
          className="pc-bob relative"
        />
      )}
    </button>
  );

  return (
    <main className="min-h-screen bg-[#F4F7FC] pb-14">
      <QuizStyles />

      <header className="relative overflow-hidden bg-gradient-to-r from-[#EEF3FF] via-[#F6F8FF] to-[#FFF7E3]">
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-3 px-4 pb-5 pt-30 sm:gap-6 sm:px-6 sm:pb-6 sm:pt-32">
          <div className="min-w-0">

            <h2 className="mt-1 text-xl font-black leading-tight text-[var(--navy)] sm:text-3xl">
              You’ve got this, <br/>
              <span className="bg-gradient-to-r from-[#b89242] to-[#9b772f] bg-clip-text text-transparent">
                keep going!
              </span>
            </h2>

            <p className="mt-2 max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
              Har ek sawaal aapke knowledge ko aur confidence ko aur strong banata hai.
            </p>
          </div>

          <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
            <div
              aria-hidden="true"
              className="absolute inset-2 rounded-full bg-[#3869D0]/15 blur-2xl"
            />

            <div className="pointer-events-none relative h-full w-full">
              <DotLottieReact
                src={QUIZ_LOTTIE_SRC}
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-5 max-w-4xl px-4 sm:px-6">
        {/* ================= Quiz section ================= */}
        <section className="overflow-hidden rounded-3xl border border-[#D8E2F0] bg-white shadow-[0_20px_55px_rgba(16,42,67,0.10)]">
          {/* Top bar: question + timer */}
          <div className="flex items-center justify-between gap-3 border-b border-[#EDF1F7] px-4 py-4 sm:px-8 sm:py-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3869D0]/10 px-3 py-1.5 text-xs font-bold text-[#3869D0]">
                <BookOpenCheck size={13} />
                {getCategory(question)}
              </span>
            </div>

            <div
              className={`flex shrink-0 items-center gap-2 rounded-2xl border px-3.5 py-2 sm:px-4 sm:py-2.5 ${timerClass}`}
              role="timer"
              aria-label="Time remaining"
            >
              <Clock3 size={18} />

              <div className="leading-none">
                <p className="text-lg font-black tabular-nums sm:text-xl">
                  {formatTime(remainingSeconds)}
                </p>

                <p className="mt-1 hidden text-[10px] font-bold uppercase tracking-wider opacity-70 sm:block">
                  {timerState === "danger"
                    ? "Hurry up!"
                    : "Time left"}
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="px-4 pt-4 sm:px-8">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold text-slate-400">
                QUIZ PROGRESS
              </span>

              <span className="text-[11px] font-extrabold text-[#3869D0]">
                {answeredCount}/{totalQuestions} answered
              </span>
            </div>

            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-[#E8EEF6]"
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#3869D0] to-[#6e94e8] transition-all duration-500"
                style={{
                  width: `${answeredPercent}%`,
                }}
              />
            </div>

          </div>

          {/* Question + options */}
          <div
            key={question._id}
            className="pc-rise px-3 pb-4 pt-1 sm:px-8 sm:pb-8 sm:pt-2"
          >
           

            <h1 className="mt-4 text-lg font-extrabold leading-7 text-[var(--navy)] sm:text-2xl sm:leading-9">
              {getQuestionText(question)}
            </h1>

            {getQuestionHindi(question) && (
              <p className="mt-3 border-l-2 border-[#b89242]/60 bg-[#b89242]/5 py-2 pl-3 pr-2 text-sm leading-6 text-slate-600 sm:text-base">
                {getQuestionHindi(question)}
              </p>
            )}

            <div className="mt-3 grid gap-2 sm:mt-5 sm:gap-3">
              {(question.options || []).map(
                (option, index) => {
                  const selected =
                    selectedIndex === index;

                  return (
                    <button
                      key={`${question._id}-${index}`}
                      type="button"
                      disabled={busy}
                      onClick={() => onAnswer(index)}
                      aria-pressed={selected}
                      className={`group relative flex items-start gap-2.5 overflow-hidden rounded-2xl border-2 p-2.5 text-left transition duration-200 active:scale-[0.99] disabled:cursor-wait sm:gap-4 sm:p-4 ${
                        selected
                          ? "border-[#3869D0] bg-gradient-to-r from-[#3869D0]/10 to-[#3869D0]/[0.03] shadow-[0_10px_26px_rgba(56,105,208,0.18)]"
                          : "border-[#E3EAF4] bg-white hover:-translate-y-0.5 hover:border-[#3869D0]/40 hover:bg-[#F8FAFD] hover:shadow-md"
                      }`}
                    >
                      {selected && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 left-0 w-1 bg-[#3869D0]"
                        />
                      )}

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold transition-colors sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm ${
                          selected
                            ? "bg-[#3869D0] text-white"
                            : "bg-[#EEF3FA] text-[var(--navy)] group-hover:bg-[#3869D0]/10 group-hover:text-[#3869D0]"
                        }`}
                      >
                        {selected ? (
                          <CheckCircle2
                            size={19}
                            className="pc-pop"
                          />
                        ) : (
                          String.fromCharCode(
                            65 + index
                          )
                        )}
                      </span>

                      <span className="min-w-0 flex-1 break-words pt-1 text-sm font-semibold leading-5 text-[var(--navy)] sm:pt-2 sm:text-base sm:leading-6">
                        {option}
                      </span>

                      {selected && (
                        <span className="pc-pop mt-1.5 hidden shrink-0 rounded-full bg-[#3869D0] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white sm:inline-flex">
                          Selected
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>

            {/* Saving status */}
            <div
              className="mt-1 flex h-4 items-center gap-2 text-[11px] font-semibold text-[#3869D0] sm:mt-3 sm:h-5 sm:text-xs"
              aria-live="polite"
            >
              {savingAnswer && (
                <>
                  <RefreshCw
                    size={13}
                    className="animate-spin"
                  />
                  Saving your answer...
                </>
              )}

              {!savingAnswer &&
                selectedIndex !== undefined && (
                  <>
                    <CheckCircle2 size={13} />
                    Answer saved
                  </>
                )}
            </div>

            {/* Desktop actions */}
            <div className="mt-1 flex items-center justify-between gap-1.5 border-t border-[#EDF1F7] pt-2 sm:mt-3 sm:gap-3 sm:pt-3">
              <div className="flex gap-2 sm:gap-3">
                {prevButton}
                {nextButton}
              </div>

              {submitButton}
            </div>
          </div>
        </section>

      </div>

    </main>
  );
}

/* RESULT                                                                  */
function QuizResult({ result, onRestart }) {
  const percentage = Math.max(
    0,
    Math.min(
      100,
      Number(result?.percentage) || 0
    )
  );

  const radius = 54;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference *
    (1 - percentage / 100);

  const getPerformance = () => {
    if (percentage >= 90) {
      return {
        title: "Outstanding Performance",
        text: "Excellent work! Your preparation is showing strong results.",
        className:
          "border-green-200 bg-green-50 text-green-700",
      };
    }

    if (percentage >= 75) {
      return {
        title: "Excellent Work",
        text: "Very good attempt. Keep this consistency going.",
        className:
          "border-blue-200 bg-blue-50 text-blue-700",
      };
    }

    if (percentage >= 60) {
      return {
        title: "Good Job",
        text: "You are on the right track. Keep practicing regularly.",
        className:
          "border-[#b89242]/25 bg-[#b89242]/10 text-[#7a5d1f]",
      };
    }

    if (percentage >= 40) {
      return {
        title: "Keep Practicing",
        text: "Review your mistakes and come back stronger tomorrow.",
        className:
          "border-amber-200 bg-amber-50 text-amber-700",
      };
    }

    return {
      title: "Keep Going",
      text: "Every attempt helps you improve. Practice and try again.",
      className:
        "border-red-200 bg-red-50 text-red-700",
    };
  };

  const performance = getPerformance();

  return (
    <main className="min-h-screen bg-[#F4F7FC]">
      <QuizStyles />

      {/* Top band */}
      <div className="relative overflow-hidden bg-[#071b32] px-4 pb-24 pt-30 text-center sm:pb-28 sm:pt-30">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(184,146,66,0.28),transparent_55%),radial-gradient(ellipse_at_90%_90%,rgba(56,105,208,0.25),transparent_40%)]" />

        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#b89242]/35 bg-[#b89242]/10 px-4 py-1.5 text-[11px] font-extrabold tracking-[0.18em] text-[#e7c36d]">
            <Trophy size={13} />
            QUIZ COMPLETED
          </p>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Your Result
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            Great effort. Review your performance below and use every mistake
            as a step towards improvement.
          </p>
          {result?.name && (
            <p className="mt-3 text-sm font-semibold text-[#e7c36d]">
              For {result.name}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 pb-12 sm:-mt-20 sm:px-6 md:pb-16">
        <div className="pc-rise rounded-3xl border border-[#D8E2F0] bg-white p-5 shadow-[0_25px_60px_rgba(16,42,67,0.14)] sm:p-8 md:p-10">
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            {/* Ring */}
            <div className="relative h-40 w-40 shrink-0 sm:h-44 sm:w-44">
              <svg
                viewBox="0 0 128 128"
                className="h-full w-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke="#EEF3FA"
                  strokeWidth="11"
                />

                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  fill="none"
                  stroke="#b89242"
                  strokeWidth="11"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className="transition-[stroke-dashoffset] duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-[var(--navy)] sm:text-5xl">
                  {percentage}%
                </span>

                <span className="mt-0.5 text-xs font-semibold text-slate-500">
                  Percentage
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid w-full flex-1 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <ResultCard
                label="Score"
                value={`${result?.score ?? 0}/${result?.totalQuestions ?? 0}`}
                icon={Target}
              />

              <ResultCard
                label="Total Questions"
                value={result?.totalQuestions ?? 0}
                icon={BookOpenCheck}
              />

              <ResultCard
                label="Correct"
                value={result?.correctCount ?? 0}
                icon={CheckCircle2}
                tone="green"
              />

              <ResultCard
                label="Wrong"
                value={result?.wrongCount ?? 0}
                icon={XCircle}
                tone="red"
              />

              <ResultCard
                label="Skipped"
                value={result?.skippedCount ?? 0}
                icon={XCircle}
                tone="amber"
              />

              <ResultCard
                label="Percentage"
                value={`${result?.percentage ?? 0}%`}
                icon={Trophy}
              />

              <ResultCard
                label="Time Taken"
                value={formatTime(
                  Math.ceil((result?.timeTakenMs || 0) / 1000)
                )}
                icon={Clock3}
              />
            </div>
          </div>

          <div
            className={`mt-8 rounded-2xl border p-4 text-center sm:p-5 ${performance.className}`}
          >
            <p className="text-base font-extrabold sm:text-lg">
              {performance.title}
            </p>

            <p className="mt-1 text-xs leading-5 opacity-80 sm:text-sm">
              {performance.text}
            </p>
          </div>

          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={onRestart}
              className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-[#4a7be0] to-[#3869D0] px-7 py-3 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(56,105,208,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(56,105,208,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3869D0]/30 active:scale-[0.98] sm:w-auto"
            >
              <Shimmer />

              <RefreshCw
                size={17}
                className="relative transition-transform duration-500 group-hover:rotate-180"
              />

              <span className="relative">
                Back to Quiz
              </span>
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-[#D8E2F0] bg-white p-4 shadow-sm sm:mt-7 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b89242]/10 text-[#9b772f]">
                <BookOpenCheck size={20} />
              </span>

              <div>
                <h2 className="text-lg font-extrabold text-[var(--navy)] sm:text-xl">
                  Answer Review
                </h2>

                <p className="mt-0.5 text-xs text-slate-500">
                  Check your answers and learn from mistakes.
                </p>
              </div>
            </div>

            <span className="hidden rounded-full bg-[#F4F7FC] px-3 py-1.5 text-xs font-bold text-slate-500 sm:inline-flex">
              {result?.review?.length || 0} Questions
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {(result?.review || []).length ? (
              (result?.review || []).map(
                (item, index) => (
                  <ReviewCard
                    key={
                      item.questionId ||
                      index
                    }
                    item={item}
                    index={index}
                  />
                )
              )
            ) : (
              <div className="rounded-2xl border border-dashed border-[#D8E2F0] bg-[#F8FAFD] p-7 text-center">
                <BookOpenCheck
                  size={28}
                  className="mx-auto text-slate-400"
                />

                <p className="mt-3 text-sm font-bold text-[var(--navy)]">
                  No answer review available
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Your quiz result was recorded successfully.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Frontend leaderboard is temporarily disabled. Backend API remains enabled.
        <div className="mt-7 rounded-3xl border border-[#D8E2F0] bg-white p-5 shadow-sm md:p-7">
          <h2 className="text-xl font-extrabold text-[var(--navy)]">
            Today's Leaderboard
          </h2>

          <div className="mt-5">
            {leaderboard.length ? (
              leaderboard
                .slice(0, 10)
                .map((player, index) => (
                  <div
                    key={
                      player.attemptId ||
                      player._id ||
                      index
                    }
                    className="flex items-center gap-3 border-b border-[#EDF1F7] py-3 last:border-0"
                  >
                    <span className="w-6 text-xs font-bold text-slate-400">
                      {index + 1}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3869D0]/10 text-xs font-bold text-[#3869D0]">
                      {getInitials(
                        player.name
                      )}
                    </div>

                    <p className="flex-1 text-sm font-bold text-[var(--navy)]">
                      {player.name ||
                        "Anonymous"}
                    </p>

                    <span className="text-sm font-extrabold text-[#3869D0]">
                      {player.percentage ?? 0}%
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-sm text-slate-500">
                No leaderboard entries with 70% or higher yet.
              </p>
            )}
          </div>
        </div>
        */}
      </div>
    </main>
  );
}

function ResultCard({
  label,
  value,
  icon: Icon,
  tone = "blue",
}) {
  const tones = {
    blue: "bg-[#3869D0]/10 text-[#3869D0]",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="rounded-2xl border border-[#D8E2F0] bg-[#F8FAFD] p-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-5">
      {Icon && (
        <span
          className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`}
        >
          <Icon size={18} />
        </span>
      )}

      <p className="mt-3 text-xs font-semibold text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-extrabold text-[var(--navy)] sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

function ReviewCard({
  item,
  index,
}) {
  const englishQuestion =
    item.questionEnglish ||
    item.question ||
    "";

  const hasSelected =
    item.selectedIndex !== null &&
    item.selectedIndex !== undefined;

  const selected = hasSelected
    ? item.options?.[item.selectedIndex]
    : "Not attempted";

  const correct =
    item.options?.[item.correctIndex] ||
    "Not available";

  const isSkipped = !hasSelected;

  return (
    <article
      className={`rounded-2xl border border-l-4 bg-[#FBFCFE] p-4 sm:p-5 ${
        item.isCorrect
          ? "border-[#D8E2F0] border-l-green-500"
          : isSkipped
            ? "border-[#D8E2F0] border-l-amber-400"
            : "border-[#D8E2F0] border-l-red-400"
      }`}
    >
      <div className="flex items-start gap-3">
        {item.isCorrect ? (
          <CheckCircle2
            size={20}
            className="mt-1 shrink-0 text-green-600"
          />
        ) : isSkipped ? (
          <Clock3
            size={20}
            className="mt-1 shrink-0 text-amber-500"
          />
        ) : (
          <XCircle
            size={20}
            className="mt-1 shrink-0 text-red-500"
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold text-[#3869D0]">
              Q{index + 1}
            </p>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                item.isCorrect
                  ? "bg-green-100 text-green-700"
                  : isSkipped
                    ? "bg-amber-100 text-amber-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {item.isCorrect
                ? "Correct"
                : isSkipped
                  ? "Skipped"
                  : "Incorrect"}
            </span>
          </div>

          {englishQuestion && (
            <p className="mt-2 break-words text-sm font-bold leading-6 text-[var(--navy)] sm:text-base">
              <span className="mr-1 text-xs font-semibold text-slate-500">
                English:
              </span>

              {getQuestionText(
                englishQuestion
              )}
            </p>
          )}

          {item.questionHi && (
            <p className="mt-1 break-words text-sm leading-6 text-slate-600">
              <span className="mr-1 text-xs font-semibold text-slate-500">
                Hindi:
              </span>

              {item.questionHi}
            </p>
          )}

          <div
            className={`mt-3 grid gap-2 ${
              !item.isCorrect &&
              hasSelected
                ? "md:grid-cols-2"
                : ""
            }`}
          >
            {!item.isCorrect &&
              hasSelected && (
                <p className="break-words rounded-xl bg-red-50 p-3 text-xs leading-5 text-red-700 sm:text-sm">
                  <strong>Your answer:</strong>{" "}
                  {selected}
                </p>
              )}

            <p className="break-words rounded-xl bg-green-50 p-3 text-xs leading-5 text-green-700 sm:text-sm">
              <strong>Correct answer:</strong>{" "}
              {correct}
            </p>
          </div>

          {item.explanation && (
            <p className="mt-3 break-words rounded-xl bg-[#EEF3FA] p-3 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
              <strong>Explanation:</strong>{" "}
              {item.explanation}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}