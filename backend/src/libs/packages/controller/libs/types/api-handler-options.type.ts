import { type ServerAppRouteParameters } from '~/libs/packages/server-application/libs/types/server-app-route-parameters.type.js';
import { type UserAuthResponse } from '~/packages/users/libs/types/types.js';

type DefaultApiHandlerOptions = {
  headers?: Parameters<ServerAppRouteParameters['handler']>[0]['headers'];
  body?: unknown;
  query?: unknown;
  params?: unknown;
  user?: UserAuthResponse | null;
  fileBuffer?: Buffer | null;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  user: T['user'];
  headers: Parameters<ServerAppRouteParameters['handler']>[0]['headers'];
  fileBuffer: T['fileBuffer'];
};

export { type ApiHandlerOptions };
