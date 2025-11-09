import { useAuth } from "./useAuth";

export function useIsSignedIn(): boolean {
  const { state } = useAuth();
  return state.userToken !== null;
}
