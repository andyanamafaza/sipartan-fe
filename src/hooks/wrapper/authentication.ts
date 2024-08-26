import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import Cookies from 'js-cookie';

export function getAuthHeader() {
    // const authHeader = useAuthHeader();
    const token = Cookies.get('_auth');
    const headers = {
        'Authorization': token ? `Bearer ${token}` : ''
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
};