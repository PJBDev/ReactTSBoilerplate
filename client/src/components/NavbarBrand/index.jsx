import { styled } from "solid-styled-components";
import { useNavigate } from "@solidjs/router";

export default function NavbarBrand() {
  const navigate = useNavigate();
  return (
    <NavBrand onClick={() => navigate("/")}>
      <span>Client Cycle</span>
    </NavBrand>
  );
}

const NavBrand = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  cursor: pointer;

  img {
    height: 25px;
  }

  span {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    font-size: larger;
  }
`;
