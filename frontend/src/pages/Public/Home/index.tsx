import type { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { Outlet, A } from "@solidjs/router";
import { useUser } from "../../../stores/UserStore";

const Home: Component = () => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
