import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

export default function OnboardingRoute() {
  const userString = localStorage.getItem("user") || "";
  const currentUser = JSON.parse(userString || "{}");

  const isOnboardingPending = currentUser.isAuth && !currentUser.organization;
  const isOnboardingComplete = currentUser.isAuth && currentUser.organization;

  if (isOnboardingPending) {
    return (
      <PageContainer>
        <Outlet />
      </PageContainer>
    );
  }

  if (isOnboardingComplete) {
    return <Navigate to="/a/dashboard" />;
  }

  return <Navigate to="/auth/login" />;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;
