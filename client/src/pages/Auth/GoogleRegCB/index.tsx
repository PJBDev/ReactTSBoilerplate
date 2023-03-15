import React, { useEffect } from "react";
import { PageContainer } from "../styles";
import type { RootState, AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { googleSignUpCB } from "../../../store/User";

export default function GoogleRegCB() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const idToken = window.location.href.split("id_token=")[1].split("&")[0];

    dispatch(googleSignUpCB(idToken));
  }, []);

  return <PageContainer></PageContainer>;
}
