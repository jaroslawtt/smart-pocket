import {
  type AnyAction,
  type MiddlewareArray,
  type ThunkMiddleware,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type IConfig } from '~/libs/packages/config/config.js';

import { handleError } from './middlewares/middlewares.js';

import { accountsApi } from '~/packages/accounts/accounts.js';
import { recordsApi } from '~/packages/records/records.js';
import { storage } from '~/libs/packages/storage/storage.js';
import { authApi } from '~/packages/auth/auth.js';
import { usersApi } from '~/packages/users/users.js';
import { categoriesApi } from '~/packages/categories/categories.js';

import { notification } from '~/libs/packages/notification/notification.js';
import { reducer as accountsReducer } from '~/slices/accounts/accounts.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';
import { reducer as appReducer } from '~/slices/app/app.js';
import { reducer as recordsReducer } from '~/slices/records/records.js';
import { reducer as categoriesReducer } from '~/slices/categories/categories.slice';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
  app: ReturnType<typeof appReducer>;
  accounts: ReturnType<typeof accountsReducer>;
  records: ReturnType<typeof recordsReducer>;
  categories: ReturnType<typeof categoriesReducer>;
};

type ExtraArguments = {
  accountsApi: typeof accountsApi;
  authApi: typeof authApi;
  recordsApi: typeof recordsApi;
  usersApi: typeof usersApi;
  categoriesApi: typeof categoriesApi;
  storage: typeof storage;
  notification: typeof notification;
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
        accounts: accountsReducer,
        auth: authReducer,
        app: appReducer,
        records: recordsReducer,
        categories: categoriesReducer,
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
      accountsApi,
      recordsApi,
      usersApi,
      authApi,
      categoriesApi,
      storage,
      notification,
    };
  }
}

export { type ExtraArguments, Store };
