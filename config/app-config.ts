export const getPublicUrl = () => {
  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "development"
  ) {
    return process.env.NEXT_PUBLIC_VERCEL_URL
      ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
      : "http://localhost:3000";
  }
  return process.env.NEXT_PUBLIC_REDIRECT_TO || "http://localhost:3000";
};

export const APP_CONFIG = {
  description: "Boost engagement for better learner mastery",
  gcBucketName: process.env.NEXT_PUBLIC_BUCKET_NAME || "library-v1-dev",
  redirectUrl: getPublicUrl(),
  site_name: "Corolair",
  title: "Corolair",
};

export const TRIAL_LIMITS = {
  FLASHCARD_TRIAL_LIMIT: Number(process.env.NEXT_PUBLIC_FLASHCARD_TRIAL_LIMIT),
  QUIZ_TRIAL_LIMIT: Number(process.env.NEXT_PUBLIC_QUIZ_TRIAL_LIMIT),
  SOURCES_TRIAL_LIMIT: Number(process.env.NEXT_PUBLIC_SOURCES_TRIAL_LIMIT),
  TUTOR_TRIAL_LIMIT: Number(process.env.NEXT_PUBLIC_TUTOR_TRIAL_LIMIT),
  UPLOAD_MO_TRIAL_LIMIT: Number(process.env.NEXT_PUBLIC_UPLOAD_MO_TRIAL_LIMIT),
};

const servicePaths = {
  analytics: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL,
  chat: process.env.NEXT_PUBLIC_CHAT_SERVICE_URL,
  materialManagement: process.env.NEXT_PUBLIC_MATERIAL_MANAGEMENT_SERVICE_URL,
  materialOrchestrator:
    process.env.NEXT_PUBLIC_MATERIAL_ORCHESTRATOR_SERVICE_URL,
  materialParsing: process.env.NEXT_PUBLIC_MATERIAL_PARSING_SERVICE_URL,
  materialUpload: process.env.NEXT_PUBLIC_MATERIAL_UPLOAD_SERVICE_URL,
  moodle: process.env.NEXT_PUBLIC_MOODLE_SERVICE_URL,
  topicExtraction: process.env.NEXT_PUBLIC_TOPIC_EXTRACTION_SERVICE_URL,
  trivia: process.env.NEXT_PUBLIC_TRIVIA_SERVICE_URL,
  tutor: process.env.NEXT_PUBLIC_TUTOR_SERVICE_URL,
};
export const API_ROUTES = {
  analytics: {
    feedback: servicePaths.analytics + "/feedback",
    getActiveUsers: (userId: string, options?: Record<string, string>) => {
      let url = servicePaths.analytics + `/tutors-active-users/${userId}`;

      if (options) {
        const queryParams = new URLSearchParams(options);
        url += `?${queryParams.toString()}`;
      }

      return url;
    },
    getMessages: (userId: string, options?: Record<string, string>) => {
      let url = servicePaths.analytics + `/tutors-messages/${userId}`;

      if (options) {
        const queryParams = new URLSearchParams(options);
        url += `?${queryParams.toString()}`;
      }

      return url;
    },
    getTutorsAvailables: (userId: string, options?: Record<string, string>) => {
      let url = servicePaths.analytics + `/tutors-available/${userId}`;

      if (options) {
        const queryParams = new URLSearchParams(options);
        url += `?${queryParams.toString()}`;
      }

      return url;
    },
    organization: {
      getActiveUsers: (orgId: string, options?: Record<string, string>) => {
        let url =
          servicePaths.analytics + `/organization/tutors-active-users/${orgId}`;

        if (options) {
          const queryParams = new URLSearchParams(options);
          url += `?${queryParams.toString()}`;
        }

        return url;
      },
      getMessages: (orgId: string, options?: Record<string, string>) => {
        let url =
          servicePaths.analytics + `/organization/tutors-messages/${orgId}`;

        if (options) {
          const queryParams = new URLSearchParams(options);
          url += `?${queryParams.toString()}`;
        }

        return url;
      },
      getTutorsAvailables: (
        orgId: string,
        options?: Record<string, string>
      ) => {
        let url =
          servicePaths.analytics + `/organization/tutors-available/${orgId}`;

        if (options) {
          const queryParams = new URLSearchParams(options);
          url += `?${queryParams.toString()}`;
        }

        return url;
      },
    },
  },
  chat: {
    clearChat: ({ tutorId, userId }: { tutorId: string; userId: string }) =>
      servicePaths.chat + `/tutors/${tutorId}/user/${userId}/clear`,

    embedAuth: servicePaths.chat + `/embed/auth`,
    getHistory: ({ limit = 10, skip = 0 }: { limit: number; skip: number }) =>
      servicePaths.chat + `/history?skip=${skip}&limit=${limit}`,
    regenerateMessage: (id: string) =>
      servicePaths.chat + `/messages/${id}/regenerate`,
    regenerateMessageV2: (id: string) =>
      servicePaths.chat + `/v2/messages/${id}/regenerate`,
    sendAttemptMessage: (id: string) =>
      servicePaths.chat + `/tutors/${id}/conversation/attempt`,
    sendCommentMessage: (id: string) =>
      servicePaths.chat + `/tutors/${id}/conversation/comment`,
    sendMessage: servicePaths.chat + `/conversation`,
    sendMessageV2: servicePaths.chat + `/v2/conversation`,
    sendTextMessage: (id: string) =>
      servicePaths.chat + `/tutors/${id}/conversation/text`,
  },
  document: {
    startParsing: (id: string) =>
      servicePaths.materialOrchestrator +
      `/orchestration/materials/${id}/extracts`,
    uploadFiles: "/api/gcp/upload-files",
  },
  email: {
    requestUnlimitedAccess: "/api/email/upgrade-trial-version",
    tutorInvite: "/api/email/tutor-invite",
  },

  flashcards: {
    attempt: {
      feedback: (id: string) =>
        servicePaths.trivia + `/flashcards/contents/${id}/feedback`,
      get: (id: string) => servicePaths.trivia + `/flashcards/attempts/${id}`,
    },
    content: {
      add: (id: string) =>
        servicePaths.trivia + `/flashcards/${id}/contents/add`,
      delete: (id: string) =>
        servicePaths.trivia + `/flashcards/contents/${id}`,
      getAllQuestions: (id: string) => {
        return servicePaths.trivia + `/flashcards/${id}/content`;
      },
      getQuestion: (id: string) =>
        servicePaths.trivia + `/flashcards/contents/${id}`,
      update: (id: string) =>
        servicePaths.trivia + `/flashcards/contents/${id}`,
    },
    create: servicePaths.trivia + "/flashcards",
    delete: (id: string) => servicePaths.trivia + `/flashcards/${id}`,
    generation: {
      generate: (id: string) =>
        servicePaths.trivia + `/flashcards/generate/${id}`,
      regenerate: (id: string) =>
        servicePaths.trivia + `/flashcards/${id}/regenerate`,
    },
    getTutorFlashcards: (tutorId: string) =>
      servicePaths.trivia + `/flashcards/tutors/${tutorId}`,
    update: (id: string) => servicePaths.trivia + `/flashcards/${id}`,
  },

  materialManagement: {
    addMaterialToTutor: ({
      materialId,
      tutorId,
    }: {
      materialId: string;
      tutorId: string;
    }) =>
      servicePaths.materialManagement +
      `/tutors/${tutorId}/add/materials/${materialId}`,
    checkIfCanDeleteFromLibrary: (id: string) =>
      servicePaths.materialManagement + `/materials/${id}/prevent-delete`,
    getMaterial: (id: string) =>
      servicePaths.materialManagement + `/materials/${id}`,
    getMaterialDetails: (id: string) =>
      servicePaths.materialManagement + `/materials/${id}/details`,
    getMaterialSummary: (id: string) =>
      servicePaths.materialManagement + `/materials/${id}/summary`,
    getMessageExplanation: (messageId: string) =>
      servicePaths.materialManagement +
      `/messages/${messageId}/materials/extracts`,
    getTranscript: (id: string) =>
      servicePaths.materialManagement + `/materials/${id}/transcript`,
    getTutorMaterials: (tutorId: string) =>
      servicePaths.materialManagement + `/tutors/${tutorId}/materials`,
    getUserMateirals: (userId: string) =>
      servicePaths.materialManagement + `/users/${userId}/materials`,
    removeMaterialFromLibrary: (id: string) =>
      servicePaths.materialManagement + `/materials/${id}`,
    removeMaterialFromTutor: ({
      materialId,
      tutorId,
    }: {
      materialId: string;
      tutorId: string;
    }) =>
      servicePaths.materialManagement +
      `/tutors/${tutorId}/delete/materials/${materialId}`,

    scorm: {
      getSupportedMaterials: (materialId: string) =>
        servicePaths.materialOrchestrator +
        `/archives/${materialId}/scorm/supported`,
    },

    updateMaterial: ({
      newMaterialId,
      prevMaterialId,
    }: {
      newMaterialId: string;
      prevMaterialId: string;
    }) =>
      servicePaths.materialManagement +
      `/materials/${prevMaterialId}/replace/${newMaterialId}`,

    updateMaterialTitle: (id: string) =>
      servicePaths.materialManagement + `/materials/${id}`,
  },

  materialParsing: {
    crawl: servicePaths.materialParsing + "/materials/crawl",
  },
  materialUpload: {
    getSignedUrl: servicePaths.materialUpload + "/materials/gcs-signed-url",
    onArchiveUpload: servicePaths.materialUpload + "/archive",
    onUpload: servicePaths.materialUpload + "/materials",
    uploadFromPage: servicePaths.materialUpload + "/materials/from-page",
    uploadFromScorm: (archiveId: string) =>
      servicePaths.materialUpload + `/archives/${archiveId}/from-scorm`,
    uploadFromUrl: servicePaths.materialUpload + "/materials/from-url",
    uploadText: servicePaths.materialUpload + "/materials/from-text",
  },
  moodle: {
    attach: ({ courseId, tutorId }: { courseId: string; tutorId: string }) =>
      servicePaths.moodle + `/courses/${courseId}/tutors/${tutorId}/attach`,
    connectSite: servicePaths.moodle + "/organization",
    detach: ({ courseId, tutorId }: { courseId: string; tutorId: string }) =>
      servicePaths.moodle + `/courses/${courseId}/tutors/${tutorId}/detach`,
    disable: servicePaths.moodle + "/organization/deactivate",
    disconnect: servicePaths.moodle + "/organization/disconnect",
    enable: servicePaths.moodle + "/organization/activate",
    getCourses: servicePaths.moodle + "/courses",
    getResources: (id: number) =>
      servicePaths.moodle + `/courses/${id}/resources`,
    getTutorsCourses: servicePaths.moodle + "/tutors",
    replace: ({ courseId, tutorId }: { courseId: string; tutorId: string }) =>
      servicePaths.moodle + `/courses/${courseId}/tutors/${tutorId}/replace`,
    uploadResources: servicePaths.moodle + "/courses/upload",
  },

  quiz: {
    attempt: {
      add: servicePaths.trivia + `/quiz-attempt`,
      evaluate: (id: string) => servicePaths.trivia + `/quiz-attempt/${id}`,
      get: (id: string) => servicePaths.trivia + `/quiz-attempt/${id}`,
    },
    config: {
      create: servicePaths.trivia + "/quiz/",
      delete: (id: string) => servicePaths.trivia + `/quiz/${id}`,
      getAllTutorQuizzes: (tutorId: string) =>
        servicePaths.trivia + `/tutor/${tutorId}/quiz`,
      getQuiz: (id: string) => servicePaths.trivia + `/quiz/${id}`,
      update: (id: string) => servicePaths.trivia + `/quiz/${id}`,
    },
    content: {
      create: (quizId: string) =>
        servicePaths.trivia + `/quiz/${quizId}/questions`,
      delete: ({ id, quizId }: { id: string; quizId: string }) =>
        servicePaths.trivia + `/quiz/${quizId}/questions/${id}`,
      getAllQuestions: (quizId: string) =>
        servicePaths.trivia + `/quiz/${quizId}/questions`,
      getQuestion: ({ id, quizId }: { id: string; quizId: string }) =>
        servicePaths.trivia + `/quiz/${quizId}/questions/${id}`,
      update: ({ id, quizId }: { id: string; quizId: string }) =>
        servicePaths.trivia + `/quiz/${quizId}/questions/${id}`,
    },
    generation: {
      generate: (id: string) => servicePaths.trivia + `/quiz-generation/${id}`,
      regenerate: (id: string) =>
        servicePaths.trivia + `/quiz-regeneration/${id}`,
    },
  },
  topicExtraction: {
    clustering: {
      create: (tutorId: string) =>
        servicePaths.topicExtraction + `/tutors/${tutorId}/topic-clustering`,
      getInsightDetails: (insightId: string) =>
        servicePaths.topicExtraction + `/insights/${insightId}`,
      getInsightMessages: (messageId: string) =>
        servicePaths.topicExtraction + `/messages/${messageId}`,
      getTutorInsights: (tutorId: string) =>
        servicePaths.topicExtraction + `/tutors/${tutorId}/insights`,
    },
    mindmap: {
      create: (tutorId: string) =>
        servicePaths.topicExtraction + `/tutors/${tutorId}/mindmap`,
      get: (tutorId: string) =>
        servicePaths.topicExtraction + `/tutors/${tutorId}/mindmap`,
    },
  },
  tutor: {
    create: "/api/tutor/create",
    createTutorTemplate: (id: string) =>
      servicePaths.tutor + `/template/${id}/tutor-init`,
    delete: (id: string) => servicePaths.tutor + `/tutors/${id}`,
    generate: (tutorId: string) => servicePaths.tutor + `/tutors/${tutorId}`,
    get: (id: string) => servicePaths.tutor + `/tutors/${id}`,
    getTemplates: servicePaths.tutor + "/templates",
    getUserTutors: (userId: string) =>
      servicePaths.tutor + `/users/${userId}/tutors`,
    learner: {
      add: servicePaths.tutor + `/learner`,
      get: (learnerId: string) => servicePaths.tutor + `/learner/${learnerId}`,
      getManyByTutorId: (id: string) =>
        servicePaths.tutor + `/tutors/${id}/learners`,
      update: servicePaths.tutor + `/learner`,
    },
    organization: {
      link: ({
        organizationId,
        userId,
      }: {
        organizationId: string;
        userId: string;
      }) =>
        servicePaths.tutor +
        `/organizations/${organizationId}/users/${userId}/tutors/link`,
      unlink: servicePaths.tutor + "/organizations/leave",
    },
    refresh: (tutorId: string) =>
      servicePaths.tutor + `/tutors/${tutorId}/refresh`,

    regenerate: (id: string) => servicePaths.tutor + `/tutors/${id}/regenerate`,
    root: servicePaths.tutor + "/",
    share: {
      get: (shareId: string) => servicePaths.tutor + `/tutor-share/${shareId}`,
      getByTutorId: (tutorId: string) =>
        servicePaths.tutor + `/tutor-share/tutor/${tutorId}`,
      update: (shareId: string) =>
        servicePaths.tutor + `/tutor-share/${shareId}`,
    },
    update: (id: string) => servicePaths.tutor + `/tutors/${id}`,
  },
  user: {
    delete: "/api/user/delete",
    update: "/api/user/update",
    uploadProfilePicture: "/api/user/upload-profile-picture",
  },
};
