'use client';

import React from 'react';
import './globals.scss';
import { ConfigProvider, theme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import I18nProvider from './i18n-provider';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
              token: { colorPrimary: '#1677ff', borderRadius: 8 },
            }}
          >
            <I18nProvider>{children}</I18nProvider>
          </ConfigProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
