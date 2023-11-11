import { AccountRepository } from '~/packages/accounts/account.repository.js';
import { AccountModel } from '~/packages/accounts/account.model.js';
import { AccountService } from '~/packages/accounts/account.service.js';
import { AccountController } from '~/packages/accounts/account.controller.js';
import { logger } from '~/libs/packages/logger/logger.js';

const accountRepository = new AccountRepository(AccountModel);
const accountService = new AccountService(accountRepository);
const accountController = new AccountController(logger, accountService);

export { accountController };
