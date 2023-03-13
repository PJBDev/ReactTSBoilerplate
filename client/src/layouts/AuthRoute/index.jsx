import { styled } from "solid-styled-components";
import { useNavigate, Outlet } from "@solidjs/router";
import { useUser } from "../../stores/UserStore";
import NavbarBrand from "../../components/NavbarBrand";

export default function AuthRoute() {
  const [user] = useUser();
  const navigate = useNavigate();

  if (!localStorage.getItem("isAuth")) {
    return (
      <>
        <PageContainer>
          <PageLeft>
            <Outlet />
          </PageLeft>

          <PageRight>
            <NavbarBrand />
          </PageRight>
        </PageContainer>
      </>
    );
  } else {
    return navigate("/a/inbox");
  }
}

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
