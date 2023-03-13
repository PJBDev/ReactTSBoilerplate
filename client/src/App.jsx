import styles from "./App.module.css";
import { lazy, onCleanup } from "solid-js";
import { Routes, Route, useNavigate } from "@solidjs/router";
import axios from "axios";

// Authentication pages
import AuthRoute from "./layouts/AuthRoute";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import GoogleSignInCallBack from "./pages/Auth/GoogleSignInCallBack";
import GoogleRegCallBack from "./pages/Auth/GoogleRegCallBack";

function App() {
  // Add the authorization header to every request
  axios.interceptors.request.use(
    async (config) => {
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
      throw error;
    }
  );

  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthRoute />}>
          <Route
            path="/google/callback/signin"
            element={<GoogleSignInCallBack />}
          />
          <Route
            path="/google/callback/register"
            element={<GoogleRegCallBack />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
