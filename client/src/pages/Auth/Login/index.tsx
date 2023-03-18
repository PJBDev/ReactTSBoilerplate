import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import type { RootState, AppDispatch } from "../../../store";
import { loginUser, googleSignIn } from "../../../store/User";
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
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = React.useState<Form>({
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

  const handleStandardLogin = (e: any) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("All fields are required.");
    }

    dispatch(loginUser(formData)).then((res) => {
      const isEmailVerified = res.payload.user.isEmailVerified;
      const isDoneOnboarding = res.payload.user.organization;

      if (!isEmailVerified) {
        return navigate("/auth/verify-email-sent");
      }

      if (isEmailVerified && !isDoneOnboarding) {
        return navigate("/onboarding/organization");
      }

      if (isEmailVerified) {
        return navigate("/a/dashboard");
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
              </AuthHeader>

              <GoogleButton onClick={() => dispatch(googleSignIn())}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google Logo"
                />
                <p>Sign in with Google</p>
              </GoogleButton>

              <OrDiv>
                <span>or</span>
              </OrDiv>

              <AuthForm onSubmit={handleStandardLogin}>
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
                  <AuthButton type="submit">Login</AuthButton>
                </div>
              </AuthForm>

              <AuthFooter>
                <p>
                  Don't have an account?{" "}
                  <LinkText>
                    <Link to={"/auth/register"}>Sign Up</Link>
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
