import { PropsWithChildren, useEffect } from "react";
import { LoadingProvider, useLoading } from "./features/auth/components/authLoadingContext";
import { Spinner } from "./components/ui/spinner";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "@tanstack/react-router";


export default function AppProvider({ children }: PropsWithChildren): JSX.Element | null {
    // const { loading, setLoading } = useLoading();
    // const { isLoading, isAuthenticated } = useAuth0();
    // const navigate = useNavigate();

    // if (!isAuthenticated || isLoading) {
    //     setLoading(true);
    // }
    
    // console.log('is loading from app-provider: ' + loading);
    // console.log('auth: ' + isAuthenticated);

    // useEffect(() => {
    //     if (!isAuthenticated && !isLoading && !loading) {
    //         navigate({ to: '/login' });
    //     }
    // }, [isAuthenticated, isLoading, navigate, loading]);

    
  // if () {
  //   return (
  //     <div className="flex h-screen w-screen items-center justify-center">
  //       <Spinner size="xl" />
  //     </div>
  //   );
  // }
//   if (loading) {
//     return (
//         <Spinner />
//     );
//     } else {
//         return (
//             <>
//                 { children }
//             </>
//         );
//     }
return (
    <>
        { children }
    </>
);
}
