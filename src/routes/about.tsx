import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  beforeLoad: ({ context }: any) => {
    if (!context.isAuthenticated) {
      console.log('not logged in!')
      throw redirect({
        to: "/login",
      });
    } else {
      console.log('/about is logged in!')
    }
  },
  component: About,
});

function About() {
  return <div className="p-2">Hello from About!</div>
}

