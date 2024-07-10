import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import Navigation from "@/features/nav/side-nav";

type RouterContext = {
  isAuthenticated: boolean;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {

    return (
      <>
        <Navigation />
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
