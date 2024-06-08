import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

// Functions to access hooks related to react-auth-kit
// Could just be called directly from the component,
// but we put it here to find where they're used easier

export function getAuthHeaders() {
    const authHeader = useAuthHeader();
    const headers = {
        'Authorization': authHeader
    };
    return headers;
};

export function getIsAuthenticated() {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated;
};