import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  if (localStorage.getItem("isAuth")) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
