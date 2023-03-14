import React from "react";
import type { RootState } from "../../../store";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../../store/User";

export default function Home() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  //   const handleLogin = () => {
  //     dispatch(
  //       login({
  //         _id: "1",
  //         name: "Pauls",
  //         email: "",
  //       })
  //     );
  //   };

  return (
    <Wrapper>
      <h1>Home</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
