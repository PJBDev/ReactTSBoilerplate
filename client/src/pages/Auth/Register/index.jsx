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

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(false);
  const [verificationSent, setVerificationSent] = createSignal(false);
  const [formData, setFormData] = createSignal({
    fullName: "",
    email: "",
    pw: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData(),
      [e.target.name]: e.target.value,
    });
  };

  // Handle manual Registration
  const handleSubmit = (e) => {
    e.preventDefault();

    const firstName = formData().fullName.split(" ")[0];
    const lastName = formData().fullName.split(" ")[1];

    if (!firstName || !lastName) {
      return notificationService.show({
        status: "danger",
        title: "Field Error",
        description: "Please include both your first and last name.",
      });
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setVerificationSent(true);
    }, 2000);

    axios
      .post(`${SOLID_APP_API_SERVER}/auth/register`, formData())
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

  // Handle Google Registration
  const handleGoogleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${SOLID_APP_API_SERVER}/auth/google/register`)
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
              <h2>Sign Up</h2>
              <p>Start your free 14-day trial.</p>
            </AuthHeader>

            <GoogleButton onClick={handleGoogleRegistration}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Logo"
              />
              <p>Sign up with Google</p>
            </GoogleButton>

            <OrDiv>
              <span>or</span>
            </OrDiv>

            <AuthForm onSubmit={handleSubmit}>
              <AuthDiv>
                <AuthLabel for="email">Full Name</AuthLabel>
                <AuthNameInput
                  autocomplete="new-password"
                  type="text"
                  name="fullName"
                  value={formData().fullName}
                  onChange={(e) => handleInputChange(e)}
                />
              </AuthDiv>

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
                <AuthButton type="submit">Create Account</AuthButton>
              </div>
            </AuthForm>

            <AuthFooter>
              <p>
                Already have an account?{" "}
                <LinkText>
                  <A href="/auth/login">Login</A>
                </LinkText>
              </p>
            </AuthFooter>
          </Show>
        </AuthBody>
      </PageContainer>
    </>
  );
}
