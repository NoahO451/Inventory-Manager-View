import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, redirect } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import AppProvider from "./app-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createRouter({
  routeTree,
  // InnerWrap: ({children}) => {
  //   return <Navigation>{children}</Navigation>
  // },
  context: {
    isAuthenticated: false,
    queryClient,
  },
  defaultPreload: "intent",
  // Don't want loader calls to ever be stale
  // Ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  // defaultPendingComponent: () => (
  defaultNotFoundComponent: () => {redirect({to: '/construction'})}
  //   <div className={`p-2 text-2xl`}>
  //     <Spinner />
  //   </div>
  // ),
  // defaultNotFoundComponent: () => {
  //   return (
  //     <div>
  //       <h1 className="text-red-500">NOT FOUND</h1>
  //     </div>
  //   );
  // },
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
  return (
      <QueryClientProvider client={queryClient}>
        <AppProvider router={router}></AppProvider>
      </QueryClientProvider>
  );
}
