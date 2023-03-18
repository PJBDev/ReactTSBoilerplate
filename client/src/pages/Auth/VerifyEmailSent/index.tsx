import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MailLockIcon from "@mui/icons-material/MailLock";
import type { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";

export default function VerifyEmailSent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <VerifyContainer>
        <VerifyHeader>
          <MailLockIcon sx={{ fontSize: 50, color: "#1a91da" }} />
          <h2>Please verify your email</h2>
        </VerifyHeader>

        <VerifyBody>
          <p>
            We've sent you an email to verify your account. Please click the
            link in the email to verify your email address.
          </p>

          <span>
            If you don't see the email, please check your spam folder.
          </span>
        </VerifyBody>

        <VerifyFooter>
          <p>Didn't receive an email?</p>
          <VerifyButton onClick={() => navigate("/auth/resend-email")}>
            Resend Email
          </VerifyButton>
        </VerifyFooter>
      </VerifyContainer>
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
