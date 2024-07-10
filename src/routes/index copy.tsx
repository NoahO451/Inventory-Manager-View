import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Spinner } from '@/components/ui/spinner'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import useUserStore from '@/hooks/useUserStore';
import { useGetUser } from '@/features/auth/api/get-user';
import { useAuthLoading } from '@/features/auth/components/authLoadingContext';

export const Route = createFileRoute('/index copy')({
  component: Index,
})

function Index() {
  const userUuid = "e7bd758c-e8bb-45f0-ab4d-e7a331b60729";

  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [cookieSet, setIsCookieSet] = useState(false);
  const [userData, setUserData] = useState(false);
  const getUserQuery = useGetUser({ userUuid, isAuthenticated, cookieSet, userData });
  const { loading, setLoading } = useAuthLoading();

  useEffect(() => {
    console.log('current useAuthLoading value is... ' + loading)
    // split this into functions damn it
    if (!isAuthenticated && !isLoading) {
      setLoading(true)
      setUserData(false);
      setIsCookieSet(false);
      console.log('not authenticated, redirecting in 3 seconds...')
      setTimeout(() => {
        loginWithRedirect();
      }, 3000);
    }

    const fetchCookie = async () => {
      if (isAuthenticated && !isLoading && !Cookies.get("auth_token")) {
        const idToken = await getAccessTokenSilently();
  
        if (idToken) {
          Cookies.set("auth_token", idToken, { expires: 1 }); 
          setIsCookieSet(true);
        } else if (Cookies.get('auth_token')) {
          setIsCookieSet(true);
        }
      }

      const fetchUser = async () => {
        if (!isLoading && !userData && Cookies.get("auth_token")) {
          try {

            if (!getUserQuery.isLoading) {
              const userData = {
                uuid: getUserQuery.data?.userUuid || "",
                username: user?.nickname || "",
                firstName: getUserQuery.data?.firstName || "",
                lastName: getUserQuery.data?.lastName || "",
                nickname: getUserQuery.data?.nickname || "",
                email: user?.email || "",
                sub: user?.sub || "",
              };

              setUser(userData);
              setUserData(true);
              setLoading(false);
              console.log('current useAuthLoading value is... ' + loading)

            }
          } catch (error) {
            console.error("Failed to save token to cookie:", error);
          }
        }
      };

      fetchUser();

      if (isAuthenticated && !isLoading && Cookies.get("auth_token")) {
        setLoading(false);
        setTimeout(() => {
          console.log('cookie obtained... navigating to /dashboard')
          navigate({ to: "/dashboard" });
        }, 2000);
      }
    }

    fetchCookie();
  }, [getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect, navigate, setUserData, getUserQuery.data]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
}
