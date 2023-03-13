import type { Component } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import { onMount } from "solid-js";
import axios from "axios";
import { notificationService } from "@hope-ui/solid";
import { SOLID_APP_API_SERVER } from "../../../config";
import { useUser } from "../../../stores/UserStore";

import { PageContainer, AuthBody } from "../../../components/styles";

const GoogleSignInCallBack: Component = () => {
  const navigate = useNavigate();

  // get user token from url
  onMount(() => {
    if (!window.location.href.includes("id_token"))
      return navigate("/auth/login");

    const idToken = window.location.href.split("id_token=")[1].split("&")[0];

    if (idToken) {
      axios
        .post(`${SOLID_APP_API_SERVER}/auth/google/callback/signin`, {
          idToken,
        })
        .then((res) => {
          console.log(res);
          return navigate("/auth/login");
        })
        .catch((err) => {
          console.log(err.response.status);
          return navigate("/auth/login");
        });
    }
  });

  return (
    <>
      <PageContainer>
        <AuthBody></AuthBody>
      </PageContainer>
    </>
  );
};

export default GoogleSignInCallBack;
