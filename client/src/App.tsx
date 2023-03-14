import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

// Authnetication Routes
import AuthRoute from "./layouts/AuthRoute";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

// Public Routes
import PublicRoute from "./layouts/PublicRoute";
import Home from "./pages/Public/Home";

// Protected Routes
import ProtectedRoute from "./layouts/ProtectedRoute";

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
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/auth" element={<AuthRoute />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>

        <Route path="/a" element={<ProtectedRoute />}>
          <Route path="/a/inbox" element={<h1>Page D</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
