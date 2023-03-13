import type { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { useNavigate, A } from "@solidjs/router";
import { createEffect, createSignal, Show, onMount } from "solid-js";
import axios from "axios";
import { notificationService } from "@hope-ui/solid";
import { SOLID_APP_API_SERVER } from "../../../config";
import { CircularProgress, CircularProgressIndicator } from "@hope-ui/solid";

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
} from "../../../components/styles";

interface FormData {
  email: string;
  pw: string;
}

const Login: Component = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(false);
  const [verificationSent, setVerificationSent] = createSignal(false);
  const [formData, setFormData] = createSignal<FormData>({
    email: "",
    pw: "",
  });

  // Handle Input Change
  const handleInputChange = (e: any) => {
    setFormData({
      ...formData(),
      [e.target.name]: e.target.value,
    });
  };

  // Handle Sign In
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVerificationSent(true);
    }, 2000);

    axios
      .post(`${SOLID_APP_API_SERVER}/auth/signin`, formData())
      .then((res) => {
        console.log(res);
        return window.open(res.data.url, "_self");
      })
      .catch((err) => {
        console.log(err.response.status);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle Google Sign In
  const handleGoogleSignIn = (e: any) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${SOLID_APP_API_SERVER}/auth/google/signin`)
      .then((res) => {
        return window.open(res.data.url, "_self");
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  };

  return (
    <>
      <PageContainer>
        <AuthBody>
          <Show when={loading()}>
            <CircularProgress indeterminate>
              <CircularProgressIndicator color="$inherit" />
            </CircularProgress>
          </Show>

          <Show when={!loading()}>
            <AuthHeader>
              <h2>Welcome Back</h2>
              <p>Login to continue improving your workflow.</p>
            </AuthHeader>

            <GoogleButton onClick={handleGoogleSignIn}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Logo"
              />
              <p>Sign in with Google</p>
            </GoogleButton>

            <OrDiv>
              <span>or</span>
            </OrDiv>

            <AuthForm onSubmit={handleSubmit}>
              <AuthDiv>
                <AuthLabel for="email">Email</AuthLabel>
                <AuthInput
                  autocomplete="new-password"
                  type="email"
                  name="email"
                  value={formData().email}
                  onChange={(e) => handleInputChange(e)}
                />
              </AuthDiv>

              <AuthDiv>
                <AuthLabel for="password">Password</AuthLabel>
                <AuthInput
                  autocomplete="new-password"
                  type="password"
                  name="pw"
                  value={formData().pw}
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
                  <A href="/auth/register">Sign Up</A>
                </LinkText>
              </p>
            </AuthFooter>
          </Show>
        </AuthBody>
      </PageContainer>
    </>
  );
};

export default Login;
