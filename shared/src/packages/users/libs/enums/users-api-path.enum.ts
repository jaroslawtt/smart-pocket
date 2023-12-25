const UsersApiPath = {
  ROOT: '/',
  $ID: '/:id',
  UPDATE_PASSWORD: '/update-password',
  UPDATE_LOGIN: '/update-login',
  UPDATE_IMAGE: '/update-image',
} as const;

export { UsersApiPath };
