import {
  type AnyAction,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';

import { handleError } from './middlewares/middlewares.js';

import { storage } from '~/libs/packages/storage/storage.js';
import { authApi } from '~/packages/auth/auth.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as appReducer } from '~/slices/app/app.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  app: ReturnType<typeof appReducer>;
};

type ExtraArguments = {
  authApi: typeof authApi;
  storage: typeof storage;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<[ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]>
    >
  >;

  public constructor(config: IConfig) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
        app: appReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return [
          handleError,
          ...getDefaultMiddleware({
            thunk: {
              extraArgument: this.extraArguments,
            },
          }),
        ];
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      storage,
    };
  }
}

export { type ExtraArguments, Store };
