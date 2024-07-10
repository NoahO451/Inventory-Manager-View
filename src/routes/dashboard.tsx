import { Button } from '@/components/ui/button'
import { useGetUser } from '@/features/auth/api/get-user'
import LoginButton from '@/features/auth/components/login'
import LogoutButton from '@/features/auth/components/logout'
import useUserStore from '@/hooks/useUserStore'
import { useAuth0 } from '@auth0/auth0-react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }: any) => {
    if (!context.isAuthenticated) {
      console.log('not logged in!')
      throw redirect({
        to: "/",
      });
    } else {
      console.log('/index is logged in!')
    }
  },
  component: Dashboard
})

function Dashboard() {
  //const { setUser } = useUserStore();
  const { isLoading } = useAuth0();
  //const [loading, setIsLoading] = useState(false);

  if (isLoading) {
    return null;
  } else {
      return (
        <>
          <div className='mx-4'>
            <LogoutButton></LogoutButton>
            <br></br>
            <Button variant="destructive">Click Me</Button>
          </div>
        </>
      )
  }
}
