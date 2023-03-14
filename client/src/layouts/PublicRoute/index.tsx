import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function PublicRoute() {
  return (
    <>
      <Navbar>
        <NavLeft>
          <h1>Client Cycle</h1>
        </NavLeft>

        <NavCenter>
          <NavItems>
            <NavItem>Features</NavItem>

            <NavItem>Pricing</NavItem>

            <NavItem>Blog</NavItem>
          </NavItems>
        </NavCenter>

        <NavRight>
          <SignUpButton>Start your 14-day free trial</SignUpButton>
        </NavRight>
      </Navbar>

      <Outlet />
    </>
  );
}

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  z-index: 10;
  height: 4rem;
  background-color: #fff;
  padding: 0 1rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    height: fit-content;
    flex-direction: column;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

const NavCenter = styled.div`
  display: flex;
  align-items: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavItem = styled.div`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpButton = styled.button`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  }
`;
