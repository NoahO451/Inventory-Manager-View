import { Spinner } from "@/components/ui/shadcn/spinner";
import useUserStore from "@/hooks/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";

export default function LogoutButton() {
  const { logout } = useAuth0();
  const { reset } = useUserStore();
  
  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('auth_token', { path: '/' });
    reset();

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  };

  return (
    <button onClick={handleLogout}>
      <p className="text-sm">Sign Out</p>
    </button>
  );
}
