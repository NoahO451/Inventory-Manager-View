import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import TopNav from "@/features/nav/components/top-nav";
import SideNav from "@/features/nav/components/side-nav";

import { PiSquaresFour } from "react-icons/pi";

type RouterContext = {
  isAuthenticated: boolean;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {

    return (
      <>
        <div className="flex w-[300px]">
          <SideNav
              links= {[
                {
                  title: "Dashboard",
                  label: "",
                  icon: <PiSquaresFour />,
                  variant: "default",
                }]
              }
          />
          <div className="flex justify-start">
            <TopNav />
          </div>
        </div>


        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
