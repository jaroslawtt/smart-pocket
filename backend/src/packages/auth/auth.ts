import { AuthService } from '~/packages/auth/auth.service.js';
import { userService } from '~/packages/users/users.js';
import { token } from '~/libs/packages/token/token.js';
import { AuthController } from '~/packages/auth/auth.controller.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { encrypt } from '~/libs/packages/encrypt/encrypt.js';

const authService = new AuthService(userService, token, encrypt);
const authController = new AuthController(logger, authService);

export { authController };
