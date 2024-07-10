import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: Layout
});

export default function Layout() {
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
      <hr />
      <Outlet />
    </>
  );
}
