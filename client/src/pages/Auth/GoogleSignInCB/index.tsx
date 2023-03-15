import React, { useEffect } from "react";
import { PageContainer } from "../styles";
import type { RootState, AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { googleSignInCB } from "../../../store/User";

export default function GoogleSignInCB() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const idToken = window.location.href.split("id_token=")[1].split("&")[0];

    dispatch(googleSignInCB(idToken));
  }, []);
  return <PageContainer></PageContainer>;
}
