import { type AccountGetAllItemResponseDto } from '~/packages/accounts/libs/types/types.js';
const accountsToReadableMap = (
  accounts: AccountGetAllItemResponseDto[],
): Record<string, string> => {
  return accounts.reduce(
    (accumulator, account): Record<string, string> => {
      accumulator[account.id] = account.name;

      return accumulator;
    },
    {} as Record<string, string>,
  );
};

export { accountsToReadableMap };
