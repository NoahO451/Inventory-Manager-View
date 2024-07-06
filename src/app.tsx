import { PropsWithChildren, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";


const queryClient: QueryClient = new QueryClient();

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

export default function App({ children }: PropsWithChildren): JSX.Element | null {


  const { isAuthenticated } = useAuth0();

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "",
        }}
        onRedirectCallback={(appState: any) => {
          window.history.pushState(
            {},
            document.title,
            appState?.returnTo || window.location.pathname
          );
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} context={{ isAuthenticated }} />
          { children }
        </QueryClientProvider>
      </Auth0Provider>
    </Suspense>
  );
}
