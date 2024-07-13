import useUserStore from "@/hooks/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect } from "react";

export const Route = createFileRoute('/manage-account')({
  beforeLoad: ({ context }: any) => {
    if (!context.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: ManageAccount
})

function ManageAccount() {
  const userStore = useUserStore();
  const { isLoading } = useAuth0();

  useEffect(() => {
  }, [userStore, isLoading]);

  if (isLoading || !userStore?.firstName) {
    return <div>Loading...</div>;
  }

  return (
      <div className="p-4">
        <h1>Hello from manage accounts</h1>
        <div>
          <h2>Hello, {userStore?.nickname}!</h2>
          <p>Here is your account information: </p>
          <div>
          <p>{userStore?.uuid}</p>
          <p>{userStore?.username}</p>
          <p>{userStore?.firstName}</p>
          <p>{userStore?.lastName}</p>
          <p>{userStore?.nickname}</p>
          <p>{userStore?.email}</p>
          <p>{userStore?.sub}</p>
          </div>
        </div>
        {/* <img src={user?.picture} alt={user?.name} /> */}
      </div>
  );
}

