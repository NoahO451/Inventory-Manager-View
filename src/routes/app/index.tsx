import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: Index,
});

function Index() { 
    return (
        <h1>Welcome to index</h1>
    )
}