import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public Routes
import PublicRoute from "./layouts/PublicRoute";
import Home from "./pages/Public/Home";

// Authentication Routes
import AuthRoute from "./layouts/AuthRoute";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import GoogleRegCB from "./pages/Auth/GoogleRegCB";
import GoogleSignInCB from "./pages/Auth/GoogleSignInCB";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ResendEmail from "./pages/Auth/ResendEmail";

// Onboarding Routes
import OnboardingRoute from "./layouts/OnboardingRoute";

// Protected Routes
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  // Add the authorization header to every request if it exists
  axios.interceptors.request.use(
    async (config) => {
      config.withCredentials = true;

      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "accessToken"
        )}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // add an interceptor to check for errors in responses
  axios.interceptors.response.use(
    async (response) => {
      return response;
    },
    async (error) => {
      return {
        status: error.response.status,
        data: error.response.data,
      };
    }
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/auth" element={<AuthRoute />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/resend-email" element={<ResendEmail />} />
          <Route path="/auth/google/cb/register" element={<GoogleRegCB />} />
          <Route path="/auth/google/cb/signin" element={<GoogleSignInCB />} />
        </Route>

        <Route path="/onboarding" element={<OnboardingRoute />}>
          <Route path="/onboarding/organization" element={<h1>Page A</h1>} />
          <Route path="/onboarding/invite" element={<h1>Page B</h1>} />
        </Route>

        <Route path="/a" element={<ProtectedRoute />}>
          <Route path="/a/inbox" element={<h1>Page D</h1>} />
        </Route>
      </Routes>

      <ToastContainer
        position={toast.POSITION.BOTTOM_RIGHT}
        pauseOnFocusLoss={false}
        limit={3}
      />
    </>
  );
}

export default App;
