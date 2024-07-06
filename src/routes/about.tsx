import { createFileRoute, redirect, useBlocker } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
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
  component: About,
});


function About() {
  console.log('about');
  //console.log(isLogged());
  return <div className="p-2">Hello from About!</div>
}

