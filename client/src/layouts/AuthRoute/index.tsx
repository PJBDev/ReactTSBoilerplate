import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  if (!localStorage.getItem("isAuth")) {
    return <Outlet />;
  } else {
    return <Navigate to="/a/dashboard" />;
  }
}
