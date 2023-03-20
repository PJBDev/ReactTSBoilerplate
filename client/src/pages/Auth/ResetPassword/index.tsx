import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import type { RootState, AppDispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../../store/User";
import { toast } from "react-toastify";

import { AuthInput, AuthDiv, AuthLabel } from "../styles";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.password) {
      return toast.error("Password is required.");
    }

    if (!formData.confirmPassword) {
      return toast.error("Confirm password is required.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    dispatch(resetPassword(formData)).then((res) => {
      if (res.type === "user/resetPassword/fulfilled") {
        toast.success("Password reset successfully.");
        return navigate("/auth/login");
      } else {
        toast.error("Password not reset.");
      }
    });
  };

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      setFormData({ ...formData, token });
    }
  }, []);

  return (
    <>
      <VerifyContainer>
        <VerifyForm onSubmit={handleSubmit}>
          <VerifyHeader>
            <MarkEmailUnreadIcon sx={{ fontSize: 50, color: "#1a91da" }} />
            <h2>Forgot Password</h2>
          </VerifyHeader>

          <VerifyBody>
            <AuthDiv>
              <AuthLabel>Password</AuthLabel>
              <AuthInput
                autoComplete="new-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <AuthLabel>Confirm Password</AuthLabel>
              <AuthInput
                autoComplete="new-password"
                type="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </AuthDiv>
          </VerifyBody>

          <VerifyFooter>
            <VerifyButton>Reset Password</VerifyButton>
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
