import { type UserAuthResponse } from './packages/users/libs/types/types.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserAuthResponse | null;
  }
}
