import {
  createRootRouteWithContext,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";
import TopNav from "@/features/nav/components/top-nav";
import SideNav from "@/features/nav/components/side-nav";

// Icons
import { PiSquaresFour } from "react-icons/pi";
import { PiCalendarDots } from "react-icons/pi";
import { PiPackage } from "react-icons/pi";
import { PiTag } from "react-icons/pi";
import { PiTable } from "react-icons/pi";
import { FaEbay } from "react-icons/fa";

type RouterContext = {
  isAuthenticated: boolean;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        {/* Nav */}
        <div className="flex h-screen">
          <div className="flex w-[220px]">
            <SideNav
              links={[
                {
                  id: 0,
                  title: "Dashboard",
                  label: "",
                  to: "/app",
                  icon: <PiSquaresFour />,
                  variant: "menuItem",
                },
                {
                  id: 1,
                  title: "Events",
                  label: "",
                  to: "/construction",
                  icon: <PiCalendarDots />,
                  variant: "menuItem",
                },
                {
                  id: 2,
                  title: "Inventory",
                  label: "",
                  to: "/app/inventory",
                  icon: <PiPackage />,
                  variant: "menuItem",
                },
                {
                  id: 3,
                  title: "Sales",
                  label: "",
                  to: "/construction",
                  icon: <PiTag />,
                  variant: "menuItem",
                },
                {
                  id: 4,
                  title: "Reports",
                  label: "",
                  to: "/construction",
                  icon: <PiTable />,
                  variant: "menuItem",
                },
                {
                  id: 5,
                  title: "eBay",
                  label: "",
                  to: "/construction",
                  icon: <FaEbay />,
                  variant: "menuItem",
                }
              ]}
            />
          </div>
          <div className="flex-auto grow">
            <div className="">
              <TopNav />
            </div>
            {/* Page Content */}
            <div>
              <Outlet />
            </div>
          </div>
        </div>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
