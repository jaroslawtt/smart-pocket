import '~/assets/css/styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  App,
  ProtectedRoute,
  RouterProvider,
  StoreProvider,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { store } from '~/libs/packages/store/store.js';
import { Auth } from '~/pages/auth/auth.js';
import { Dashboard } from '~/pages/dashboard/dashboard.js';
import { NotFound } from '~/pages/not-found/not-found.js';
import { Notification } from '~/libs/components/components.js';
import { Accounts } from '~/pages/accounts/accounts';
import { AccountDetails } from '~/pages/account-details/account-details';
import {Records} from "~/pages/records/records";
import {Settings} from "~/pages/settings/settings";

createRoot(document.querySelector('#root') as HTMLElement).render(
  <StrictMode>
    <StoreProvider store={store.instance}>
      <RouterProvider
        routes={[
          {
            path: AppRoute.ROOT,
            element: <App />,
            children: [
              {
                path: AppRoute.DASHBOARD,
                element: (
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.ACCOUNTS,
                element: (
                  <ProtectedRoute>
                    <Accounts />
                  </ProtectedRoute>
                ),
              },
                {
                  path: AppRoute.RECORDS,
                  element: (
                      <ProtectedRoute>
                          <Records />
                      </ProtectedRoute>
                  )
                },
                {
                  path: AppRoute.SETTINGS,
                  element: (
                      <ProtectedRoute>
                          <Settings />
                      </ProtectedRoute>
                  )
                },
              {
                path: AppRoute.ACCOUNTS_DETAILS_$ID,
                element: (
                  <ProtectedRoute>
                    <AccountDetails />
                  </ProtectedRoute>
                ),
              },
              {
                path: AppRoute.SIGN_IN,
                element: <Auth />,
              },
              {
                path: AppRoute.SIGN_UP,
                element: <Auth />,
              },
            ],
          },
          {
            path: AppRoute.ANY,
            element: <NotFound />,
          },
        ]}
      />
    </StoreProvider>
    <Notification />
  </StrictMode>,
);
