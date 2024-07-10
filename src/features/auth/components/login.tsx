import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import useUserStore from "@/hooks/useUserStore";
import { useGetUser } from "../api/get-user";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, user } = useAuth0();
  const { setUser } = useUserStore();

  const userUuid = "e7bd758c-e8bb-45f0-ab4d-e7a331b60729";
  const getUserQuery = useGetUser({ userUuid, isAuthenticated });

  useEffect(() => {
    const saveTokenToCookie = async () => {
      if (isAuthenticated && user) {
        try {
          const idToken = await getAccessTokenSilently();

          if (idToken) {
            Cookies.set("auth_token", idToken, { expires: 1 }); // Expires in 1 day, change later
          }

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
          }
        } catch (error) {
          console.error("Failed to save token to cookie:", error);
        }
      }
    };

    saveTokenToCookie();
  }, [isAuthenticated, getAccessTokenSilently, setUser]);

  return (
    <>
      <button className="button__login" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </>
  );
}
