import { createContext, PropsWithChildren, Suspense, useContext, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider, useNavigate } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { useAuth0 } from "@auth0/auth0-react";
import AppProvider from "./app-provider";
import { LoadingProvider } from "./features/auth/components/authLoadingContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  },
})
const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: false,
    queryClient,
  },
  defaultPreload: "intent",
  // Don't want loader calls to ever be stale
  // Ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  // defaultPendingComponent: () => (
  //   <div className={`p-2 text-2xl`}>
  //     <Spinner />
  //   </div>
  // ),
  defaultNotFoundComponent: () => {
    return (
      <div>
        <h1 className="text-red-500">NOT FOUND</h1>
      </div>
    );
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <LoadingProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} context={{ isAuthenticated }} />
        </QueryClientProvider>
      </LoadingProvider>
    </Suspense>
  );
}
