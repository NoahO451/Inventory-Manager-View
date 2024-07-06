import { Button } from '@/components/ui/button'
import { createLazyFileRoute } from '@tanstack/react-router'
import LoginButton from '@/features/auth/components/login'
import LogoutButton from '@/features/auth/components/logout'

export const Route = createLazyFileRoute('/')({
  component: Index,
})


function Index() {

  return (
    <>

    <LoginButton></LoginButton>
    <LogoutButton></LogoutButton>
    <br></br>
    <Button variant="destructive">Click Me</Button>
    </>
  )
}
