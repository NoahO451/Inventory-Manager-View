import useUserStore from "@/hooks/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/manage-account/')({
  beforeLoad: ({ context }: any) => {
    if (!context.isAuthenticated) {
      console.log('not logged in!')
      throw redirect({
        to: "/",
      });
    } else {
      console.log('/about is logged in!')
    }
  },
  component: ManageAccount
})

function ManageAccount() {
  const { user } = useAuth0();
  const userStore = useUserStore();

  // if (!user) { 
  //   return null;
  // }

  console.log(userStore?.uuid)

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

