import { type ServerAppRouteParameters } from '~/libs/packages/server-application/libs/types/server-app-route-parameters.type.js';

type DefaultApiHandlerOptions = {
  headers?: Parameters<ServerAppRouteParameters['handler']>[0]['headers'];
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

type ApiHandlerOptions<
  T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
  body: T['body'];
  query: T['query'];
  params: T['params'];
  headers: Parameters<ServerAppRouteParameters['handler']>[0]['headers'];
};

export { type ApiHandlerOptions };
