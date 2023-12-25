import {
  type FastifyInstance,
  type FastifyPluginAsync,
  type FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';

import { HttpCode, HttpError } from '~/libs/packages/http/http.js';
import { AccountService } from '~/packages/accounts/account.service.js';
import { type RecordCreateRequestDto } from '~/packages/records/libs/types/types.js';
import { RecordCreateRoute } from '~/libs/packages/plugins/record-produce-permission/libs/enums/enums.js';
import { RecordTypeValue } from '~/packages/records/records.js';
import { type UserAuthResponse } from '~/packages/users/libs/types/types.js';

type RecordProducePermissionPluginParameters = {
  accountService: AccountService;
};

const recordProducePermission: FastifyPluginAsync<RecordProducePermissionPluginParameters> =
  fp(
    async (
      fastify: FastifyInstance,
      { accountService }: RecordProducePermissionPluginParameters,
    ) => {
      fastify.addHook(
        'preHandler',
        async ({
          user,
          method,
          routerPath,
          body,
        }: FastifyRequest<{
          Body: RecordCreateRequestDto;
        }>) => {
          const isCreateRecordPath = routerPath === RecordCreateRoute.PATH;
          const isCreateRecordMethod = method === RecordCreateRoute.METHOD;

          const isRestrictedRoute = isCreateRecordPath && isCreateRecordMethod;

          if (!isRestrictedRoute) {
            return;
          }

          const requestUser = user as UserAuthResponse;

          const handlePermissionCheck = async (accountId: string) => {
            const account = await accountService.find(accountId);

            if (!account) {
              return;
            }

            const isOwner = requestUser.id === account.userId;

            if (!isOwner) {
              throw new HttpError({
                message: 'Permission denied! User is not account owner',
                status: HttpCode.FORBIDDEN,
              });
            }
          };

          const handleInsufficientBalance = (
            accountAmount: number,
            transferAmount: number,
          ) => {
            if (accountAmount < transferAmount) {
              throw new HttpError({
                message:
                  'Unable to process transfer: The requested transfer amount exceeds your current account balance. Please add funds to your account and try again',
                status: HttpCode.FORBIDDEN,
              });
            }
          };

          if (body.type === RecordTypeValue.TRANSFER) {
            const senderAccount = await accountService.find(body.accountId);
            const receiverAccount = await accountService.find(body.toAccountId);

            if (!senderAccount || !receiverAccount) return;

            await handlePermissionCheck(body.accountId);
            handleInsufficientBalance(senderAccount.amount, body.amount);
          }

          if (
            body.type === RecordTypeValue.EXPENSE
          ) {
            const accountId = body.accountId;
            await handlePermissionCheck(accountId);
            const account = await accountService.find(accountId);

            if (!account) return;
            handleInsufficientBalance(account.amount, body.amount);
          }
        },
      );

      return await Promise.resolve();
    },
  );

export { recordProducePermission };
