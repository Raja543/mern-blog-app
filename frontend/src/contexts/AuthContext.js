import React, { createContext, useEffect, useState, useRef } from "react";
import { axiosPrivate } from "../utils/axios";
import jwtDecoder from "jwt-decode";
import { catchError } from "../utils/catchError";
import LoadingScreen from "@components/LoadingScreen";

// Initial state
const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  accessToken: "",
  user: null,
};

// Decode JWT
const decodeJwt = (token) => {
  const { Name, role, userId } = jwtDecoder(token);
  return { Name, role, userId };
};

// Auth context
export const AuthContext = createContext({});

// Auth provider
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const isMountedRef = useRef(false);

  // Login
  const login = async (userName, password) => {
    const response = await axiosPrivate.post("/api/auth/login", { userName, password });
    const { accessToken } = response.data;
    const user = decodeJwt(accessToken);
    setState((prev) => ({ ...prev, isAuthenticated: true, accessToken, user }));
  };

  // Change password
  const changePassword = async (oldPassword, newPassword) => {
    await axiosPrivate.post("/api/auth/change-password", { oldPassword, newPassword });
  };

  // Logout
  const logout = async () => {
    try {
      await axiosPrivate.get("/api/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      setState(initialState);
    }
  };

  // Refresh token
  const refresh = async () => {
    try {
      const response = await axiosPrivate.get("/api/auth/refresh");
      const { accessToken } = response.data;
      const user = decodeJwt(accessToken);
      setState((prev) => ({ ...prev, isAuthenticated: Boolean(accessToken), accessToken, user }));
      return { accessToken, user };
    } catch (error) {
      setState(initialState);
      throw new Error(catchError(error));
    }
  };

  // Initialize app
  const initializingApp = async () => {
    try {
      const { accessToken, user } = await refresh();
      setState((prev) => ({ ...prev, isInitialized: true, isAuthenticated: Boolean(accessToken), accessToken, user }));
    } catch (error) {
      setState((prev) => ({ ...prev, isInitialized: true }));
    }
  };

  useEffect(() => {
    if (isMountedRef.current) return;
    initializingApp();
    isMountedRef.current = true;
  }, []);

  // Show loading if not initialized
  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        refresh,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
