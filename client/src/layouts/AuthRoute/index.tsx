import { Navigate, Outlet } from "react-router-dom";
import styled from "styled-components";

export default function AuthRoute() {
  if (!localStorage.getItem("isAuth")) {
    return (
      <PageContainer>
        <PageLeft>
          <Outlet />
        </PageLeft>

        <PageRight></PageRight>
      </PageContainer>
    );
  } else {
    return <Navigate to="/a/dashboard" />;
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

const PageLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 50%;
`;

const PageRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 50%;
  color: #fafafa;
  background: linear-gradient(to top, #2b35d5, #505af2);

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
