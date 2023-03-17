import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const userString = localStorage.getItem("user") || "";
  const currentUser = JSON.parse(userString || "{}");

  if (currentUser.isAuth && currentUser.organization) {
    return <Outlet />;
  }

  if (currentUser.isAuth && !currentUser.organization) {
    return <Navigate to="/onboarding/organization" />;
  }

  if (currentUser.isAuth && !currentUser.isEmailVerified) {
    return <Navigate to="/auth/verify-email" />;
  }

  return <Navigate to="/auth/login" />;
}
