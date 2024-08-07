const routes = {
  app: {
    dashboard: {
      ongoing: '/dashboard/ongoing',
      root: '/dashboard',
    },
    library: '/library',
    organization: {
      general: (orgId: string) => `/organization/${orgId}`,
      integrations: (orgId: string) => `/organization/${orgId}/integrations`,
      root: '/organization',
      users: (orgId: string) => `/organization/${orgId}/users`,
    },
    profile: {
      root: '/profile',
      settings: '/profile/settings',
    },
    tutor: {
      chat: (id: string) => `/tutor/${id}/chat`,
      history: (id: string) => `/tutor/${id}/history`,
      mindmap: (id: string) => `/tutor/${id}/mindmap`,
      questionBank: (id: string) => `/tutor/${id}/question-bank`,
      root: '/tutor',
      settings: (id: string) => `/tutor/${id}/settings`,
    },
  },

  auth: {
    forgetPassword: '/auth/forget-password',
    organization: {
      invitationAccepted: (orgId: string) =>
        `/auth/organization/${orgId}/invitation-accepted`,
    },
    pending: '/auth/pending',
    root: '/auth',
    signup: '/auth/signup',
    ssoCallback: '/auth/sso-callback',
  },
  home: {
    root: '/',
  },
  onboarding: {
    custom: {
      root: '/onboarding/custom',
      submit: '/onboarding/custom/submit',
    },
    root: '/onboarding',
    template: {
      root: '/onboarding/template',
      submit: '/onboarding/template/submit',
    },
    welcome: '/onboarding/welcome',
  },
  public: {
    privacy: '/public/privacy',
    terms: '/public/terms',
  },
  student: {
    chat: (id: string) => `/student/tutor/${id}/chat`,
    concepts: (id: string) => `/student/tutor/${id}/concepts`,
    root: '/student/tutor/',
  },
};

export default routes;
