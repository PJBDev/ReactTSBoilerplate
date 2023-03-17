import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import type { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";

import { AuthInput, AuthDiv, AuthLabel } from "../styles";

export default function ResendEmail() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleResendEmail = (e: any) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <>
      <VerifyContainer>
        <VerifyForm onSubmit={handleResendEmail}>
          <VerifyHeader>
            <MarkEmailUnreadIcon sx={{ fontSize: 50, color: "#1a91da" }} />
            <h2>Resend Email Verification</h2>
          </VerifyHeader>

          <VerifyBody>
            <AuthDiv>
              <AuthLabel>
                Please enter the email address you used to signup.
              </AuthLabel>
              <AuthInput
                autoComplete="new-password"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </AuthDiv>
          </VerifyBody>

          <VerifyFooter>
            <VerifyButton>Resend Email</VerifyButton>
          </VerifyFooter>
        </VerifyForm>
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

export const VerifyForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 100%;
  /* change input focus */
  input:focus {
    outline: 1px solid #788fa1;
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
