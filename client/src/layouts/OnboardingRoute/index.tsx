import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

export default function OnboardingRoute() {
  const userString = localStorage.getItem("user") || "";
  const currentUser = JSON.parse(userString || "{}");

  if (currentUser.isAuth && !currentUser.organization) {
    return (
      <PageContainer>
        <Outlet />
      </PageContainer>
    );
  } else if (currentUser.isAuth && currentUser.organization) {
    return <Navigate to="/a/dashboard" />;
  } else {
    return <Navigate to="/auth/login" />;
  }
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;
