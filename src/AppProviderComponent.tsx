import App from "./App";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import React from "react";

export default function AppProviderComponent() {

    const store = createStore({
        authName: '_auth',
        authType: 'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: window.location.protocol === 'https:',
    });

    const client = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
            },
        },
    });

    return (
        <AuthProvider store={store}>
            <QueryClientProvider client={client}>
                <App />
            </QueryClientProvider>
        </AuthProvider>
    );
}
