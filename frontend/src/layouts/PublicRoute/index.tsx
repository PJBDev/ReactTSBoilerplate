import type { Component } from "solid-js";
import { useNavigate, Outlet } from "@solidjs/router";

const PublicRoute: Component = () => {
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoute;
