import { Link } from "@tanstack/react-router";
import { PropsWithChildren } from "react";
import useUserStore from "@/hooks/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../auth/components/logout";

export default function Navigation({ children }: PropsWithChildren): JSX.Element | undefined {
  const user = useUserStore();
  const { isLoading, isAuthenticated } = useAuth0();

  // if (isLoading || !isAuthenticated || !user.sub) {
  //   return (
  //     <>
  //       { children }
  //     </>
  //   );
  //} else 
  if (!isLoading && isAuthenticated){
    return (
      <>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/manage-account" className="[&.active]:font-bold">
            Manage Account
          </Link>
          <LogoutButton></LogoutButton>
        </div>
        <div>
          { children }
        </div>
      </>
    );
  }
}