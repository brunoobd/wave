import { useAuth } from "./useAuth";

export function useIsSignedOut(): boolean {
  const { state } = useAuth();
  return state.userToken === null;
}
