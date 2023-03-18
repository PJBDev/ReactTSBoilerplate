import React, { useEffect } from "react";
import { PageContainer } from "../styles";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { googleSignUpCB } from "../../../store/User";

export default function GoogleRegCB() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const idToken = window.location.href.split("id_token=")[1].split("&")[0];

    dispatch(googleSignUpCB(idToken)).then((res) => {
      if (res.type === "user/googleSignUpCB/fulfilled") {
        navigate("/a/dashboard");
      } else {
        navigate("/auth/login");
      }
    });
  }, []);

  return <PageContainer></PageContainer>;
}
