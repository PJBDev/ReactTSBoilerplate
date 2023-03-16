import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const userString = localStorage.getItem("user") || "";
  const currentUser = JSON.parse(userString || "{}");

  if (!currentUser) return <Navigate to="/auth/login" />;

  if (currentUser.isAuth && currentUser.organization) {
    return <Outlet />;
  } else if (currentUser.isAuth && !currentUser.organization) {
    return <Navigate to="/onboarding/organization" />;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
