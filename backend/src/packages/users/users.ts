import { config } from '~/libs/packages/config/config.js';
import { encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { UserRepository } from '~/packages/users/user.repository.js';
import { UserModel } from '~/packages/users/user.model.js';
import { UserService } from '~/packages/users/user.service.js';
import { UserController } from '~/packages/users/user.controller.js';
import { logger } from '~/libs/packages/logger/logger.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, config, encrypt);
const userController = new UserController(logger, userService);

export { userService, userController };
