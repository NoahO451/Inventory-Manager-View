import { useAuth0 } from "@auth0/auth0-react";

interface UseSaveUserDataReturn {
  saveUserData: () => Promise<string | undefined>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function useSaveUserData(): UseSaveUserDataReturn {
    const { getAccessTokenSilently } = useAuth0();
  
    const saveUserData = async (): Promise<string | undefined> => {
      let token: string | undefined;
      try {
        token = await getAccessTokenSilently();
      } catch (e) {
        console.error("Error getting access token:", e);
      }
      return token;
    };
  
    return { saveUserData };
  }
  