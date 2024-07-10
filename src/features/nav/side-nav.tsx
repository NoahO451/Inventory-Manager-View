import { Link } from "@tanstack/react-router";
import { Spinner } from "@/components/ui/spinner";
import { useAuthLoading } from "../auth/components/authLoadingContext";
import { useEffect } from "react";
import useUserStore from "@/hooks/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
  const { loading } = useAuthLoading();

  const userStore = useUserStore();
  const { isLoading } = useAuth0();

  // left off needing this empty useEffect to keep nav from not getting updated user information

  // need this or the user data will not populate in links if the user rapidly clicks a link immedietly after logging in 
  useEffect(() => {
    // Fetch user data or trigger update in Zustand if necessary
    // Example fetch user data if not already loaded
  }, [userStore, isLoading]);
  
  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  } else {
    return (
      <>
        <div className="p-2 flex gap-2">
          <Link to="/dashboard" className="[&.active]:font-bold">
            Home
          </Link>{" "}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
          <Link to="/manage-account" className="[&.active]:font-bold">
            Manage Account
          </Link>
        </div>
      </>
    );
  }
};

export default Navigation;
