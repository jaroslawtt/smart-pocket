const AppRoute = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  DASHBOARD: '/dashboard',
  ACCOUNTS: '/accounts',
  ACCOUNTS_DETAILS_$ID: '/accounts/details/:id',
  RECORDS: '/records',
  SETTINGS: '/settings',
  ANY: '*',
} as const;

export { AppRoute };
