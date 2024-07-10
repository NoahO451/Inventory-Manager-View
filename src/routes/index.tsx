import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Spinner } from '@/components/ui/spinner';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useUserStore from '@/hooks/useUserStore';
import { useGetUser } from '@/features/auth/api/get-user';
import { useAuthLoading } from '@/features/auth/components/authLoadingContext';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {

  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [cookieSet, setIsCookieSet] = useState(false);
  const [userData, setUserData] = useState(false);
  const getUserQuery = useGetUser({ userUuid, isAuthenticated, cookieSet, userData });
  const { setLoading } = useAuthLoading();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!getUserQuery.isLoading && getUserQuery.data && user) {
          const userQueryData = {
            uuid: getUserQuery.data.userUuid || '',
            username: user?.nickname || '',
            firstName: getUserQuery.data.firstName || '',
            lastName: getUserQuery.data.lastName || '',
            nickname: getUserQuery.data.nickname || '',
            email: user?.email || '',
            sub: user?.sub || '',
          };

          setUser(userQueryData);
          setUserData(true);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchCookie = async () => {
      if (isAuthenticated && !isLoading && !Cookies.get('auth_token')) {
        const idToken = await getAccessTokenSilently();

        if (idToken) {
          Cookies.set('auth_token', idToken, { expires: 1 });
          setIsCookieSet(true);
        } else {
          setIsCookieSet(false);
        }
      } else {
        setIsCookieSet(true);
      }
    };

    if (!isAuthenticated && !isLoading) {
      setLoading(true);
      loginWithRedirect();
    } else {
      fetchCookie();
    }

    if (isAuthenticated && !isLoading && userData && getUserQuery.data) {
      setLoading(false);
      navigate({ to: '/dashboard'});
    }

    fetchUser();
  }, [getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect, navigate, setUser, getUserQuery.isLoading, getUserQuery.data, setLoading]);

  if (!isAuthenticated || isLoading || getUserQuery.isLoading || !userData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return null;
}
