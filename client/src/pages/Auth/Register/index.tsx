import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import type { RootState, AppDispatch } from "../../../store";
import { registerUser, googleSignUp } from "../../../store/User";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  PageContainer,
  AuthHeader,
  AuthBody,
  AuthFooter,
  AuthForm,
  AuthInput,
  AuthDiv,
  AuthLabel,
  AuthNameDiv,
  AuthNameInput,
  AuthButton,
  AuthTextDiv,
  LinkText,
  GoogleButton,
  OrDiv,
} from "../styles";

interface Form {
  fullName: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = React.useState<Form>({
    fullName: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStandardSignUp = (e: any) => {
    e.preventDefault();

    const [firstName, lastName] = formData.fullName.split(" ");

    if (!firstName || !lastName || !formData.email || !formData.password) {
      return toast.error("All fields are required.");
    }

    dispatch(registerUser(formData)).then((res) => {
      if (res.type === "user/register/fulfilled") {
        navigate("/auth/verify-email-sent");
      }
    });
  };

  return (
    <>
      <PageContainer>
        <AuthBody>
          {user.loading && <CircularProgress />}

          {!user.loading && (
            <>
              <AuthHeader>
                <h2>Welcome Back</h2>
                <p>Start your 14-day free trial.</p>
              </AuthHeader>

              <GoogleButton onClick={() => dispatch(googleSignUp())}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Logo"
                />
                <p>Sign up with Google</p>
              </GoogleButton>

              <OrDiv>
                <span>or</span>
              </OrDiv>

              <AuthForm onSubmit={handleStandardSignUp}>
                <AuthDiv>
                  <AuthLabel>Full Name</AuthLabel>
                  <AuthInput
                    autoComplete="new-password"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </AuthDiv>

                <AuthDiv>
                  <AuthLabel>Email</AuthLabel>
                  <AuthInput
                    autoComplete="new-password"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e)}
                  />
                </AuthDiv>

                <AuthDiv>
                  <AuthLabel>Password</AuthLabel>
                  <AuthInput
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange(e)}
                  />
                </AuthDiv>

                <div>
                  <AuthButton type="submit">Create Account</AuthButton>
                </div>
              </AuthForm>

              <AuthFooter>
                <p>
                  Already have an account?{" "}
                  <LinkText>
                    <Link to={"/auth/login"}>Sign In</Link>
                  </LinkText>
                </p>
              </AuthFooter>
            </>
          )}
        </AuthBody>
      </PageContainer>
    </>
  );
}
