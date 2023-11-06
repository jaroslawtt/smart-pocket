const UsersApiPath = {
  ROOT: '/',
  $ID: '/:id',
  $ID_UPDATE_PASSWORD: '/:id/update-password',
  $ID_UPDATE_LOGIN: '/:id/update-login',
} as const;

export { UsersApiPath };
