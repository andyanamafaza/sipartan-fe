import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

// Custom hooks to "encapsulate" hooks from external dependencies
// This file is used to wrap hooks from react-auth-kit

export function useAuthHeaderWrap() {
    const authHeader = useAuthHeader();
    const headers = {
        'Authorization': authHeader
    };
    return headers;
};

export function useIsAuthenticatedWrap() {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated;
};

export function useSignOutWrap() {
    const signOut = useSignOut();
    return signOut;
}