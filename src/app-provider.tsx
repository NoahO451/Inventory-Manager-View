import { useEffect, useState } from "react";
import { Spinner } from "./components/ui/shadcn/spinner";
import { useAuth0 } from "@auth0/auth0-react";
import { RouterProvider } from "@tanstack/react-router";
import { useGetUser } from "./features/auth/api/get-user";
import Cookies from "js-cookie";
import useUserStore from '@/hooks/useUserStore';

type AppProviderProps = {
  router: any; //Router<TRouteTree, TTrailingSlashOption, TDehydrated, TSerializedError>
  //children?: React.ReactNode;
};

export default function AppProvider({
  router,
}: AppProviderProps): JSX.Element | null {
  const userUuid = "e7bd758c-e8bb-45f0-ab4d-e7a331b60729";
  const {isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, user} = useAuth0();
  const { setUser } = useUserStore();
  const [userData, setUserData] = useState(false);
  const [cookieSet, setIsCookieSet] = useState(false);

  const getUserQuery = useGetUser({ userUuid, isAuthenticated, cookieSet, userData });
  useEffect(() => {
  //  if (!isLoading && !isAuthenticated) {
  //    try {
  //      getAccessTokenSilently();
  //    } catch (error: any) {
  //      console.log(error);
  //      throw error;
  //    }
  //  }
    const authenticateAndUpdateToken = async () => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }

        if (isAuthenticated && !isLoading && !Cookies.get("auth_token")) {
          const idToken = await getAccessTokenSilently();

          if (idToken) {
            Cookies.set("auth_token", idToken, { expires: 1 });
            setIsCookieSet(true);
          } else {
            setIsCookieSet(false);
          }
        } 

        if (isAuthenticated && !isLoading) {
            const auth_token = Cookies.get("auth_token");
            // Check if token exists and is not expired
            if (auth_token) {
                const tokenData = JSON.parse(atob(auth_token.split('.')[1])); 
                const tokenExpiration = tokenData.exp * 1000; 

                if (Date.now() >= tokenExpiration) {
                    // Token is expired, attempt to get a new token
                    try {
                        const idToken = await getAccessTokenSilently();
                        if (idToken) {
                            Cookies.set("auth_token", idToken, { expires: 1 });
                            setIsCookieSet(true);
                        }
                    } catch (error) {
                        console.error('Failed to get new token:', error);
                    }
                } else {
                  setIsCookieSet(true);
                }
            }
        }
    };
    
    authenticateAndUpdateToken();

    const fetchUser = async () => {
      try {
        if (!getUserQuery.isLoading && getUserQuery.data && user) {
          const userQueryData = {
            uuid: getUserQuery.data.userUuid || "",
            username: user?.nickname || "",
            firstName: getUserQuery.data.firstName || "",
            lastName: getUserQuery.data.lastName || "",
            nickname: getUserQuery.data.nickname || "",
            email: user?.email || "",
            sub: user?.sub || "",
          };

          setUser(userQueryData);
          setUserData(true);
        } else {
          setUserData(false);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, [getAccessTokenSilently, isAuthenticated, isLoading, loginWithRedirect, getUserQuery.data, getUserQuery.isLoading, user, setUser]);

  // Authenticate user and save their data to store before allowing router to load
  if (isLoading || !isAuthenticated || !userData) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return <RouterProvider router={router} context={{ isAuthenticated }} />;
}

