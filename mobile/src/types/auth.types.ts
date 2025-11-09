export type User = {
  id: string;
  email: string;
  name?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  name: string;
};

export type AuthState = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
  user: User | null;
};

export type AuthAction =
  | { type: "RESTORE_TOKEN"; token: string | null; user?: User | null }
  | { type: "SIGN_IN"; token: string; user: User }
  | { type: "SIGN_OUT" };
