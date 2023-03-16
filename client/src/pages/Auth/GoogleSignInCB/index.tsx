import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../styles";
import type { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { googleSignInCB } from "../../../store/User";

export default function GoogleSignInCB() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const idToken = window.location.href.split("id_token=")[1].split("&")[0];

    dispatch(googleSignInCB(idToken));
  }, []);

  useEffect(() => {
    const userString = localStorage.getItem("user") || "";
    const currentUser = JSON.parse(userString || "{}");

    if (currentUser.isAuth) {
      navigate("/a/onboarding/organization");
    }
  }, [user]);

  return <PageContainer></PageContainer>;
}
