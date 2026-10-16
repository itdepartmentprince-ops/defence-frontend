import { apiRequest } from "./api";

const request = (endpoint, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    credentials: "include",
  });

/* Public quiz */

const startQuizAttempt = async ({
  name,
  phoneNumber,
  visitorId,
  subject = "all",
  dateKey = "",
}) => {
  if (typeof subject !== "string") {
    throw new TypeError(
      "Quiz subject must be a string. A click event was passed instead of the selected subject."
    );
  }

  const quizData = {
    name,
    phoneNumber,
    visitorId,
    subject,
  };

  if (dateKey) {
    quizData.dateKey = dateKey;
  }

  return request("/quiz/start", {
    method: "POST",
    body: JSON.stringify(quizData),
  });
};

const saveQuizAnswer = async ({
  attemptId,
  visitorId,
  questionId,
  selected,
}) => {
  return request(
    `/quiz/${encodeURIComponent(attemptId)}/answers`,
    {
      method: "PUT",
      body: JSON.stringify({
        visitorId,
        questionId,
        selected,
      }),
    }
  );
};

const submitQuizAttempt = async ({
  attemptId,
  visitorId,
  timeTakenMs,
}) => {
  return request(
    `/quiz/${encodeURIComponent(attemptId)}/submit`,
    {
      method: "POST",
      body: JSON.stringify({
        visitorId,
        timeTakenMs,
      }),
    }
  );
};

const getDailyQuizStats = async (date) => {
  const query = date
    ? `?date=${encodeURIComponent(date)}`
    : "";

  return request(`/quiz/daily-stats${query}`, {
    method: "GET",
  });
};

const getPublicQuizCategories = async (date) => {
  const query = date
    ? `?date=${encodeURIComponent(date)}`
    : "";

  return request(`/quiz/categories/public${query}`, {
    method: "GET",
  });
};

const getLeaderboard = async () => {
  // Frontend leaderboard display is temporarily disabled. Backend API stays enabled.
  // return request("/quiz/leaderboard", {
  //   method: "GET",
  // });
  return Promise.reject(new Error("Leaderboard is temporarily disabled on the frontend."));
};

const getQuizArchive = async () => {
  // Previous quiz archive API is temporarily disabled. Uncomment to restore.
  // return request(`/quiz/archive/${encodeURIComponent(date)}`, {
  //   method: "GET",
  // });
  return Promise.reject(new Error("Previous quizzes are temporarily unavailable."));
};

const getQuizArchivePaginated = async () => {
  // Previous quiz archive API is temporarily disabled. Uncomment to restore.
  // return request(`/quiz/archive/paginated?${params.toString()}`, {
  //   method: "GET",
  // });
  return Promise.reject(new Error("Previous quizzes are temporarily unavailable."));
};

const getQuizArchiveDates = async () => {
  // Previous quiz archive dates API is temporarily disabled. Uncomment to restore.
  // return request(`/quiz/archive/dates?${params.toString()}`, {
  //   method: "GET",
  // });
  return Promise.reject(new Error("Previous quizzes are temporarily unavailable."));
};

/* Admin categories */

const getQuizCategories = async () => {
  return request("/quiz/categories", {
    method: "GET",
  });
};

const createQuizCategory = async (name) => {
  return request("/quiz/categories", {
    method: "POST",
    body: JSON.stringify({
      name,
    }),
  });
};

const deleteQuizCategory = async (categoryId) => {
  return request(
    `/quiz/categories/${encodeURIComponent(categoryId)}`,
    {
      method: "DELETE",
    }
  );
};

/* Admin settings */

const getQuizSetting = async (date) => {
  const query = date
    ? `?date=${encodeURIComponent(date)}`
    : "";

  return request(`/quiz/settings${query}`, {
    method: "GET",
  });
};

const updateQuizSetting = async ({
  dateKey,
  durationMinutes,
  isActive,
}) => {
  return request("/quiz/settings", {
    method: "PUT",
    body: JSON.stringify({
      dateKey,
      durationMinutes,
      isActive,
    }),
  });
};

/* Admin questions */

const getQuizQuestions = async ({
  category = "",
  date = "",
  search = "",
  page = 1,
  limit = 20,
} = {}) => {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (date) {
    params.set("date", date);
  }

  if (search) {
    params.set("search", search);
  }

  params.set("page", String(page));
  params.set("limit", String(limit));

  return request(
    `/quiz/questions?${params.toString()}`,
    {
      method: "GET",
    }
  );
};

const createQuizQuestion = async (question) => {
  return request("/quiz/questions", {
    method: "POST",
    body: JSON.stringify(question),
  });
};

const updateQuizQuestion = async (
  questionId,
  question
) => {
  return request(
    `/quiz/questions/${encodeURIComponent(questionId)}`,
    {
      method: "PUT",
      body: JSON.stringify(question),
    }
  );
};

const updateQuizQuestionStatus = async (
  questionId,
  active
) => {
  return request(
    `/quiz/questions/${encodeURIComponent(questionId)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        active,
      }),
    }
  );
};

const deleteQuizQuestion = async (questionId) => {
  return request(
    `/quiz/questions/${encodeURIComponent(questionId)}`,
    {
      method: "DELETE",
    }
  );
};

const importQuizQuestions = async (file) => {
  if (!file) {
    throw new Error("Please select a Word document.");
  }

  const formData = new FormData();

  formData.append("file", file);

  return request("/quiz/questions/import-word", {
    method: "POST",
    body: formData,
  });
};

export {
  startQuizAttempt,
  saveQuizAnswer,
  submitQuizAttempt,
  getDailyQuizStats,
  getPublicQuizCategories,
  getLeaderboard,
  getQuizArchive,
  getQuizArchivePaginated,
  getQuizArchiveDates,

  getQuizCategories,
  createQuizCategory,
  deleteQuizCategory,

  getQuizSetting,
  updateQuizSetting,

  getQuizQuestions,
  createQuizQuestion,
  updateQuizQuestion,
  updateQuizQuestionStatus,
  deleteQuizQuestion,
  importQuizQuestions,
};