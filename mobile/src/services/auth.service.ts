import { api, ApiError } from "./api";
import { saveToken, removeToken } from "../utils/storage";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth.types";

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  message: string;
  displayMessage: string;
}

interface ProfileResponse {
  user: User;
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "/sessions/password",
      credentials
    );
    await saveToken(response.token);

    // Buscar perfil do usuário após login
    const profile = await getProfile();

    return {
      token: response.token,
      user: profile.user,
    };
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw error as ApiError;
    }
    throw { message: "Failed to login", status: 500 } as ApiError;
  }
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  try {
    const response = await api.post<RegisterResponse>("/users", credentials);

    // Após criar conta, fazer login automaticamente
    const loginResponse = await login({
      email: credentials.email,
      password: credentials.password,
    });

    return loginResponse;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw error as ApiError;
    }
    throw { message: "Failed to register", status: 500 } as ApiError;
  }
};

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const response = await api.get<ProfileResponse>("/profile");
    return response;
  } catch (error) {
    if (error && typeof error === "object" && "message" in error) {
      throw error as ApiError;
    }
    throw { message: "Failed to get profile", status: 500 } as ApiError;
  }
};

export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await api.get("/profile");
    return true;
  } catch {
    await removeToken();
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await removeToken();
};
