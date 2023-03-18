import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MailLockIcon from "@mui/icons-material/MailLock";
import { toast } from "react-toastify";
import type { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../../../store/User";

export default function VerifyEmailSent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      toast.error("Invalid token or token expired.");
    }

    dispatch(verifyEmail(token)).then((res) => {
      if (res.type === "user/verifyEmail/fulfilled") {
        toast.success("Email verified successfully.");
        navigate("/auth/login");
      } else {
        toast.error("Invalid link or link expired.");
      }
    });
  }, []);

  return (
    <>
      {user.loading && (
        <VerifyContainer>
          <CircularProgress />
          <h3>Verifying your email address....</h3>
        </VerifyContainer>
      )}

      {!user.loading && user.isEmailVerified && (
        <VerifyContainer>
          <VerifyHeader>
            <MarkEmailReadIcon sx={{ fontSize: 50, color: "#1a91da" }} />
            <h2>Email Verified</h2>
          </VerifyHeader>

          <VerifyBody>
            <p>
              Congratulations your email address has been verified. You can now
              login to your account.
            </p>
          </VerifyBody>

          <VerifyFooter>
            <VerifyButton onClick={() => navigate("/auth/login")}>
              Login
            </VerifyButton>
          </VerifyFooter>
        </VerifyContainer>
      )}

      {!user.loading && !user.isEmailVerified && (
        <VerifyContainer>
          <VerifyHeader>
            <MailLockIcon sx={{ fontSize: 50, color: "#1a91da" }} />
            <h2>Invalid Token.</h2>
          </VerifyHeader>

          <VerifyBody>
            <p>
              Sorry, we couldn't verify your email address. The verification
              link may have expired.
            </p>
          </VerifyBody>

          <VerifyFooter>
            <VerifyButton onClick={() => navigate("/auth/resend-email")}>
              Resend Email
            </VerifyButton>
          </VerifyFooter>
        </VerifyContainer>
      )}
    </>
  );
}

const VerifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  gap: 50px;
  padding: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;

const VerifyHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const VerifyBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;

  p {
    font-size: 0.9rem;
    text-align: center;

    @media screen and (max-width: 768px) {
      font-size: 1rem;
    }
  }

  span {
    font-size: 0.8rem;
    text-align: center;
    color: #a3a3a3;
  }
`;

const VerifyFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    font-weight: bold;
    text-align: center;
    color: #2e37d7;
    cursor: pointer;
  }
`;

const VerifyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background-color: #1a91da;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;
