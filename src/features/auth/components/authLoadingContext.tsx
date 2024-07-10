import {
  Dispatch,
  SetStateAction,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({
  children,
}: PropsWithChildren): JSX.Element | null {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useAuthLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
