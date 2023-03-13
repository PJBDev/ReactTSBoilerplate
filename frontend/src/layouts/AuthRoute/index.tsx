import type { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { Outlet, A } from "@solidjs/router";
import { useUser } from "../../stores/UserStore";
// import NavbarBrand from "../../components/NavbarBrand";

const AuthRoute: Component = () => {
  //   const [user] = useUser();

  if (!localStorage.getItem("isAuth")) {
    return (
      <PageContainer>
        <PageLeft>
          <Outlet />
        </PageLeft>

        <PageRight>{/* <NavbarBrand /> */}</PageRight>
      </PageContainer>
    );
  } else {
    return <A href="/a/inbox">Home</A>;
  }
};

export default AuthRoute;

const PageContainer = styled("div")`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

const PageLeft = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 50%;
`;

const PageRight = styled("div")`
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
