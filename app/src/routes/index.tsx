import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => {
  const isAuthenticated = false;

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};
