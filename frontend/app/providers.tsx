"use client";
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
            },
        },
    }));

    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider
                defaultColorScheme="light"
                // withGlobalStyles
                // withNormalizeCSS
                theme={{
                    primaryColor: 'blue',
                    defaultRadius: 'md',
                }}
            >
                {children}
            </MantineProvider>
        </QueryClientProvider>
    );
}