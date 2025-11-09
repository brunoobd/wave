import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { getToken } from "../utils/storage";
import {
  verifyToken,
  login,
  register,
  logout,
  getProfile,
} from "../services/auth.service";
import type {
  AuthState,
  AuthAction,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth.types";
import type { ApiError } from "../services/api";

type AuthContextData = {
  state: AuthState;
  user: User | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

function authReducer(prevState: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token,
        user: action.user ?? null,
        isLoading: false,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
        user: action.user,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        user: null,
      };
    default:
      return prevState;
  }
}

const initialState: AuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: null,
};

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await getToken();

        if (userToken) {
          const isValid = await verifyToken(userToken);
          if (isValid) {
            try {
              const profile = await getProfile();
              dispatch({
                type: "RESTORE_TOKEN",
                token: userToken,
                user: profile.user,
              });
            } catch (error) {
              console.error("Error fetching profile:", error);
              dispatch({
                type: "RESTORE_TOKEN",
                token: userToken,
                user: null,
              });
            }
          } else {
            dispatch({ type: "RESTORE_TOKEN", token: null, user: null });
          }
        } else {
          dispatch({ type: "RESTORE_TOKEN", token: null, user: null });
        }
      } catch (error) {
        console.error("Error restoring token:", error);
        dispatch({ type: "RESTORE_TOKEN", token: null, user: null });
      }
    };

    bootstrapAsync();
  }, []);

  const signIn = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await login(credentials);
      dispatch({ type: "SIGN_IN", token: response.token, user: response.user });
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  };

  const signUp = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      const response = await register(credentials);
      dispatch({ type: "SIGN_IN", token: response.token, user: response.user });
    } catch (error) {
      const apiError = error as ApiError;
      throw apiError;
    }
  };

  const signOut = async (): Promise<void> => {
    await logout();
    dispatch({ type: "SIGN_OUT" });
  };

  const value: AuthContextData = {
    state,
    user: state.user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
